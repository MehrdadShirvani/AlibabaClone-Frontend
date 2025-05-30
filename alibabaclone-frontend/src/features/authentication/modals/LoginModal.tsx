import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import agent from "@/shared/api/agent";
import { LoginRequestDto } from "@/shared/models/authentication/LoginRequestDto";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState<LoginRequestDto>({
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    const phoneRegex = /^(?:\+98|0)?9\d{9}$/;
    if (!phoneRegex.test(form.phoneNumber)) {
      return "Invalid phone number format";
    }
    if (!form.password || form.password.length < 8) {
      return "Password must be at least 8 characters";
    }
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await agent.Auth.login(form);
      login(response.token); // update store with full auth info
      setError(null);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={{ marginBottom: "1rem" }}>Login</h2>
        <input
          type="text"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.button}>
          Login
        </button>
        {error && (
          <p style={{ color: "red", marginTop: "0.5rem", fontWeight: "bold" }}>
            {error}
          </p>
        )}
        <button
          onClick={onClose}
          style={{
            ...styles.button,
            marginTop: "0.5rem",
            backgroundColor: "#ccc",
            color: "#333",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    width: "320px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "1rem",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
};

export default LoginModal;
