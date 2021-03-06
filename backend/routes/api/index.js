const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");

const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const poemsRouter = require("./poems.js");
const commentsRouter = require("./comments.js");
const annotationsRouter = require("./annotations.js")

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/poems", poemsRouter);
router.use("/comments", commentsRouter);
router.use("/annotations", annotationsRouter);

router.get(
  "/set-token-cookie",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: "DemoUser",
      },
    });
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

const { requireAuth } = require("../../utils/auth.js");
router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
