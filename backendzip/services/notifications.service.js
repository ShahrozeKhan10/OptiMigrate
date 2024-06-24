const httpStatus = require("http-status");
const { ErrorHandler } = require("../helper/error");
const { sendNotification } = require("../helper/socketService");
const { Notification } = require("../models");
const { MESSAGE_CODES } = require("../config/constants");

let notificationService = {
  createNotification: async (
    initiatorUserId,
    recipientUserId,
    type,
    content,
    data
  ) => {
    try {
      const notification = await Notification.create({
        initiator_user_id: initiatorUserId,
        recipient_user_id: recipientUserId,
        type,
        content,
        data,
        isRead: false,
      });
      sendNotification(recipientUserId, notification);
      return notification;
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getNotifications: async ({ page, pageSize, userId }) => {
    try {
      const options = {
        where: { recipient_user_id: userId },
        order: [["createdAt", "DESC"]],
        limit: pageSize,
        offset: (page - 1) * pageSize,
        logging: true,
      };

      const notification = await Notification.findAndCountAll(options);

      return notification;
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  markAsRead: async ({ notificationId, userId }) => {
    try {
      const notification = await Notification.findOne({
        where: { id: notificationId, recipient_user_id: userId },
      });

      if (!notification) {
        throw new ErrorHandler(
          httpStatus.BAD_REQUEST,
          MESSAGE_CODES.COMMON.record_not_found
        );
      }

      notification.is_read = true;
      await notification.save();

      return notification;
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, error.message);
    }
  },
};

module.exports = notificationService;
