import React, { useState } from "react";

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const styles = {
  inputContainer: { display: "flex", flexDirection: "column" as const },
  label: { fontSize: "0.9rem", marginBottom: "0.5rem", color: "#666" },
  input: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    color: "#333",
    backgroundColor: "#f7f7f7",
    width: "95%",
  },
  passwordContainer: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
  },
  icon: {
    position: "absolute" as const,
    right: "10px",
    cursor: "pointer",
    color: "#888",
    fontSize: "1.2rem",
    userSelect: "none" as "none",
  },
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div style={styles.inputContainer}>
      <label htmlFor={id} style={styles.label}>
        {label}
      </label>
      <div style={styles.passwordContainer}>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          style={styles.input}
          placeholder={placeholder}
        />
        <span
          onClick={togglePasswordVisibility}
          style={styles.icon}
          aria-label="Toggle Password Visibility"
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;
