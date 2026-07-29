import * as paymentApi from "../api/paymentApi";

export const createOrder = async (projectId) => {
    const response = await paymentApi.createOrder(projectId);
    return response.data;
};

export const verifyPayment = async (paymentData) => {
    const response = await paymentApi.verifyPayment(paymentData);
    return response.data;
};

export const markPaymentFailed = async (paymentData) => {
    const response = await paymentApi.markPaymentFailed(paymentData);
    return response.data;
};

export const getPaymentsByClient = async (clientId) => {
    const response = await paymentApi.getPaymentsByClient(clientId);
    return response.data;
};