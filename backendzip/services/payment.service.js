const { AccessLevel, PaymentStatus, PaymentPlan } = require("../models");
const httpStatus = require("http-status");
const Sequelize = require("sequelize");
const Stripe = require("stripe");
const {
  createSendEmailCommand,
  sesClient,
} = require("./aws-config/aws-config");
const { genericEmailTemplate } = require("../helper/emailTemplates");
const { PAYMENT_STATUS } = require("../config/constants");
const { USER_APP_ENDPOINT } = require("../config/config");

const Op = Sequelize.Op;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const paymentService = {
  getPaymentPlans: async () => {
    try {
      const plans = await PaymentPlan.findAll();
      return plans;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getPaymentPlan: async (planId) => {
    try {
      const plans = await PaymentPlan.findByPk(planId, {
        include: [AccessLevel],
      });
      return plans;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getPaymentPlanByPriceId: async (priceId) => {
    try {
      const customConditions = [
        Sequelize.literal(
          `JSON_UNQUOTE(JSON_EXTRACT(price_variants, '$.yearly.id')) = '${priceId}'`
        ),
        Sequelize.literal(
          `JSON_UNQUOTE(JSON_EXTRACT(price_variants, '$.monthly.id')) = '${priceId}'`
        ),
        Sequelize.literal(
          `JSON_UNQUOTE(JSON_EXTRACT(price_variants, '$.quarterly.id')) = '${priceId}'`
        ),
      ];

      const plan = await PaymentPlan.findOne({
        where: {
          [Op.or]: customConditions,
        },
        include: [AccessLevel],
      });

      return plan;
    } catch (e) {
      console.log("Error: getPaymentPlanByPriceId:", e);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  initiatePayment: async (data) => {
    const { userId, email, priceId } = data;
    console.log(userId, email, priceId);
    // const plan = await paymentService.getPaymentPlanByPriceId(priceId);

    // return { plan };
    try {
      let user = await PaymentStatus.findOne({
        where: {
          user_id: userId,
        },
        raw: true,
        logging: false,
      });

      let customer;

      if (!user) {
        customer = await stripe.customers.create({
          email,
        });
      } else {
        customer = { id: user.customer_id };
      }

      await PaymentStatus.update(
        { customer_id: customer.id },
        {
          where: {
            user_id: userId,
          },
        }
      );

      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: customer.id,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${USER_APP_ENDPOINT}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${USER_APP_ENDPOINT}/plan`,
      });

      if (!checkoutSession.url) {
        throw new ErrorHandler(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Could not create checkout session"
        );
      }

      return checkoutSession;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  paymentSuccessful: async (userData) => {
    try {
      const userPayment = await PaymentStatus.findOne({
        where: { user_id: userData.userId },
      });

      if (userPayment && userPayment?.subscription_id) {
        await stripe.subscriptions.cancel(userPayment.subscription_id);
      }

      const checkoutSession = await stripe.checkout.sessions.retrieve(
        userData.sessionId
      );
      const subscription = await stripe.subscriptions.retrieve(
        checkoutSession.subscription
      );
      let paymentData = await PaymentStatus.findOne({
        where: {
          user_id: userData.userId,
        },
        raw: true,
        logging: false,
      });
      const priceId = subscription.plan.id;
      const plan = await paymentService.getPaymentPlanByPriceId(priceId);

      if (paymentData) {
        try {
          await PaymentStatus.update(
            {
              payment_status: checkoutSession.payment_status,
              payment_id: priceId,
              subscription_id: subscription.id,
              payment_plan_id: plan.id,
            },
            {
              where: {
                email: paymentData.email,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        PaymentStatus.create({
          transaction_id: checkoutSession.id,
          date_creation: checkoutSession.created,
          payment_status: checkoutSession.payment_status,
          user_id: userData.userId,
          email: userData.email,
          payment_intent: checkoutSession.payment_intent,
          payment_id: subscription.plan.id,
          customer_id: subscription.customer,
          subscription_id: subscription.id,
          payment_plan_id: plan.id,
        });
      }

      const sendEmailCommand = createSendEmailCommand({
        emailTemplate: genericEmailTemplate({
          emailType: "paymentSuccessful",
          content: `We're excited to inform you that your subscription to the ${subscription.plan.interval_count}-${subscription.plan.interval} <b>${plan.name}</b> plan has been successfully activated!`,
        }),
        toAddress: userData.email,
        fromAddress: process.env.AWS_SES_SENDER_EMAIL,
        subject: "ZindaBhag - Payment Subscription",
      });

      await sesClient.send(sendEmailCommand);

      return checkoutSession;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getPaymentStatus: async (userId) => {
    try {
      let paymentData = await PaymentStatus.findOne({
        where: {
          user_id: userId,
        },
        include: [{ model: PaymentPlan, include: [AccessLevel] }],
        // raw: true,
        logging: false,
      });
      return paymentData;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  paymentHook: async (req, res) => {
    try {
      const signature = req.headers["stripe-signature"];
      let event;
      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          process.env.STRIPE_SIGNING_SECRET
        );
      } catch (error) {
        console.log(error, "error");
      }

      if (event.type === "invoice.paid") {
        const sendEmailCommand = createSendEmailCommand({
          emailTemplate: genericEmailTemplate({
            emailType: "thankYouForSubscribing",
          }),
          toAddress: event.data.object.customer_email,
          fromAddress: process.env.AWS_SES_SENDER_EMAIL,
          subject: "ZindaBhag - Payment Subscription",
        });
        await sesClient.send(sendEmailCommand);
      }

      if (
        event.type === "customer.subscription.deleted" ||
        event.type === "invoice.payment_failed"
      ) {
        const data = event.data.object;
        let paymentStatus = await PaymentStatus.update(
          {
            payment_status: PAYMENT_STATUS.NOT_PAID,
            payment_id: null,
            subscription_id: null,
            payment_plan_id: null,
          },
          {
            where: {
              email: event.data.object.customer_email,
            },
          }
        );
        try {
          const subscribedUser = await PaymentStatus.findOne({
            where: {
              email: event.data.object.customer_email,
            },
          });

          const sendEmailCommand = createSendEmailCommand({
            emailTemplate: genericEmailTemplate({
              emailType: "subscriptionEnded",
            }),
            toAddress: subscribedUser.email,
            fromAddress: process.env.AWS_SES_SENDER_EMAIL,
            subject: "ZindaBhag - Payment Subscription",
          });

          await sesClient.send(sendEmailCommand);
        } catch (error) {
          console.log(error);
        }

        return paymentStatus;
      }
    } catch (error) {
      console.error("Error handling webhook:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  cancelPayment: async (subscription_id) => {
    try {
      if (subscription_id) {
        await stripe.subscriptions.cancel(subscription_id);
        await PaymentStatus.update(
          {
            payment_status: PAYMENT_STATUS.NOT_PAID,
            payment_id: null,
            subscription_id: null,
            payment_plan_id: null,
          },
          {
            where: {
              subscription_id: subscription_id,
            },
          }
        );
      }
      return {
        data: "completed",
      };
    } catch (e) {
      console.log("Cancel Payment ERROR: ", e);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getUserInvoices: async (customer_id) => {
    try {
      const stripeInvoices = await stripe.invoices.list({
        customer: customer_id,
      });

      return stripeInvoices?.data?.map((invoice) => {
        return {
          invoice: invoice.id,
          link: invoice.hosted_invoice_url,
          download: invoice.invoice_pdf,
          status: invoice.status,
          total: invoice.total,
          endDate: invoice?.lines?.data?.[0]?.period?.end,
          startDate: invoice?.lines?.data?.[0]?.period?.start,
          planId: invoice?.lines?.data?.[0]?.plan?.id,
        };
      });
    } catch (e) {
      console.log("Error: getUserInvoices: ", e);
      if (e.code === "resource_missing") return [];

      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
};

module.exports = paymentService;
