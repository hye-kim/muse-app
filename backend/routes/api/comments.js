const express = require("express");
const asyncHandler = require("express-async-handler");
const { User } = require("../../db/models");
const { Comment } = require("../../db/models");

const router = express.Router();

router.get(
  "/:poemId",
  asyncHandler(async (req, res) => {
    const comments = await Comment.findAll({
      where: {
          poem_id: req.params.poemId
      },
      include: User
    });

    return res.json(comments);
  })
);

module.exports = router;
