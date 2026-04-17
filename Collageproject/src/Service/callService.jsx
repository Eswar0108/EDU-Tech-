import axiosInstance from "../baseapi";

export const createCallSession = (bookingId) => {
  return axiosInstance
    .post(`/call/session/create/${bookingId}`)
    .then((res) => res.data);
};

export const getCallToken = (bookingId) => {
  return axiosInstance
    .get(`/call/token/${bookingId}`)
    .then((res) => res.data);
};

export const startCallAPI = (bookingId) => {
  return axiosInstance.post(`/call/start/${bookingId}`);
};

export const endCallAPI = (bookingId) => {
  return axiosInstance.post(`/call/end/${bookingId}`);
};

export const callStatusAPI = (bookingId) => {
  return axiosInstance
    .get(`/call/status/${bookingId}`)
    .then((res) => res.data);
};