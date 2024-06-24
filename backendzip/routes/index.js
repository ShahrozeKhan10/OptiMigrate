const express = require("express");
const router = express.Router();
const documentRoute = require("../routes/document.route");
const assessmentRoute = require("../routes/assessment.route");
const skillRoute = require("../routes/skill.route");
const interestRoute = require("../routes/interest.route");
const countryRoute = require("../routes/country.route");
const profRoute = require("../routes/profession.route");
const authRoute = require("../routes/auth.route");
const chatRoute = require("../routes/chat.routes");
const consultantRoute = require("../routes/consultant.route");
const visa = require("../routes/visa.route");
const score = require("../routes/score.route");
const user = require("../routes/user.route");
const paymentRoute = require("../routes/payment.route");
const paymentPlansRoute = require("../routes/paymentPlans.route");
const newsLetterRoute = require("../routes/newsLetter.route");
const topicRoute = require("../routes/topic.route");
const questionRoute = require("../routes/question.route");
const repliesRoute = require("../routes/replies.route");
const likesRoute = require("../routes/likes.route");
const notificationsRoute = require("../routes/notifications.route");

const { END_POINTS } = require("../config/constants");
const { verifyToken } = require("../helper/middleware");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use(END_POINTS.AUTH, authRoute);
router.use(END_POINTS.DOCUMENT, verifyToken, documentRoute);
router.use(END_POINTS.ASSESSMENT, verifyToken, assessmentRoute);
router.use(END_POINTS.CHAT, verifyToken, chatRoute);
router.use(END_POINTS.PROFESSION, verifyToken, profRoute);
router.use(END_POINTS.COUNTRY, countryRoute);
router.use(END_POINTS.CONSULTANT, verifyToken, consultantRoute);
router.use(END_POINTS.VISA, verifyToken, visa);
router.use(END_POINTS.SCORE, verifyToken, score);
router.use(END_POINTS.SKILLS, verifyToken, skillRoute);
router.use(END_POINTS.INTEREST, verifyToken, interestRoute);
router.use(END_POINTS.USER, verifyToken, user);
router.use(END_POINTS.PAYMENT, paymentPlansRoute);
router.use(END_POINTS.PAYMENT, verifyToken, paymentRoute);
router.use(END_POINTS.NEWS_LETTER, newsLetterRoute);
// Community
router.use(END_POINTS.TOPIC, verifyToken, topicRoute);
router.use(END_POINTS.QUESTION, verifyToken, questionRoute);
router.use(END_POINTS.REPLIES, verifyToken, repliesRoute);
router.use(END_POINTS.LIKES, verifyToken, likesRoute);
router.use(END_POINTS.NOTIFICATIONS, verifyToken, notificationsRoute);

module.exports = router;
