export type ErrorType = {
  response?: {
    data?: {
      message: string;
    };
  };
  message?: string;
};

export type RTKErrorType = {
  data?: {
    message: string;
  };
  message?: string;
};

export const setError = (error: ErrorType | any) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

  return message;
};

export const rtkError = (error: any) => {
  const message =
    (error && error.data && error.data.message) ||
    error.message ||
    error.toString();

  return message;
};
