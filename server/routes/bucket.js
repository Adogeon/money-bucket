const router = require("express").Router();
const { Bucket } = require("../db/models");

/**
 * @route GET /bucket/:name
 *name
 */
router.get("/:name", async (req, res, next) => {
  const userId = req.user.id;

  if (!userId) return res.sendStatus(401);

  try {
    const bucketDoc = await Bucket.findOne({
      name: req.params.name,
      user: userId,
    });
    if (!bucketDoc)
      return res
        .status(500)
        .json({ error: `Can't find bucket with name ${req.params.name}` });

    const transactions = await bucketDoc.populate("transactions");

    const bucketJSON = bucketDoc.toJSON();
    bucketJSON.transactions = transactions;
    bucketJSON.transactions = res.status(200).json(bucketJSON);
  } catch (error) {
    next(error);
  }
});
