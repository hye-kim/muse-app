const express = require("express");
const asyncHandler = require("express-async-handler");
const { Poem } = require("../../db/models");
const { Poet } = require("../../db/models")

const router = express.Router();

router.get(
  "",
  asyncHandler(async (req, res) => {
    const poems = await Poem.findAll({
      order: [["title", "DESC"]],
      include: [{model: Poet}],
      limit: 100
    });

    return res.json(poems);
  })
);

module.exports = router;
