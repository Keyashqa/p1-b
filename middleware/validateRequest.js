// middleware/validateRequest.js
module.exports = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      res.status(400).json({ error: err.details[0].message });
    }
  };
};
