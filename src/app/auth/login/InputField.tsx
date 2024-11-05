// src/components/LoginForm/InputField.tsx
import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  showPasswordToggle?: () => void; // Optional function for toggle visibility
  showPassword?: boolean; // Optional prop to determine password visibility
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  showPasswordToggle,
  showPassword,
}) => (
  <div style={styles.inputContainer}>
    <label htmlFor={id} style={styles.label}>
      {label}
    </label>
    <div style={styles.passwordContainer}>
      <input
        type={showPassword ? "text" : type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        style={styles.input}
        placeholder={placeholder}
      />
      {showPasswordToggle && (
        <span
          onClick={showPasswordToggle}
          style={styles.icon}
          aria-label="Toggle Password Visibility"
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      )}
    </div>
  </div>
);

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
    display: "flex",
    alignItems: "center",
    position: "relative" as const,
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

export default InputField;
