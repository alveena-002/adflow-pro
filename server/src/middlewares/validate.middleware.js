const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value,
    }));

    if (process.env.NODE_ENV !== "production") {
      console.warn("Validation failed:", JSON.stringify(errors, null, 2));
      console.warn("Request body:", JSON.stringify(req.body, null, 2));
    }

    return res.status(422).json({
      success: false,
      message: errors.map((e) => `${e.field}: ${e.message}`).join(" | "),
      errors,
    });
  }

  next();
};

module.exports = { validate };
