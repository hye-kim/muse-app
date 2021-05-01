const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Annotation, AnnotationVote } = require("../../db/models");

const router = express.Router();

router.get(
  "/:poemId",
  asyncHandler(async (req, res) => {
    const annotations = await Annotation.findAll({
      where: {
        poem_id: req.params.poemId,
      },
      include: User,
    });

    return res.json(annotations);
  })
);

router.post(
  "/:poemId",
  asyncHandler(async (req, res) => {
    const { userId, body, poemId, startPos, endPos } = req.body;
    const user = await User.findByPk(userId);

    const newAnnotation = await Annotation.create({
      body,
      start_pos: startPos,
      end_pos: endPos,
      user_id: userId,
      poem_id: poemId,
    });

    let data = {
      ...newAnnotation.toJSON(),
      User: {
        ...user.toJSON(),
      },
    };

    return res.json(data);
  })
);

router.delete(
  "/:annotationId",
  asyncHandler(async (req, res) => {
    const annotation = await Annotation.findByPk(req.params.annotationId);

    await annotation.destroy();
    return res.status(204).json({});
  })
);

router.put(
  "/:annotationId",
  asyncHandler(async (req, res) => {
    const { body, userId } = req.body;
    const annotation = await Annotation.findByPk(req.params.annotationId);
    const user = await User.findByPk(userId);

    annotation.update({
      body,
    });

    let data = {
        ...annotation.toJSON(),
        User: {
          ...user.toJSON(),
        },
      };

      return res.json(data);
  })
);

router.get(
  "/:annotationId/votes",
  asyncHandler(async (req, res) => {
    const votes = await AnnotationVote.findAll({
      where: {
        annotation_id: req.params.annotationId,
      },
    });

    return res.json(votes);
  })
);

router.post(
  "/:annotationId/votes",
  asyncHandler(async (req, res) => {
    const { userId, voteType } = req.body;
    // const { userId } = req.body;

    console.log("VOTE TYPE", voteType);

    const vote = await AnnotationVote.findOne({
      where: {
        annotation_id: req.params.annotationId,
        user_id: userId,
      },
    });

    if (vote == null && voteType === "upvote") {
      // if (vote == null) {
      const vote = await AnnotationVote.create({
        vote: 1,
        user_id: userId,
        annotation_id: req.params.annotationId,
      });
      return res.json(vote);
      // }
    } else if (vote == null && voteType === "downvote") {
      const vote = await AnnotationVote.create({
        vote: -1,
        user_id: userId,
        annotation_id: req.params.annotationId,
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
