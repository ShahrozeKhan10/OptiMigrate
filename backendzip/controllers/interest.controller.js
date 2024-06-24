const helperFunction = require("../helper/common");
const interestService = require("../services/interest.service");
const httpStatus = require("http-status");

exports.getInterest = async (req, res, next) => {
  let { orderBy, page, size, q } = req.query;
  try {
    let scoreData = await interestService.getAllInterests(
      orderBy,
      page,
      size,
      q
    );
    helperFunction.apiResponse(scoreData, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};
