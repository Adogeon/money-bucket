import express from "express";
import type { iUserAuth } from "src/middleware/authMiddleware";

declare global {
  namespace Express {
    interface Request {
      user?: iUserAuth;
    }
  }
}
