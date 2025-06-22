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
      login(response);
      setError(null);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-[var(--surface)] p-6 rounded-lg shadow-lg w-80 flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">
          Login
        </h2>

        <input
          type="text"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={(e) =>
            setForm((f) => ({ ...f, phoneNumber: e.target.value }))
          }
          className="input mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          className="input mb-4"
        />

        <button
          onClick={handleSubmit}
          className="button-primary mb-2"
          type="button"
        >
          Login
        </button>

        {error && (
          <p className="text-[var(--destructive)] font-medium mb-2">{error}</p>
        )}

        <button onClick={onClose} className="button-secondary" type="button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
