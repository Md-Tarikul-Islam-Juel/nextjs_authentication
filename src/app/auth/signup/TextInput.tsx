import React from "react";

interface TextInputProps {
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
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
}) => (
  <div style={styles.inputContainer}>
    <label htmlFor={id} style={styles.label}>
      {label}
    </label>
    <input
      type="text"
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      style={styles.input}
      placeholder={placeholder}
    />
  </div>
);

export default TextInput;
