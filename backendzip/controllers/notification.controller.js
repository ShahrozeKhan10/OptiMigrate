const helperFunction = require("../helper/common");
const notificationServices = require("../services/notifications.service");
const httpStatus = require("http-status");

exports.getNotifications = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    const { id: userId } = req.decoded;

    const options = {
      userId,
      page: page ? +page : 1,
      pageSize: pageSize ? +pageSize : 2,
    };
    console.log("notifications", options);

    let response = await notificationServices.getNotifications(options);

    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const { id: userId } = req.decoded;

    const options = {
      userId,
      notificationId,
    };

    let response = await notificationServices.markAsRead(options);

    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};
