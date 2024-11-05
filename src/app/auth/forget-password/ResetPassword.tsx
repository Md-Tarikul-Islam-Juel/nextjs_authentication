"use client";

import { changePassword } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader for loading effect
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword: React.FC<{ onPasswordChanged: () => void }> = ({
  onPasswordChanged,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle state for password visibility
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await changePassword(newPassword);
      toast.success("Password changed successfully!");
      onPasswordChanged();
      router.push("/login");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to change password. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reset Your Password</h1>
      <p style={styles.infoText}>
        Please enter a new password that meets the security requirements. Make
        sure to remember it for future logins.
      </p>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={styles.toggleButton}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? <ClipLoader color="#fff" size={18} /> : "Change Password"}
        </button>
      </form>
      <p style={styles.footerText}>
        <small>
          Passwords must be at least 8 characters and include a mix of letters,
          numbers, and symbols.
        </small>
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
  passwordContainer: {
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    textAlign: "center",
    transition: "all 0.2s ease-in-out",
  },
  toggleButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#0070f3",
    cursor: "pointer",
    fontSize: "0.875rem",
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
    marginTop: "0.5rem",
  },
  footerText: {
    fontSize: "0.875rem",
    color: "#888",
    marginTop: "1rem",
  },
};

export default ResetPassword;
