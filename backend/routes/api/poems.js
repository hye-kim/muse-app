const express = require("express");
const asyncHandler = require("express-async-handler");
const { Poem, Poet, User, PoemComment } = require("../../db/models");

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

router.post(
  "/:poemId/comments",
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

module.exports = router;
