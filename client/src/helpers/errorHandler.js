import { toast } from 'react-toastify';

export const errorHandler = error => {
  if (error.response) {
    toast(error.response.data.message, { className: 'toast-danger' });
  } else {
    toast("quelque chose s'est mal passé ", { className: 'toast-danger' });
  }
};
