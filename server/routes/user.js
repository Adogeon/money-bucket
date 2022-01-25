const { User } = require("../models");

const router = require("express").Router();

/**
 * @route GET "/user/"
 * route to get all the information for current user
 * expect req.user
 */
router.get("/", async (req, res, next) => {
  if (!req.user) return res.sendStatus(401);
  const userId = req.user.id;
  try {
    const userDoc = await User.findById(userId);
    const userBuckets = await userDoc.populate("buckets");
    const userRecentTransactions = await userDoc.populate("transaction", {
      options: { limit: 20, sort: { date: -1 } },
    });

    const userJSON = userDoc.toJSON();
    userJSON.buckets = userBuckets;
    userJSON.recentTransaction = userRecentTransactions;

    res.status(200).json({ ...userJSON });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
