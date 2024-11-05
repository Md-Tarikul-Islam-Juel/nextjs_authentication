"use client";

import { sendOtp } from "@/services/authService";
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface OtpVerificationProps {
  email: string;
  onOtpVerified: () => void;
  timeout: number;
  unit: "secs" | "mins";
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  email,
  onOtpVerified,
  timeout,
  unit,
}) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const verifyOtp = useAuthStore((state) => state.verifyOtp);

  useEffect(() => {
    const initialCooldown = unit === "mins" ? timeout * 60 : timeout;
    setCooldown(initialCooldown);
  }, [timeout, unit]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await verifyOtp(email, otp);
      toast.success("OTP verified successfully!");
      onOtpVerified();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to verify OTP. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setCooldown(unit === "mins" ? timeout * 60 : timeout);

    try {
      await sendOtp(email);
      toast.success("OTP resent successfully! Check your email.");
    } catch (err: any) {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Verify Your OTP</h1>
      <p style={styles.infoText}>
        Please enter the OTP sent to <strong>{email}</strong>. The OTP is valid
        for {timeout} {unit === "mins" ? "minutes" : "seconds"}.
      </p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? <ClipLoader color="#fff" size={18} /> : "Verify OTP"}
        </button>
      </form>

      <button
        onClick={handleResend}
        disabled={resendLoading || cooldown > 0}
        style={{
          ...styles.button,
          marginTop: "1rem",
          background: cooldown > 0 ? "#888" : "#555",
        }}
      >
        {resendLoading ? (
          <ClipLoader color="#fff" size={18} />
        ) : (
          `Resend OTP ${
            cooldown > 0
              ? `(${Math.floor(cooldown / 60)}:${
                  cooldown % 60 < 10 ? "0" : ""
                }${cooldown % 60}s)`
              : ""
          }`
        )}
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "2rem",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  infoText: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "1.5rem",
    lineHeight: "1.5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    textAlign: "center",
  },
  button: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "none",
    background: "#0070f3",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s",
  },
};

export default OtpVerification;
