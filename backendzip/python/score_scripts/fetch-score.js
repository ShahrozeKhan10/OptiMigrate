const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const {
  JobAvailabilityScrappingData,
  SkillScrappingData,
} = require("../../models");

function getSalaryFromText(text) {
  const regex = /\$([\d,]+(\.\d{2})?)\s*(?:per\s+(year|month))?/i;

  const matches = text.match(regex);

  if (matches) {
    const salaryAmount = matches[1].replace(/,/g, "");

    const salaryType = matches[3] || "year";

    return { salaryAmount, salaryType };
  } else {
    console.log("No salary information found for this country");
    return { salaryAmount: 0, salaryType: null };
  }
}

async function scrapeGoogleForSalary(query, location) {
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments("--headless");
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
  try {
    console.log(query, location);

    const salary = {
      salaryAmount: 0,
      salaryType: null,
    };

    if (query) {
      let pageCount = 1;

      const searchQuery = `site:glassdoor.com ${query} salary in ${location} in usd`;
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        searchQuery
      )}&start=${(pageCount - 1) * 10}`;

      await driver.get(searchUrl);
      const searchResults = await driver.findElements(By.css("div.g"));

      for (const result of searchResults) {
        const text = await result.getText();
        console.log(text);

        const _salary = getSalaryFromText(text);
        if (_salary.salaryAmount) {
          salary.salaryAmount = _salary.salaryAmount;
          salary.salaryType = _salary.salaryType;
          break;
        }
      }

      return salary;
    } else {
      return salary;
    }
  } catch (error) {
    console.error("Error scraping Google:", error);
    return salary;
  } finally {
    await driver.quit();
  }
}

function hasWordMatch(query, search) {
  const queryWords = query.toLowerCase().split(" ");
  const titleWords = search.title.toLowerCase().split(" ");

  for (const queryWord of queryWords) {
    for (const titleWord of titleWords) {
      if (titleWord.includes(queryWord)) {
        return true;
      }
    }
  }

  return false;
}

async function scrapeGoogle(query, location) {
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments("--headless");
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
  try {
    if (query) {
      let allSearchResults = [];
      let pageCount = 1;

      let DBJobs = await JobAvailabilityScrappingData.findOne({
        where: { field: query, city: location },
      });

      if (!DBJobs) {
        while (allSearchResults.length < 100) {
          const searchQuery = `site:linkedin.com ${query} jobs in ${location}`;
          const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
            searchQuery
          )}&start=${(pageCount - 1) * 10}`;

          await driver.get(searchUrl);
          const searchResults = await driver.findElements(By.css("div.g"));

          for (const result of searchResults) {
            const titleElement = await result.findElement(By.css("h3"));
            const title = await titleElement.getText();
            const linkElement = await result.findElement(By.css("a"));
            const link = await linkElement.getAttribute("href");

            allSearchResults.push({ title, link });
          }

          if (searchResults.length === 0) {
            break;
          }

          pageCount++;
        }

        await JobAvailabilityScrappingData.create({
          field: query,
          city: location,
          scraping_data: allSearchResults,
        });
      } else {
        allSearchResults = DBJobs;
      }

      let resultCount = 0;

      if (!DBJobs) {
        resultCount = allSearchResults.filter(
          (search) =>
            hasWordMatch(query, search) && hasWordMatch(location, search)
        ).length;
      } else {
        resultCount = allSearchResults.dataValues.scraping_data.filter(
          (search) =>
            hasWordMatch(query, search) && hasWordMatch(location, search)
        ).length;
      }

      const jobAvailabilityScore = (resultCount / 100) * 33;
      return jobAvailabilityScore;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error scraping Google:", error);
    return 0;
  } finally {
    await driver.quit();
  }
}

