import { toast } from "react-toastify";

export const success = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
};

export const error = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
};

export const warn = (message) => {
  toast.warn(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
};

export const info = (message) => {
  toast.info(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
};
