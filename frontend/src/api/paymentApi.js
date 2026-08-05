import api from "./api";

export const createOrder = (projectId) => {
    return api.post("/payments/create-order", {
        projectId,
    });
};

export const verifyPayment = (paymentData) => {
    return api.post("/payments/verify", paymentData);
};

export const markPaymentFailed = (paymentData) => {
    return api.patch("/payments/fail", paymentData);
};

export const getPaymentsByClient = (clientId) => {
    return api.get(`/payments/client/${clientId}`);
};

export const getMyPayments = () =>
    api.get("/payments/client/history");