const express = require("express");
const asyncHandler = require("express-async-handler");
const { User } = require("../../db/models");
const { PoemComment } = require("../../db/models");

const router = express.Router();

router.get(
  "/:poemId",
  asyncHandler(async (req, res) => {
    const comments = await PoemComment.findAll({
      where: {
        poem_id: req.params.poemId,
      },
      include: User,
    });

    return res.json(comments);
  })
);

router.post(
  "/:poemId",
  asyncHandler(async (req, res) => {
    const { userId, body, poemId } = req.body;
    const user = await User.findByPk(userId);

    const newComment = await PoemComment.create({
      body,
      user_id: userId,
      poem_id: poemId,
    });

    let data = {
      ...newComment.toJSON(),
      User: {
        ...user.toJSON(),
      },
    };

    return res.json(data);
  })
);

router.delete(
  "/:poemId/:commentId",
  asyncHandler(async (req, res) => {
    const comment = await PoemComment.findByPk(req.params.commentId);

    await comment.destroy();
    return res.status(204).json({})
  })
);

module.exports = router;
