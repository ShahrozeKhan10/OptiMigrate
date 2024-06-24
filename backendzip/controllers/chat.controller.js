// @ts-check
const httpStatus = require("http-status");
const helperFunction = require("../helper/common");
const chatService = require("../services/chat.service");
const authService = require("../services/auth.service");
const scoreCtrl = require("../controllers/score.controller");
const assessmentService = require("../services/assessments.service");
const { ASSESSMENT_STATUS, PAYMENT_STATUS } = require("../config/constants");

exports.getResumeData = async (req, res, next) => {
  console.log("exports.getResumeData called ------>")
  try {
    const { id: userId, email: userEmail } = req.decoded;

    console.log("req.body --->" ,req.body)
    // const { assessmentId, professionId } = req.body;
    const assessmentId = 5;
    const professionId = 6
    console.log("getResumeData: 11", userId, userEmail);

    // const paymentStatus = await PaymentStatus.findOne({
    //   where: {
    //     user_id: userId,
    //   },
    //   raw: true,
    // });

    // console.log({paymentStatus})

    const body = {
      assessmentId,
      professionId,
      userId,
      userEmail,
      // paymentStatus,
    };

    console.log({body})

    const hasPaidAccount = true
      // (paymentStatus || {}).payment_status === PAYMENT_STATUS.PAID;

    if (hasPaidAccount) {
      await assessmentService.updateAssessment(
        {
          status: ASSESSMENT_STATUS.IN_PROGRESS,
        },
        body.assessmentId
      );
    }
    const abc = await extractAndProcessResume(req.file, body); // Trigger Data Extraction
console.log("extractAndProcessResume" ,{abc})

    return helperFunction.apiResponse(true, false, httpStatus.OK, res);
  } catch (e) {
    console.log("Error: getResumeData 1: ", e);
    next(e);
  }
};

async function extractAndProcessResume(file, body, hasPaidAccount = false) {
  try {
    console.log({file,body})
    console.log("getResumeData: 22: Calling chatService.getResumeData");

    const response = await chatService.getResumeData(file, body);
    console.log({response})
    console.log("getResumeData: 22: Data Parsed from GPT");

    const data = {
      soft_skills: response.formattedSoftSkills,
      experience: response.formattedExperience,
      education: response.formattedEducation,
      hard_skills: response.formattedHardSkills,
      certificate: response.formattedCertificate,
      project: response.formattedProject,
      professionId: body.professionId,
      location: response.location ?? '', //location address, firebase
    };

    await authService.resumeProfileCreation(data, body.userId);

    if (hasPaidAccount) {
      console.log("TRIGGERING SCORE CALCULATION ======> ");
      scoreCtrl.getSkillScore(body.userId, body.userEmail); // Trigger Score Calculation
    }
    console.log("getResumeData: 44: SCORE Triggered", hasPaidAccount);

    return response;
  } catch (error) {
    console.log("THROW FROM extractAndProcessResume", error.message);
    console.log("THROW FROM extractAndProcessResume", error.errorCode);
    if (error?.response?.data?.error) {
      console.log("Error: getResumeData 2: ", error?.response?.data);
    }

    await assessmentService.updateAssessment(
      {
        status: ASSESSMENT_STATUS.FAILED,
      },
      body.assessmentId
    );

    chatService.sendFailedEmail(
      "assessmentFailed",
      body.userEmail,
      error.errorCode
    );
  }
}
