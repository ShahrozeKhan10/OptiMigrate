const helperFunction = require("../helper/common");
const scoreService = require("../services/score.service");
const assessmentService = require("../services/assessments.service");
const ScoreScript = require("../python/score_scripts/fetch-score");
const httpStatus = require("http-status");
// const { USER_APP_ENDPOINT } = require("../config/config");
const {
  createSendEmailCommand,
  sesClient,
} = require("../services/aws-config/aws-config");
const { genericEmailTemplate } = require("../helper/emailTemplates");
const chatService = require("../services/chat.service");
const { ASSESSMENT_STATUS } = require("../config/constants");

exports.getSkillScore = async (userId, email, updateAssessmentStatus) => {
  console.log("getSkillScore: 00");
  let userAssessment = await assessmentService.getUserAssessment(userId);
  if (
    userAssessment === null ||
    (updateAssessmentStatus &&
      userAssessment.status !== ASSESSMENT_STATUS.PENDING)
  ) {
    console.log("getSkillScore: 00 RETURNING");
    return false;
  }
  console.log("getSkillScore: 01");

  try {
    if (updateAssessmentStatus) {
      await assessmentService.updateAssessment(
        {
          status: ASSESSMENT_STATUS.IN_PROGRESS,
        },
        userAssessment.id
      );
    }
    console.log("getSkillScore: 02");

    userAssessment = userAssessment.toJSON();

    console.log("getSkillScore: 1", userAssessment.id);
    const assessmentCountries = userAssessment.assessment_country;

    await scoreService.calculateScore(
      userId,
      userAssessment,
      assessmentCountries
    );
    console.log("getSkillScore: 2", userAssessment.id);

    let scoreData = await scoreService.getSkillsScore(
      userId,
      userAssessment.id
    );
    const scores = scoreData?.skillScore?.scores;
    console.log("getSkillScore: 3", scores?.length);

    let totalScores = scores?.filter((score) => score.type === "total");
    totalScores = totalScores.map((o) => ({ ...o, score: +o.score }));
    totalScores.sort((a, b) => +b.score - +a.score);

    const careerSummary = await chatService.handleChat({
      content: userAssessment.resume_text_content,
      question: `Please provide a concise career summary of the resume provided above, highlight key skills, notable achievements, relevant experience, and any unique experiences or projects that are relevant in a desired industry or role.
        Additionally, describe any significant challenges this candidate has encountered and overcome. State the specific skills and qualifications, and mention any specific opportunities you are seeking or interested in. Feel free to include both past career achievements and future career goals.`,
    });
    console.log("getSkillScore: 4", careerSummary?.length);

    const translateSummary = await chatService.translateSummary(careerSummary);
    await assessmentService.updateAssessment(
      {
        career_summary: careerSummary,
        career_summary_ur: translateSummary,
        result: JSON.stringify(scoreData),
        status: ASSESSMENT_STATUS.COMPLETED,
      },
      userAssessment.id
    );

    // Disabled Score Success Email
    // const sendEmailCommand = createSendEmailCommand({
    //   emailTemplate: genericEmailTemplate({
    //     emailType: "scoreSuccess",
    //     link: `${USER_APP_ENDPOINT}/dashboard`,
    //   }),
    //   toAddress: email,
    //   fromAddress: process.env.AWS_SES_SENDER_EMAIL,
    //   subject: "ZindaBhag Assessment Score",
    // });

    // sesClient.send(sendEmailCommand);
    console.log("getSkillScore: 5 EMAIL SENT!");

    return scoreData;
  } catch (error) {
    await assessmentService.updateAssessment(
      {
        status: ASSESSMENT_STATUS.FAILED,
      },
      userAssessment.id
    );
    chatService.sendFailedEmail(
      "scoreCalculationFailed",
      email,
      error.errorCode
    );

    console.log("ERROR in getSkillScore controller: ", error);
  }
};

exports.getScore = async (req, res, next) => {
  let { qualification, skills, experience, field, location } = req.query;
  try {
    const response = await ScoreScript(
      qualification,
      skills,
      experience,
      field,
      location
    );

    helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};
