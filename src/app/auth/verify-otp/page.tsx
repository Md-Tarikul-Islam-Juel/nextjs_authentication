// src/app/verify-otp/page.tsx
import React from "react";
import OtpVerificationForm from "./VerifyOtpForm";

const VerifyOtpPage: React.FC = () => (
  <OtpVerificationForm
    email={""}
    onOtpVerified={function (): void {
      throw new Error("Function not implemented.");
    }}
    timeout={0}
    unit={"mins"}
  />
);

export default VerifyOtpPage;
