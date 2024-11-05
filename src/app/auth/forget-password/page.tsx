"use client";

import OtpVerification from "@/app/auth/verify-otp/VerifyOtpForm";
import React, { useState } from "react";
import EmailInput from "./EmailInput";
import ResetPassword from "./ResetPassword";

const ForgetPassword: React.FC = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [timeout, setTimeoutValue] = useState(0);
  const [unit, setUnit] = useState<"secs" | "mins">("secs");

  const handleEmailSent = (
    email: string,
    timeout: number,
    unit: "secs" | "mins"
  ) => {
    setEmailSent(true);
    setEmail(email);
    setTimeoutValue(timeout); // Set timeout from API
    setUnit(unit); // Set unit from API
  };

  const handleOtpVerified = () => {
    setOtpVerified(true);
  };

  const handlePasswordChanged = () => {
    console.log("Password successfully changed.");
    // You can redirect the user to the login page or show a success message here
  };

  return (
    <div style={styles.container}>
      {!emailSent ? (
        <EmailInput onEmailSent={handleEmailSent} />
      ) : !otpVerified ? (
        <OtpVerification
          email={email}
          onOtpVerified={handleOtpVerified}
          timeout={timeout}
          unit={unit}
        />
      ) : (
        <ResetPassword onPasswordChanged={handlePasswordChanged} />
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
};

export default ForgetPassword;
