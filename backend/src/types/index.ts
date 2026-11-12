export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: unknown;
  };
  message?: string;
}

