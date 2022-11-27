// imports
const express = require("express");
const PostModel = require("../model/PostModel");
const capitalize = require("../utils/capitalize");

// Global vars
const router = express.Router();

// Routes
router.get(
  "/keywords", // Get keywords class
  async (req, res) => {
    // get top 10 keywords
    try {
      const posts = await PostModel.find(undefined, "keywords");
      const listOfWords = posts
        .filter((p) => !!p.keywords) // only posts that have keywords
        .map((p) => (p.keywords || "").split(",")) // split the keywords
        .flat() // make a flat array of keywords
        .map((w) => capitalize(w.trim())); // trim and capitalize the words

      const words = [...new Set(listOfWords)] // get the unique keywords
        .map((word) => {
          // find out how many times they have mentioned
          let times = 0;
          listOfWords.forEach((wB) => {
            if (word === wB) times++;
          });
          return { word, times };
        })
        .sort((a, b) => b.times - a.times) // sort the list
        .slice(0, 10) // only get 10 common words
        .map((obj) => obj.word);
      res.send(words);
    } catch ({ status, message }) {
      res.status(status || 500).send(message || "+++ Server error!");
    }
  }
);

// export
module.exports = router;
