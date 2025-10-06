import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface StaffLoginProps {
  onLogin: () => void;
}

const StaffLogin: React.FC<StaffLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "fiandeiro123") {
      onLogin();
      navigate("/catalog"); // redireciona para página de staff
    } else {
      alert("Senha incorreta!");
    }
  };

  return (
    <div className="staff-login">
      <h2>Login Funcionário</h2>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default StaffLogin;
