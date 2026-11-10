import { type Request, type Response } from "express";
import { AppError } from "@/middleware/errorHandlers.js";
import { pool } from "@/config/db.js";
import type { ApiResponse } from "@/types/index.js";
import type { Task } from "@/types/index.js";

// get all todos
export const getAllTasks = async (
  req: Request,
  res: Response,
) => {
  const result = await pool.query<Task>(
    "SELECT * FROM todos ORDER BY created_at DESC",
  );
  const tasks = result.rows

  const response: ApiResponse<Task[]> = {
    success: true,
    data: tasks,
    message: `Retrieved ${tasks.length} tasks`,
  };
  
  res.status(200).json(response);
};
