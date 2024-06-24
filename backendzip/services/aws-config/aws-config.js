

const { S3Client } = require("@aws-sdk/client-s3");
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
let {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SES_REGION,
} = require("../../config/config");

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: AWS_SES_REGION,
});

const sesClient = new SESClient({
  region: AWS_SES_REGION,
  credentials: {
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY_ID,
  },
});

const createSendEmailCommand = ({
  emailTemplate,
  subject,
  toAddress,
  toBccAddress = "",
  toCcAddress = "",
  fromAddress,
}) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: toCcAddress ? [toCcAddress] : [],
      BccAddresses: toBccAddress ? [toBccAddress] : [],
      ToAddresses: [toAddress],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: emailTemplate,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

module.exports = {
  s3,
  sesClient,
  createSendEmailCommand,
};
