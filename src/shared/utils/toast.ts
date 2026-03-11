import toast from "react-hot-toast";

export const toastSuccess = (message: string): string => {
  return toast.success(message);
};

export const toastError = (message: string): string => {
  return toast.error(message);
};

export const toastInfo = (message: string): string => {
  return toast(message, {
    icon: "ℹ️",
  });
};
