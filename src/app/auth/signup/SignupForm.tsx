"use client";

import OtpVerification from "@/app/auth/verify-otp/VerifyOtpForm";
import { signup } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordInput from "./PasswordInput";
import TextInput from "./TextInput";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpTimeout, setOtpTimeout] = useState(5); // Default OTP timeout
  const [otpUnit, setOtpUnit] = useState("mins"); // Default OTP unit

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      const errorMessage = "Passwords do not match.";
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    try {
      const response = await signup(email, password, firstName, lastName);
      if (response.success) {
        toast.success("Signup successful! Please verify your OTP.");

        // Set OTP details from the response
        setEmail(response.data.user.email);
        setOtpTimeout(response.data.otp.timeout);
        setOtpUnit(response.data.otp.unit);

        // Show OTP Verification form
        setIsOtpSent(true);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to sign up. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Callback after OTP verification success
  const handleOtpVerified = () => {
    router.push("/dashboard");
  };

  // Render OTP Verification component if OTP is sent
  if (isOtpSent) {
    return (
      <OtpVerification
        email={email}
        onOtpVerified={handleOtpVerified}
        timeout={otpTimeout}
        unit={otpUnit as "secs" | "mins"}
      />
    );
  }

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h1 style={styles.header}>Sign Up</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <TextInput
              id="firstName"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
            />
            <TextInput
              id="lastName"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              required
            />
          </div>
          <TextInput
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.loadingButton : {}),
            }}
          >
            {loading ? <ClipLoader color="#fff" size={18} /> : "Sign Up"}
          </button>
        </form>
        <p style={styles.signInText}>
          Already have an account?{" "}
          <Link href="/login" style={styles.signInLink}>
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  container: {
    maxWidth: "500px",
    width: "100%",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    color: "#333",
    fontSize: "2.5rem",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
  },
  button: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#0070f3",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s, transform 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingButton: { backgroundColor: "#004a9f", cursor: "not-allowed" },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  signInText: {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#666",
  },
  signInLink: {
    color: "#0070f3",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default SignupForm;
