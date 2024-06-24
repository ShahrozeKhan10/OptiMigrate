const helperFunction = require('../helper/common');
const httpStatus = require('http-status');
const {ErrorHandler} = require('../helper/error');
const {ERROR_CODES} = require('../config/constants');
const {
    sequelize,
    Attachment,
} = require('../models');

let attachments = {
    addUserIdToAttachment: async (userId) => {
        try {
            await Attachment.create({
                user_id: userId
            })
        } catch (e) {
            throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
        }
    },
    getAllUserAttachmentKey: async (userId, type) => {
        try {
            let response = await Attachment.findAll({
                where: {
                    user_id: userId,
                    type: type
                },
                attributes: {exclude: ['updatedAt', 'createdAt', 'user_id', 'project_id']},
                raw: true
            });
            return response;
        } catch (e) {
            throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
        }
    },
    getSingleUserAttachmentKey: async (userId, id) => {
        try {
            let response = await Attachment.findOne({
                where: {
                    id: id,
                    user_id: userId
                },
                attributes: {exclude: ['updatedAt', 'createdAt']},
                raw: true
            });
            return response;
        } catch (e) {
            throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
        }
    },
    getUserProjectKey: async (userId, projId) => {
        try {
            let response = await Attachment.findOne({
                where: {
                    user_id: userId,
                    project_id: projId
                },
                raw: true
            });
            return response;
        } catch (e) {
            throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
        }
    },
    updateUserProfileKey: async (userId, key, type, url) => {
        try {
            let transaction = await sequelize.transaction();

            await Attachment.destroy({
                where: {
                    type: type,
                    user_id: userId
                }
            }, {transaction});

            await Attachment.create({
                key: key,
                type: type,
                url: url,
                user_id: userId
            }, {transaction});
            transaction.commit();
            return await attachments.getAllUserAttachmentKey(userId, 'profile')
        } catch (e) {
            throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
        }
    },
    createUserProjectKey: async (userId, projId, key, type, url) => {
        try {
            await Attachment.create({
                key: key,
                type: type,
                url: url,
                user_id: userId,
                project_id: projId
            })
        } catch (e) {
            throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
        }
    },
    updateUserProjectKey: async (userId, projId, key, url, type) => {
        console.log(userId, projId, key, url, type, 'update project image attachments');
        try {
            let transaction = await sequelize.transaction();

            await Attachment.destroy({
                where: {
                    type: type,
                    user_id: userId,
                    project_id: projId
                }
            }, {transaction});

            await Attachment.create({
                key: key,
                type: type,
                url: url,
                user_id: userId,
                project_id: projId,
            }, {transaction});
            transaction.commit();
            return await attachments.getAllUserAttachmentKey(userId, 'project')
        } catch (e) {
            throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
        }
    },
    deleteUserProjectKey: async (projId, userId) => {
        try {
            await Attachment.destroy({
                where: {
                    project_id: projId,
                    user_id: userId
                },
                logging: false
            });
        } catch (e) {
            throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
        }
    },
    addUserCvKey: async (userId, key, type, url, name) => {
        try {
            await Attachment.create({
                key: key,
                type: type,
                url: url,
                name: name,
                user_id: userId
            })
        } catch (e) {
            throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
        }
    },
    deleteUserKey: async (userId, id, type) => {
        try {
            await Attachment.destroy({
                where: {
                    id: id,
                    user_id: userId,
                    type: type
                },
                logging: false
            });
        } catch (e) {
            throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
        }
    }
};

module.exports = attachments;
