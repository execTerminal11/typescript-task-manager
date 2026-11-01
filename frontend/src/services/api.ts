import axios, { AxiosError } from "axios";
import type { Task, ApiResponse, RawTitle, TaskUpdate } from "@/types";

const apiClient = axios.create({
  baseURL: "api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle network errors
    if (!error.response) {
      throw new Error("Network error: Unable to connect to the server");
    }

    // Handle API
    const errorData = error.response.data as any;
    const message =
      errorData?.error?.message ||
      errorData?.message ||
      "An unexpected error occurred";

    throw new Error(message);
  },
);

export const taskApi = {
  async getTasks(): Promise<Task[]> {
    const response = await apiClient.get<ApiResponse<Task[]>>("/tasks");
    return response.data.data || [];
  },

  async createTask(data: RawTitle): Promise<Task> {
    const response = await apiClient.post<ApiResponse<Task>>("/tasks", data);
    if (!response.data.data) {
      throw new Error("Failed to create task");
    }
    return response.data.data;
  },

  async updateTask(id: number, data: TaskUpdate): Promise<Task> {
    const response = await apiClient.put<ApiResponse<Task>>(
      `/tasks/${id}`,
      data,
    );
    if (!response.data.data) {
      throw new Error("Failed to update task");
    }
    return response.data.data;
  },

  async deleteTask(id: number): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  },
};
