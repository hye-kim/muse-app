const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, PoemComment, PoemCommentVote } = require("../../db/models");

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

router.delete(
  "/:commentId",
  asyncHandler(async (req, res) => {
    const comment = await PoemComment.findByPk(req.params.commentId);

    await comment.destroy();
    return res.status(204).json({});
  })
);

router.get(
  "/:commentId/votes",
  asyncHandler(async (req, res) => {
    const votes = await PoemCommentVote.findAll({
      where: {
        comment_id: req.params.commentId,
      },
    });

    return res.json(votes);
  })
);

router.post(
  "/:commentId/votes",
  asyncHandler(async (req, res) => {
    const { userId, voteType } = req.body;
    // const { userId } = req.body;

    console.log("VOTE TYPE", voteType)

    const vote = await PoemCommentVote.findOne({
      where: {
        comment_id: req.params.commentId,
        user_id: userId,
      },
    });

    if (vote == null && voteType === "upvote") {
      // if (vote == null) {
      const vote = await PoemCommentVote.create({
        vote: 1,
        user_id: userId,
        comment_id: req.params.commentId,
      });
      return res.json(vote);
      // }
    } else if (vote == null && voteType === "downvote") {
      const vote = await PoemCommentVote.create({
        vote: -1,
        user_id: userId,
        comment_id: req.params.commentId,
      });
      return res.json(vote);
    } else if (voteType === "upvote") {
      // else {
      let voteInt = vote.vote === 1 ? 0 : 1;
      vote.update({ vote: voteInt });
      return res.json(vote);
    } else {
      let voteInt = vote.vote === -1 ? 0 : -1;
      vote.update({ vote: voteInt });
      return res.json(vote);
    }
  })
);

module.exports = router;
