const express = require("express");
const router = express.Router();
const notificationCtrl = require("../controllers/notification.controller");

router.get("/", notificationCtrl.getNotifications);
router.put("/read/:notificationId", notificationCtrl.markAsRead);

module.exports = router;
