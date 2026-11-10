import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "@/middleware/errorHandlers.js";
import { pool } from "@/config/db.js";

// get all todos
export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await pool.query(
    "SELECT * FROM todos ORDER BY created_at DESC",
  );

  const response: Api
};
