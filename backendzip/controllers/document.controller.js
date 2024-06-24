const { OpenAIApi, Configuration } = require("openai");
const pdf = require("pdf-parse");
const ScoreScript = require("../python/score_scripts/fetch-score");

const apiKey = process.env.OPENAI_API_KEY;

const uploadAndExtractDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const pdfBuffer = req.file.buffer; // Access the PDF data from the request

  try {
    // Parse the PDF content
    const pdfData = await pdf(pdfBuffer);
    const pdfText = pdfData.text;

    const configuration = new Configuration({
      apiKey: apiKey,
    });

    const openai = new OpenAIApi(configuration);

    // Calculate the user's score based on qualification, skills, and experience
    const messageQualification = `Please convert pdf text in json with keys:\n
    name, highest_education_of_user_in_words_with_major, skills_in_keywords, node, scrum master, number_of_experience_in_years, current_one_profession_of_user and current_location_of_user.\n
    please make sure you fetch all the skills. \n
    please give response in json format and also if some key value is not present write unavailable.\n
      ${pdfText}. 
      `;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: messageQualification,
      max_tokens: 1000, // Adjust max_tokens as needed for your prompt
      temperature: 0.7, // Adjust temperature for desired response randomness
    });

    const chtGPTResponse = response.data.choices[0].text;

    const cleanedString = chtGPTResponse.replace(/\s+/g, " ");
    const jsonObject = JSON.parse(cleanedString);

    console.log({
      skills_in_keywords: jsonObject.skills_in_keywords,
    });

    if (!Array.isArray(jsonObject.skills_in_keywords)) {
      const skillsString = jsonObject.skills_in_keywords;
      const skillsArray = skillsString.split(",");
      // Parse the cleaned string as JSON

      // Trim whitespace from each skill and remove empty strings
      const cleanedSkillsArray = skillsArray
        .map((skill) => skill.trim())
        .filter(Boolean);

      // Add skills as an array property in jsonObject
      jsonObject.skills_in_keywords = cleanedSkillsArray;
    }

    console.log({ location: jsonObject.current_location_of_user, field: jsonObject.current_one_profession_of_user, });
    if (
      jsonObject.highest_education_of_user_in_words_with_major &&
      !Array.isArray(jsonObject.highest_education_of_user_in_words_with_major)
    ) {
      jsonObject.highest_education_of_user_in_words_with_major = [
        jsonObject.highest_education_of_user_in_words_with_major,
      ];
    }

    const UserScore = await ScoreScript.fetchScore({
      qualification: jsonObject.highest_education_of_user_in_words_with_major,
      skills: jsonObject.skills_in_keywords,
      experience: jsonObject.number_of_experience_in_years,
      field: jsonObject.current_one_profession_of_user,
      location: jsonObject.current_location_of_user,
    });

    res.status(200).json({ Score: UserScore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing the document" });
  }
};

module.exports = {
  uploadAndExtractDocument,
};