async function scrapeCourseraCourses(userSkills) {
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments("--headless");
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

  try {
    let allCourseraCourses = [];
    let scoreCountOfEachSkill = [];

    for (const skill of userSkills) {
      allCourseraCourses = [];
      let DBSkillCourses = await SkillScrappingData.findOne({
        where: { skill: skill },
      });

      if (!DBSkillCourses) {
        let page = 0;
        let resultsFound = 0;

        while (resultsFound < 10) {
          const searchQuery = `site:coursera.org ${skill} courses`;
          const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
            searchQuery
          )}&start=${page * 10}`;

          await driver.get(searchUrl);

          const searchResults = await driver.findElements(By.css("div.g"));

          for (const result of searchResults) {
            const titleElement = await result.findElement(By.css("h3"));
            const title = await titleElement.getText();
            const linkElement = await result.findElement(By.css("a"));
            const link = await linkElement.getAttribute("href");

            allCourseraCourses.push({ title, link });
          }

          resultsFound += searchResults.length;
          page++;

          if (searchResults.length === 0) {
            break;
          }
        }

        await SkillScrappingData.create({
          skill: skill,
          scraping_data: allCourseraCourses,
        });
      } else {
        allCourseraCourses = DBSkillCourses;
      }

      let count = 0;

      if (!DBSkillCourses) {
        allCourseraCourses.forEach((course) => {
          if (course.title.toLowerCase().includes(skill.toLowerCase())) {
            count++;
          }
        });
      } else {
        allCourseraCourses.dataValues.scraping_data.forEach((course) => {
          if (course.title.toLowerCase().includes(skill.toLowerCase())) {
            count++;
          }
        });
      }

      scoreCountOfEachSkill.push(count);
    }

    const sum = scoreCountOfEachSkill.reduce(
      (total, currentValue) => total + currentValue,
      0
    );

    const average = sum / scoreCountOfEachSkill.length;

    return (average / 10) * 33;
  } catch (error) {
    console.error("Error scraping Coursera courses:", error);
    return 0;
  } finally {
    await driver.quit();
  }
}

function calculateTotalExperience(experience) {
  let totalExperience = 0;

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Iterate through each experience object
  for (const exp of experience) {
    const startYear = parseInt(exp.start_year, 10);
    const endYear = parseInt(exp.end_year, 10);

    if (!isNaN(startYear) && !isNaN(endYear)) {
      // Calculate the difference in years and add it to the totalExperience
      totalExperience += endYear - startYear + 1;
    } else if (!isNaN(startYear)) {
      // If end_year is not provided, assume the person is still working in that position
      totalExperience += currentYear - startYear + 1;
    }
  }

  return totalExperience > 11 ? 11 : totalExperience;
}

const fetchScore = async ({
  qualification,
  skills,
  experience,
  field,
  location,
}) => {
  try {
    /**
     * Qualification Score
     */
    let qualificationScore = 0;
    qualification.map((education) => {
      if (
        education.degree_name === "High school or equivalent" &&
        qualificationScore < 5
      ) {
        qualificationScore = 5;
      } else if (
        education.degree_name === "Diploma" &&
        qualificationScore < 5
      ) {
        qualificationScore = 5;
      } else if (
        education.degree_name === "Bachelor" &&
        qualificationScore < 7
      ) {
        qualificationScore = 7;
      } else if (
        education.degree_name === "Higher diploma" &&
        qualificationScore < 7
      ) {
        qualificationScore = 7;
      } else if (education.degree_name === "Master" && qualificationScore < 9) {
        qualificationScore = 9;
      } else if (
        education.degree_name === "Doctorate" &&
        qualificationScore < 11
      ) {
        qualificationScore = 11;
      }
    });

    /**
     * Experience Score
     */
    const experienceScore = calculateTotalExperience(experience);

    /**
     * Job Availability Score
     */
    let jobAvailabilityScore = 0;
    if (field && location) {
      jobAvailabilityScore = await scrapeGoogle(field, location);
    }
    const salary = await scrapeGoogleForSalary(field, location);

    /**
     * Future Score
     */
    let futureReadinessScore = 0;
    if (skills.length) {
      futureReadinessScore = await calculateFutureReadinessScore(skills);
    }

    const skillReadiness =
      qualificationScore + experienceScore + (jobAvailabilityScore / 10) * 11;

    const overallScore =
      jobAvailabilityScore + futureReadinessScore + skillReadiness;

    return {
      jobAvailabilityScore: jobAvailabilityScore,
      futureReadinessScore,
      skillReadiness,
      overallScore,
      salary,
    };
  } catch (error) {
    console.error("Error:", error);
  }
};

async function calculateFutureReadinessScore(userSkills) {
  try {
    const futureReadinessScore = await scrapeCourseraCourses(userSkills);

    return futureReadinessScore;
  } catch (error) {
    console.error("Error calculating Future Readiness Score:", error);
    return 0;
  }
}

module.exports = {
  fetchScore,
  scrapeGoogleForSalary,
};
