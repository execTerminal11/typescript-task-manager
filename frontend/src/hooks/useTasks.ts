import { useState, useEffect, useCallback } from "react";
import type { Task } from "@/types";
import { taskApi } from "../services/api";

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (data: Task) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
  //   toggleTask: (id: string) => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const fetchedTasks = await taskApi.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch tasks";
      setError(message);
      console.log("Error fetching tasks:", err);
      throw err;
    }
  }, []);

  const addTask = useCallback(async (data: Task) => {
    try {
      setError(null);
      const newTask = await taskApi.createTask(data);
      setTasks((prevTask) => [newTask, ...prevTask]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch tasks";
      setError(message);
      console.log("Error creating taks", err);
      throw err;
    }
  }, []);

  const removeTask = useCallback(async (id: number) => {
    try {
      setError(null);
      await taskApi.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete task";
      setError(message);
      console.error("Error deleting task:", err);
      throw err;
    }
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await fetchTasks();
      } catch (err) {
        console.error("Failed to load tasks using useEffect:", err);
      }
    };
    loadTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    removeTask,
  };
};
