const openai = require("openai");
const { COMMON_CHAT_MESSAGE } = require("../config/constants");

const { ChatCompletionRequestMessageRoleEnum } = openai;

const configuration = new openai.Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiApi = new openai.OpenAIApi(configuration);

const getResumeChatCompletion = async (resumeContent) => {
  return await openaiApi.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: [
      ...COMMON_CHAT_MESSAGE,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content:
          "Degree program is bachelor or master, and field of study is the actual specialization. Always return date as YYYY and DO NOT return month. transforms all abbreviates into full forms",
      },
      {
        // CV CONTENT
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: resumeContent,
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content:
          "NOTE: PLEASE DON'T ASSUME ANY INFORMATION FOR ANY FIELD OR SUB FIELD, IF THE INFORMATION FOR THAT FIELD DOES NOT EXIST JUST ADD NULL ON THAT FIELD.",
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `Based on the content provided, list down:
              summary,
              isCV: (check if the content is from CV, resume or other document)
              location: (name),
              profession: (name),
              professionCode: (onet-code),
              city: (name),
              country: (Full Name),
              countryCode: (2 digit country iso),
              certificates: (title, description, start_year, end_year, onGoing),
              projects: (title, company_name(add null if not mentioned), link, start_year, end_year, onGoing),
              experience: (startYear, endYear, company, position, location, onGoing),
              education: (degree, startYear, endYear, institution, field of study as studyField(add null if not mentioned), location, onGoing),
              softskills,
              hardskills,
              interests.
              I need this response as JSON.
              If there is no startYear, then give a random year instead in startYear key before which does'nt
              overlap with any other experience, or education.
              Remember degree will be only either one of these
                1- 'High school or equivalent'
                2- Diploma
                3- Bachelor
                4- Higher diploma
                5- Master
                6- Phd
                7- O level
                8- A level
                9- Matriculation
                10- Intermediate
              and field of study is the actual specialization.
              `,
      },
      // {
      // role: ChatCompletionRequestMessageRoleEnum.User,
      // content: `Based on the content provided, extract the details from the content:
      //   location: (name), profession: (name),
      //   certificates: (title, description, start_year, end_year, onGoing),
      //   education: (degree, startYear, endYear, institution, field of study as studyField, location, onGoing),
      //   experience: (startYear, endYear, company, position, location, onGoing),
      //   projects: (title, company_name, link, start_year, end_year, onGoing),
      //   softskills,
      //   hardskills.`,
      // },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `
                I need this response as JSON. If there is no startYear, then give a random year instead in startYear key
                before which does'nt overlap with any other experience, or education.
                Remember to map the degree you found with either one of these
                  1- 'High school or equivalent'
                  2- Diploma
                  3- Bachelor
                  4- Higher diploma
                  5- Master
                  6- Phd
                  7- O level
                  8- A level
                  9- Matriculation
                  10- Intermediate
                  and field of study is the actual specialization.
                Specialization should be picked from EDUCATION section only`,
      },
    ],
    // education: (degree, startYear, endYear, institution, field of study as studyField, location, onGoing), only get this information from education section in the content.\n
    temperature: 0,
    // max_tokens: 16385,
  });
};

module.exports = { getResumeChatCompletion };
