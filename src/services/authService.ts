import { API_ENDPOINTS } from "@/config/apiConfig";
import axiosInstance from "./axiosInstance";

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, {
    email,
    password,
  });
  return response.data;
};

export const signup = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const response = await axiosInstance.post(API_ENDPOINTS.SIGNUP, {
    email,
    password,
    firstName,
    lastName,
    mfaEnabled: false,
  });
  return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const response = await axiosInstance.post(API_ENDPOINTS.VERIFY_OTP, {
    email,
    otp,
  });
  return response.data;
};

export const sendOtp = async (email: string) => {
  const response = await axiosInstance.post(API_ENDPOINTS.RESEND_OTP, {
    email,
  });
  return response.data;
};

export const changePassword = async (newPassword: string) => {
  const response = await axiosInstance.post(API_ENDPOINTS.CHANGE_PASSWORD, {
    newPassword,
  });
  return response.data;
};

export const forgetPassword = async (email: string) => {
  const response = await axiosInstance.post(API_ENDPOINTS.FORGET_PASSWORD, {
    email,
  });
  return response.data;
};
