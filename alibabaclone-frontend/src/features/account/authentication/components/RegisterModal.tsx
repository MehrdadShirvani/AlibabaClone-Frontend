import api from "@/services/api";
import { RegisterRequestDto } from "@/shared/models/authentication/RegisterRequestDto";
import { useAuthStore } from "@/stores/useAuthStore";
import React, { useState } from "react";

interface Props {
  onClose: () => void;
}

const RegisterModal: React.FC<Props> = ({ onClose }) => {
  const [form, setForm] = useState<RegisterRequestDto>({
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const login = useAuthStore((state) => state.login);

  const validate = () => {
    const { phoneNumber, password, confirmPassword } = form;
    if (!phoneNumber || !password || !confirmPassword) {
      return "All fields are required.";
    }
    if (!/^\d{11}$/.test(phoneNumber)) {
      return "Phone number must be 11 digits.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Use the form as RegisterRequestDto explicitly
      const requestData: RegisterRequestDto = {
        phoneNumber: form.phoneNumber,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };

      const response = await api.Auth.register(requestData);

      login(response);
      setForm({ phoneNumber: "", password: "", confirmPassword: "" });
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-[var(--surface)] p-6 rounded-lg shadow-lg w-80 flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            className="input mb-4"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input mb-4"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="input mb-4"
          />

          {error && (
            <p className="text-[var(--destructive)] font-medium mb-2">
              {error}
            </p>
          )}

          <button type="submit" className="button-primary mb-2">
            Register
          </button>
        </form>

        <button onClick={onClose} className="button-secondary" type="button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
