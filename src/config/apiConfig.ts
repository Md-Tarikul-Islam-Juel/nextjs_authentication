export const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:3001";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/signin`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  VERIFY_OTP: `${API_BASE_URL}/auth/verify`,
  RESEND_OTP: `${API_BASE_URL}/auth/resend`,
  CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`,
  FORGET_PASSWORD: `${API_BASE_URL}/auth/forget-password`,
};
