import { useState, useEffect, useCallback } from "react";
import type { Task } from "@/types";
import { taskApi } from "../services/api";

interface UseTasksReturn {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (data: Task) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = useCallback(async () => {
    try {
      const fetchedTasks = await taskApi.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      console.log("Error fetching tasks:", err);
      throw err;
    }
  }, []);

  const addTask = useCallback(async (data: Task) => {
    try {
      const newTask = await taskApi.createTask(data);
      setTasks((prevTask) => [newTask, ...prevTask]);
    } catch (err) {
      console.log("Error creating taks", err);
      throw err;
    }
  }, []);

  const removeTask = useCallback(async (id: number) => {
    try {
      await taskApi.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
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

  const toggleTask = useCallback(
    async (id: number) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      try {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t,
          ),
        );
      } catch (err) {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === id ? { ...t, completed: task.completed } : t,
          ),
        );
        console.error("Error toggling task:", err);
        throw err;
      }
    },
    [tasks],
  );

  return {
    tasks,
    fetchTasks,
    addTask,
    removeTask,
    toggleTask,
  };
};
