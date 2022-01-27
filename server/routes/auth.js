const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");

const { User } = require("../db/models");

/**
 * @route POST /auth/login
 * expect {username, password} in req.body
 */
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.send(400).json({ error: "Username and password required" });

  try {
    const userDoc = await User.findOne({ username: username });
    if (!userDoc) return res.sendStatus(401);
    if (!User.comparePassword(password)) return res.sendStatus(401);
    const token = jsonwebtoken.sign(
      {
        id: userDoc._id,
      },
      process.env.SECRET
    );
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res
      .send(400)
      .json({ error: "Username, email, and password required" });

  try {
    const userDoc = await User.create(req.body);
    const token = jsonwebtoken.sign({ id: userDoc._id }, process.env.SECRET);
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
