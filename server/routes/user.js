const router = require("express").Router();
const { User } = require("../db/models");

/**
 * @route GET "/user/"
 * route to get all the information for current user
 * expect req.user
 */
router.get("/", async (req, res, next) => {
  if (!req.user) return res.sendStatus(401);
  const userId = req.user.id;
  try {
    const userDoc = await User.findById(userId).populate("buckets");
    if (!userDoc) return res.sendStatus(500);

    const userJSON = userDoc.toJSON();
    delete userJSON.password;

    res.status(200).json({ ...userJSON });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
