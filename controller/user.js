const User = require("../models/User.js");

module.exports = {
  async createUser(req, res) {
    try {
      const userDetails = req.body;

      const createUser = await User.create(userDetails);
      if (createUser) {
        return res.status(201).json({
          status: true,
          message: "User created",
          data: createUser,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "User not created",
        });
      }
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({
          status: false,
          message: "User with name already exists",
        });
      }
      return res.status(500).json({
        status: false,
        message: `Internal server error occured`,
      });
    }
  },
};
