const { ChatCompletionRequestMessageRoleEnum } = require("openai");

const MESSAGE_CODES = {
  COMMON: {
    invalid_api: "invalid_api",
    field_missing: "field_missing",
    server_error: "server_error",
    invalid_type: "invalid_type",
    basic_required: "basic_required",
    duplicate: "duplicate",
    file: "file",
    validation: "validation",
    record_not_found: "record_not_found",
  },
  AUTH: {
    invalid_format: "invalid_format",
    key_invalid_format: "key_invalid_format",
    invalid_email: "invalid_email",
    invalid_password: "invalid_password",
    invalid_account: "invalid_account",
    account_exists: "account_exists",
    token_expired: "token_expired",
    token_required: "token_required",
    token_invalid: "token_invalid",
    same_password: "same_password",
    gender_required: "gender_required",
    email_success: "email_success",
    email_not_verified: "email_not_verified",
    unauthorized_country: "unauthorized_country",
    unauthorized_operation: "unauthorized_operation",
    subscribed: "subscribed",
    already_subscribed: "already_subscribed",
    unsubscribed: "unsubscribed",
    already_unsubscribed: "already_unsubscribed",
  },
  CHAT: {
    premium_file_size_limit_exceeds:
      "Resume size exceeds the allowed limit of 20MB. Please upload resume with smaller size.",
    free_file_size_limit_exceeds:
      "File size exceeds the allowed limit of 2MB. Please upgrade to premium to upload a CV of upto 20MB.",
    parse_error: "File parse error. Please upload another file",
    free_limit_exceeded:
      "The character length of your resume exceeds the free limit. Please upgrade to premium.",
    silver_limit_exceeded:
      "Your current subscription allows for a maximum of 10,000 characters in your resume. Please upload another resume.",
    gold_limit_exceeded:
      "Your current subscription allows for a maximum of 20,000 characters in your resume. Please upload another resume.",
    platinum_limit_exceeded:
      "Your current subscription allows for a maximum of 30,000 characters in your resume. Please upload another resume.",
    file_is_not_cv:
      "The file you provided is not much like a resume. Please upload a valid resume.",
  },
};

const END_POINTS = {
  ASSESSMENT: "/assessment",
  AUTH: "/",
  COUNTRY: "/country",
  DOCUMENT: "/document",
  PROFESSION: "/profession",
  SCORE: "/score",
  SKILLS: "/skill",
  INTEREST: "/interest",
  USER: "/user",
  CONSULTANT: "/consultant",
  VISA: "/visa",
  CHAT: "/chat",
  PAYMENT: "/payment",
  NEWS_LETTER: "/newsletter",
  TOPIC: "/community/topic",
  QUESTION: "/community/question",
  REPLIES: "/community/replies",
  LIKES: "/community/likes",
  NOTIFICATIONS: "/notifications",
};

const PDF_CHAR_LIMIT = {
  FREE: 7000,
  PAID_SILVER: 10000,
  PAID_GOLD: 20000,
  PAID_PLATINUM: 30000,
};
const PDF_FILE_SIZE = {
  FREE: 2097152, // 2MB
  PAID: 20971520, // 20MB
};
const PAYMENT_STATUS = {
  PAID: "paid",
  NOT_PAID: "not paid",
};
const ASSESSMENT_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  FAILED: "failed",
};

const COMMON_CHAT_MESSAGE = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content:
      "Based on the information by the user, please provide the answer related the information provided.",
  },
];

const NOTIFICATION_TYPES = {
  QUESTION_REPLY: "question-reply",
  QUESTION_LIKE: "question-like",
  REPLY_LIKE: "reply-like",
  ASSESSMENT_SUCCESS: "assessment-success",
  ASSESSMENT_FAILED: "assessment-failed",
};

module.exports = {
  ASSESSMENT_STATUS,
  MESSAGE_CODES,
  END_POINTS,
  PDF_CHAR_LIMIT,
  PDF_FILE_SIZE,
  PAYMENT_STATUS,
  COMMON_CHAT_MESSAGE,
  NOTIFICATION_TYPES,
};
