export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface RawTitle {
  title: string;
}

export interface TaskUpdate {
  id?: number;
  title?: string;
  completed: boolean;
}

export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: {
    message: string;
    details?: void;
  };
  message?: string;
}

export interface ApiErrorResponse {
  error?: {
    message: string;
  };
  message?: string;
}
