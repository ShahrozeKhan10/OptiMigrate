const helperFunction = require("../helper/common");
const authService = require("../services/auth.service");
const httpStatus = require("http-status");
const userService = require("../services/user.service");
const { AuthToken } = require("../models");
const { ErrorHandler } = require("../helper/error");
const { MESSAGE_CODES } = require("../config/constants");
const {
  sesClient,
  createSendEmailCommand,
} = require("./../services/aws-config/aws-config");
const { genericEmailTemplate } = require("../helper/emailTemplates");
const { USER_APP_ENDPOINT } = require("../config/config");

exports.register = async (req, res, next) => {
  console.log(req.body, req.url);
  let { name, email, gender, password } = req.body;
  try {
    let userExist = await authService.getUserByEmail(email);
    if (userExist) {
      throw new ErrorHandler(
        httpStatus.CONFLICT,
        MESSAGE_CODES.AUTH.account_exists
      );
    }
    let encryptedPassword = await helperFunction.generateHash(
      password.toString()
    );
    const response = await authService.createAccount(
      name,
      email,
      encryptedPassword,
      gender
    );
    authService.sendVerificationEmail(response);

    return helperFunction.apiResponse(
      response,
      response.error,
      httpStatus.OK,
      res
    );
  } catch (e) {
    console.log("CATCH ===========================", e);
    next(e);
  }
};

exports.login = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let response = await authService.login(email, password);
    return helperFunction.apiResponse(
      response.data,
      response.error,
      httpStatus.OK,
      res
    );
  } catch (e) {
    next(e);
  }
};

exports.forgotPassword = async (req, res, next) => {
  let { email } = req.body;

  let isAdmin = false;
  if (req.query.twe === "$i89ed") {
    isAdmin = true;
  }

  try {
    let response = await authService.emailExist(email, isAdmin);
    if (Object.entries(response.data).length > 0) {
      const requestToken = helperFunction.generateJWT(response.data.id);
      const baseUrl =
        response.data.role === "admin"
          ? process.env.ADMIN_APP_ENDPOINT
          : USER_APP_ENDPOINT;
      const link = `${baseUrl}/reset-password?token=${requestToken}`;

      await AuthToken.create(
        {
          user_id: response.data.id,
          token: requestToken,
        },
        { logging: false }
      );

      const sendEmailCommand = createSendEmailCommand({
        emailTemplate: genericEmailTemplate({
          emailType: "passwordReset",
          link,
        }),
        toAddress: email,
        fromAddress: process.env.AWS_SES_SENDER_EMAIL,
        subject: "ZindaBhag - Password Reset Request",
      });

      await sesClient.send(sendEmailCommand);

      helperFunction.apiResponseWithMessage(
        [],
        MESSAGE_CODES.AUTH.email_success,
        response.error,
        response.status,
        res
      );
    }
  } catch (e) {
    next(e);
  }
};

exports.forgotPasswordValidation = async (req, res, next) => {
  let { token } = req.body;
  try {
    let tokenValidity = helperFunction.checkTokenVerification(token);
    if (!tokenValidity.verified) {
      throw new ErrorHandler(
        httpStatus.UNAUTHORIZED,
        MESSAGE_CODES.AUTH.token_expired
      );
    }
    let response = await authService.getAuthRequest(
      token,
      tokenValidity.data.id
    );

    if (Object.entries(response.data).length > 0) {
      if (response.data.is_active === 1) {
        await authService.authRequestLinkExpiry(token, tokenValidity.data.id);
        helperFunction.apiResponse(
          { id: tokenValidity.data.id },
          false,
          httpStatus.OK,
          res
        );
      } else {
        throw new ErrorHandler(
          httpStatus.UNAUTHORIZED,
          MESSAGE_CODES.AUTH.token_expired
        );
      }
    } else {
      throw new ErrorHandler(
        httpStatus.UNAUTHORIZED,
        MESSAGE_CODES.AUTH.token_invalid
      );
    }
  } catch (e) {
    next(e);
  }
};

exports.validateEmail = async (req, res, next) => {
  let { token } = req.body;
  try {
    let response = await authService.getAuthRequest(token);

    if (Object.entries(response.data).length > 0) {
      if (response.data.is_active === 1) {
        // Commented out the email validation logic
        await authService.authRequestLinkExpiry(token, response.data.user_id);
        await userService.updateBasicInfo({
          email_verified: true,
          id: response.data.user_id,
        });
        const user = await userService.getUserInfoById(response.data.user_id);

        const doLogin = true; // To login user without password
        let response1 = await authService.login(user.email, "password", doLogin);

        helperFunction.apiResponse(
          response1.data,
          false,
          httpStatus.OK,
          res
        );
      } else {
        throw new ErrorHandler(
          httpStatus.UNAUTHORIZED,
          MESSAGE_CODES.AUTH.token_expired
        );
      }
    } else {
      throw new ErrorHandler(
        httpStatus.UNAUTHORIZED,
        MESSAGE_CODES.AUTH.token_invalid
      );
    }
  } catch (e) {
    next(e);
  }
};

exports.resetPassword = async (req, res, next) => {
  let { id, password } = req.body;

  try {
    let user = await authService.getUser(id);
    let passwordCheck = await helperFunction.validatePassword(
      password,
      user.data.password
    );
    if (passwordCheck) {
      // new password matches with the old one return the error
      throw new ErrorHandler(
        httpStatus.NOT_ACCEPTABLE,
        MESSAGE_CODES.AUTH.same_password
      );
    } else {
      const response = await authService.setNewPassword(id, password);
      helperFunction.apiResponse(
        response.data,
        response.error,
        response.status,
        res
      );
    }
  } catch (e) {
    next(e);
  }
};

exports.changePassword = async (req, res, next) => {
  let { oldPassword, newPassword } = req.body;
  try {
    let response = await authService.changeUserPassword(
      req.decoded.id,
      oldPassword,
      newPassword
    );
    helperFunction.apiResponse(
      response.data,
      response.error,
      response.status,
      res
    );
  } catch (e) {
    next(e);
  }
};

exports.resumeProfileCreation = async (req, res, next) => {
  try {
    let response = await authService.resumeProfileCreation(
      req.body,
      req.decoded.id
    );
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};
