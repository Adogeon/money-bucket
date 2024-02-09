import express from "express";
import type { Request, Response, NextFunction, RequestHandler } from "express";
import mongoose from "mongoose";
import Bucket from "../models/bucket";
import { getUserId } from "./utils";
import bucketServices from "src/layers/services/bucket.services";
import bucketController from "src/controllers/bucket.controller";
const router = express.Router();


router.post("/", async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const newBucket = await bucketController.create({ ...req.body, user: userId });
    return res.json({ newBucket })
  } catch (error) {
    next(error)
  }
})

router.route("/:bucketId").get(async (req, res, next) => {
  try {
    const bucket = await bucketController.getBucketById(req.params.bucketId);
    return res.json({ bucket })
  } catch (error) {
    next(error);
  }
}).put(async (req, res, next) => {
  try {
    const bucket = await bucketController.updateBucketById(req.params.bucketId, req.body);
    return res.json({ bucket })
  } catch (error) {
    next(error)
  }
}).delete(async (req, res, next) => {
  try {
    const isSuccess = await bucketController.deleteBucketById(req.params.bucketId);
    return isSuccess ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    next(error)
  }
})

router.get("/summary/:month", (async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const reqMonth = Number(req.params.month.slice(0, 2));
    const reqYear = Number(req.params.month.slice(2));

    const bucketSummaryList = await bucketController.listByUserIdWithMonthSummary(userId, { month: reqMonth, year: reqYear })

    res.status(200).json(bucketSummaryList);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

router.get("/simple", async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const bucketList = await bucketController.listByUserId(userId);
    res.status(200).json(bucketList);
  } catch (error) {
    next(error);
  }
});

export default router;
