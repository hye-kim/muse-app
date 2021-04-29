const express = require("express");
const asyncHandler = require("express-async-handler");
const { Poem } = require("../../db/models");
const { Poet } = require("../../db/models");

const router = express.Router();

router.get(
  "",
  asyncHandler(async (req, res) => {
    const poems = await Poem.findAll({
      include: [{ model: Poet }],
    });

    return res.json(poems);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const poem = await Poem.findByPk(req.params.id, {
      include: [{model: Poet}]
    });

    poem.update({view_count: poem.view_count + 1})

    return res.json(poem);
  })
);

module.exports = router;
