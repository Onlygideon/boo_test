const Profile = require("../models/Profile.js");

module.exports = {
  async createProfile(req, res) {
    try {
      const profileDetails = req.body;
      profileDetails.image = "https://soulverse.boo.world/images/1.png";

      const createProfile = await Profile.create(profileDetails);
      if (createProfile) {
        return res.status(201).json({
          status: true,
          message: "Profile created",
          data: createProfile,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Profile not created",
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: `Internal server error occured`,
      });
    }
  },

  async fetchSpecificProfile(req, res) {
    try {
      const profileId = req.params.id;
      if (!profileId) {
        res.status(400).json({
          status: false,
          message: "Profile ID required",
        });
      }

      const profile = await Profile.findById(profileId);
      if (profile) {
        return res.render("profile_template", {
          profile,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Profile not found",
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: `Internal server error occured`,
      });
    }
  },
};
