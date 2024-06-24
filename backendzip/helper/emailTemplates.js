const emailTypes = {
  signup: {
    image: `https://res.cloudinary.com/dvltfa2jx/image/upload/v1696501903/email-PhotoRoom.png-PhotoRoom_zjoeps.png`,
    heading: "Please Confirm Your Email",
    text: `We're excited to have you get started. First, you need to confirm your account. Please press the Confirm Account button.`,
    buttonText: "Confirm Account",
  },
  passwordReset: {
    image: `https://res.cloudinary.com/dvltfa2jx/image/upload/v1696341384/forgot_gyibbc.png`,
    heading: "Forgot your password? No problem!",
    text: `We're here to assist you in regaining access to your account. Please press the Reset Password button.`,
    buttonText: "Reset Password",
  },
  paymentSuccessful: {
    image: `https://res.cloudinary.com/dvltfa2jx/image/upload/v1696537100/payment-PhotoRoom.png-PhotoRoom_sdqivd.png`,
    heading: "Your Payment Received",
    text: `"Congratulations!" Your payment has been successfully processed.`,
    buttonText: "",
  },
  scoreSuccess: {
    image: `https://res.cloudinary.com/dvltfa2jx/image/upload/v1696537782/5012882-PhotoRoom.png-PhotoRoom_rpk8ul.png`,
    heading: "Assessment Score Calculated",
    text: `Your score has been calculated successfully. You can view the score by visiting the application.`,
    buttonText: "Go to Application",
  },
  thankYouForSubscribing: {
    image: `https://zindabhag-dev-file-uploads.s3.ap-south-1.amazonaws.com/assets/thankYouForSubscribing.png`,
    heading: "Thank you for subscribing!",
    text: "",
    buttonText: "",
  },
  subscriptionEnded: {
    image: `https://zindabhag-dev-file-uploads.s3.ap-south-1.amazonaws.com/assets/subscriptionEnded.png`,
    heading: "Subscription Update",
    text: `We hope you've enjoyed your subscription plan. We wanted to inform you that your subscription has now ended.`,
    buttonText: "",
  },
  userConsultantInteraction: {
    image: `https://zindabhag-dev-file-uploads.s3.ap-south-1.amazonaws.com/assets/userConsultantInteraction.png`,
    heading: "New Message from a User - ZindaBhag",
    renderText: ({ email, message }) => `
        You have received a new message from a user through our website. Below is the message and the user's email:<br><br>
        User's Email:<br>
        ${email}<br><br>
        Message:<br>
        ${message}<br><br>`,
    buttonText: "",
  },
  assessmentFailed: {
    image: `https://zindabhag-dev-file-uploads.s3.ap-south-1.amazonaws.com/assets/assessmentFailed.png`,
    heading: "Assessment Failed - ZindaBhag",
    renderText: ({ message }) => `
    We regret to inform you that the data extraction from your resume has encountered an issue, attributed to:
    <p style="text-align:center;">${message}</p>
    <p style="text-align:left;">We kindly request you to attempt the process again through our application. Alternatively, you may reach out to our support team via the following email address: <a href="mailto:${process.env.AWS_SES_SUPPORT_EMAIL}">${process.env.AWS_SES_SUPPORT_EMAIL}</a> for further assistance.</p>`,
    buttonText: "",
  },
  scoreCalculationFailed: {
    image: `https://zindabhag-dev-file-uploads.s3.ap-south-1.amazonaws.com/assets/scoreCalculationFailed.png`,
    heading: "Score Calculation Failed - ZindaBhag",
    renderText: ({ message }) => `
    We regret to inform you that the assessment score calculation process has encountered an issue.
    <p style="text-align:left;">We kindly request you to attempt the process again through our application. Alternatively, you may reach out to our support team via the following email address: <a href="mailto:${process.env.AWS_SES_SUPPORT_EMAIL}">${process.env.AWS_SES_SUPPORT_EMAIL}</a> for further assistance.</p>`,
    buttonText: "",
  },
};

const genericEmailTemplate = (data) => {
  const { content, emailType, link } = data;
  const config = emailTypes[emailType];

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#FCD580">
        <!-- LOGO -->
        <tr>
            <td bgcolor="#FCD580" align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#FCD580" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#FFE4A9" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 2px; line-height: 48px;">
                             <img src=" https://res.cloudinary.com/dvltfa2jx/image/upload/v1696336633/ZindaBhag.png" width="400" height="full" style="display: block; border: 0px;" />
                             
                             <img src="${
                               config.image
                             }" width="400" height="full" style="display: block; border: 0px;" />
                             
                             
                             <h1 style="font-size: 24px; font-weight: 600; color: #2c3454;">${
                               config.heading
                             }</h1>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#FCD580" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#FFE4A9" align="center" style="padding: 2px 20px 10px 20px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">${
                              content ? content : config.text || ""
                            }</p>
                        </td>
                    </tr>
                    ${
                      config.renderText
                        ? `
                            <tr>
                                <td bgcolor="#FFE4A9" align="center" style="padding: 2px 20px 10px 20px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;text-align: left;">
                                        ${config.renderText(data)}
                                    </p>
                                </td>
                            </tr>`
                        : ""
                    }
                    ${
                      link && config.buttonText
                        ? `<tr>
                        <td bgcolor="#FFE4A9" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#FFE4A9" align="center" style="padding: 20px 30px 60px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="${link}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; color: #2c3454; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">${config.buttonText}</a></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`
                        : ""
                    } <!-- COPY -->
                    ${
                      link && config.buttonText
                        ? `<tr>
                        <td bgcolor="#FFE4A9" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center"style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #666666;">or Click the link below</td>
                                </tr>
                                <tr>
                                    <td bgcolor="#FFE4A9" align="center" style="padding: 20px 30px 60px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="word-break:break-all;" bgcolor="#FFE4A9">
                                                    <a href="${link}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; color: #2c3454; text-decoration: none; padding: 15px 25px; display: inline-block;">
                                                        ${link}
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`
                        : ""
                    } <!-- COPY -->
                 
                    
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#FCD580" align="center" style="padding: 30px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#FFE4A9" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                      
                            <p style="margin: 0;" "color: #FFA73B;">&copy; 2023 ZINDABHAG.com </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#FCD580" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#FCD580" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`;
};

module.exports = {
  genericEmailTemplate,
};
