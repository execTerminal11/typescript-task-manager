import { type Request, type Response, type NextFunction } from "express";
// import { AppError } from "@/middleware/errorHandlers.js";
import { pool } from "@/config/db.js";
import type { ApiResponse } from "@/types/index.js";
import type { Task } from "@/types/index.js";
import { AppError } from "@/middleware/errorHandlers.js";

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

export const createTask = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title }: Task = req.body

    if (!title || title.trim().length === 0) {
      return next(new AppError(400, "task titile is required"));
    }

    if (title.length > 200) {
      return next(new AppError(400, "task title must be less than 200 chareacters"))
    }

    const task = await pool.query(
      'INSERT INFO todos (title) VALUES ($1) RETURNING',
      [title.trim]
    )
    const reponse: ApiResponse = {
      success: true,
      data: task.rows[0],
      message: "Task created successfully",
    }
    res.status(201).json(reponse)
}


