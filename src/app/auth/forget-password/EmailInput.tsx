"use client";

import { forgetPassword } from "@/services/authService";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface EmailInputProps {
  onEmailSent: (email: string, timeout: number, unit: "secs" | "mins") => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ onEmailSent }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await forgetPassword(email);
      const { timeout, unit } = response.data;
      toast.success("OTP sent successfully! Check your email.");
      onEmailSent(email, timeout, unit);
    } catch (err: any) {
      setError("Failed to send OTP. Please try again.");
      toast.error(error || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(validateEmail(e.target.value) ? null : "Invalid email format");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Forgot Password</h1>
      <p style={styles.infoText}>
        Enter your registered email address, and we’ll send you a One-Time
        Password (OTP) to reset your password.
      </p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
          style={{
            ...styles.input,
            borderColor: error ? "red" : "#ccc",
            transition: "border-color 0.3s",
          }}
        />
        {error && <span style={styles.error}>{error}</span>}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? <ClipLoader color="#fff" size={18} /> : "Send OTP"}
        </button>
      </form>
      <p style={styles.footerText}>
        If you remember your password,{" "}
        <a href="/login" style={styles.link}>
          go back to login
        </a>
        .
      </p>
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
    transition: "all 0.2s ease-in-out",
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
  error: {
    color: "red",
    fontSize: "0.875rem",
    textAlign: "left",
    marginTop: "-0.5rem",
  },
  footerText: {
    fontSize: "0.875rem",
    color: "#666",
    marginTop: "1.5rem",
  },
  link: {
    color: "#0070f3",
    textDecoration: "none",
  },
};

export default EmailInput;
