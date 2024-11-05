"use client";

import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const initializeUser = useAuthStore((state) => state.initializeUser);
  const router = useRouter();

  // Initialize the user from localStorage if it doesn't exist
  useEffect(() => {
    if (!user) {
      initializeUser();
    }
  }, [user, initializeUser]);

  // If user is not loaded yet, show loading state
  if (!user) {
    return <p>Loading...</p>;
  }

  // Logout handler
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>
        Welcome, {user.firstName} {user.lastName}!
      </h1>
      <p style={styles.text}>Email: {user.email}</p>
      <p style={styles.text}>Role: {user.role}</p>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
};

// Inline styles for Dashboard component
const styles = {
  container: {
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center" as const,
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "0.5rem",
  },
  button: {
    marginTop: "1.5rem",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Dashboard;
