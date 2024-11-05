// "use client";

// import useAuthStore from "@/store/authStore";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import InputField from "./InputField"; // Import the new InputField component

// const LoginForm: React.FC = () => {
//   const login = useAuthStore((state) => state.login);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       await login(email, password);
//       toast.success("Login successful!");
//       router.push("/dashboard");
//     } catch (err) {
//       setError(
//         typeof err === "string" ? err : "Failed to login. Please try again."
//       );
//       toast.error("Failed to login. Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   return (
//     <div style={styles.outerContainer}>
//       <div style={styles.container}>
//         <h1 style={styles.header}>Sign In</h1>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <InputField
//             id="email"
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Enter your email"
//           />
//           <InputField
//             id="password"
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Enter your password"
//             showPasswordToggle={togglePasswordVisibility}
//             showPassword={showPassword}
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             style={
//               loading
//                 ? { ...styles.button, ...styles.loadingButton }
//                 : styles.button
//             }
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <p style={styles.forgotPasswordText}>
//           <Link href="/forget-password" style={styles.forgotPasswordLink}>
//             Forgot Password?
//           </Link>
//         </p>
//         <p style={styles.signupText}>
//           Don't have an account?{" "}
//           <Link href="/signup" style={styles.signupLink}>
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// // Styles
// const styles = {
//   outerContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     backgroundColor: "#f0f2f5",
//   },
//   container: {
//     maxWidth: "500px",
//     width: "100%",
//     padding: "2rem",
//     borderRadius: "10px",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//     backgroundColor: "#fff",
//   },
//   header: {
//     textAlign: "center" as const,
//     color: "#333",
//     fontSize: "2.5rem",
//     marginBottom: "1.5rem",
//   },
//   form: { display: "flex", flexDirection: "column" as const, gap: "1rem" },
//   button: {
//     padding: "0.75rem",
//     borderRadius: "8px",
//     border: "none",
//     fontSize: "1rem",
//     color: "#fff",
//     backgroundColor: "#0070f3",
//     cursor: "pointer",
//     transition: "background-color 0.3s, transform 0.2s",
//   },
//   loadingButton: { backgroundColor: "#004a9f", cursor: "not-allowed" },
//   forgotPasswordText: {
//     textAlign: "center" as const,
//     marginTop: "1rem",
//     fontSize: "0.9rem",
//     color: "#666",
//   },
//   forgotPasswordLink: {
//     color: "#0070f3",
//     textDecoration: "none",
//     fontWeight: "bold",
//   },
//   signupText: {
//     textAlign: "center" as const,
//     marginTop: "1rem",
//     fontSize: "0.9rem",
//     color: "#666",
//   },
//   signupLink: {
//     color: "#0070f3",
//     textDecoration: "none",
//     fontWeight: "bold",
//   },
// };

// export default LoginForm;

"use client";

import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader for loading effect
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "./InputField"; // Import the new InputField component

const LoginForm: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      setError(
        typeof err === "string" ? err : "Failed to login. Please try again."
      );
      toast.error("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h1 style={styles.header}>Sign In</h1>
        <p style={styles.infoText}>
          Welcome back! Please sign in to access your dashboard. Enter your
          registered email and password below.
        </p>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          <InputField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            showPasswordToggle={togglePasswordVisibility}
            showPassword={showPassword}
          />
          <button
            type="submit"
            disabled={loading}
            style={
              loading
                ? { ...styles.button, ...styles.loadingButton }
                : styles.button
            }
          >
            {loading ? <ClipLoader color="#fff" size={18} /> : "Login"}
          </button>
        </form>
        <p style={styles.forgotPasswordText}>
          <Link href="/forget-password" style={styles.forgotPasswordLink}>
            Forgot Password?
          </Link>
        </p>
        <p style={styles.signupText}>
          Don't have an account?{" "}
          <Link href="/signup" style={styles.signupLink}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

// Styles
const styles = {
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
    textAlign: "center" as const,
    color: "#333",
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  infoText: {
    textAlign: "center" as const,
    fontSize: "1rem",
    color: "#666",
    marginBottom: "1.5rem",
  },
  form: { display: "flex", flexDirection: "column" as const, gap: "1rem" },
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
  forgotPasswordText: {
    textAlign: "center" as const,
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#666",
  },
  forgotPasswordLink: {
    color: "#0070f3",
    textDecoration: "none",
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center" as const,
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#666",
  },
  signupLink: {
    color: "#0070f3",
    textDecoration: "none",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center" as const,
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
};

export default LoginForm;
