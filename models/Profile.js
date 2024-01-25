const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    mbti: {
      type: String,
      required: true,
    },

    enneagram: {
      type: String,
      required: true,
    },

    variant: {
      type: String,
      required: true,
    },

    tritype: {
      type: Number,
      required: true,
    },

    socionics: {
      type: String,
      required: true,
    },

    sloan: {
      type: String,
      required: true,
    },

    psyche: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("Profile", profileSchema);
