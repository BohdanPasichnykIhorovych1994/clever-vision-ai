"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import api, { setAccessToken } from "@/api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [key, setKey] = useState(Date.now()); // Унікальний ключ для перерендеру
  const router = useRouter();

  useEffect(() => {
    setEmail("");
    setPassword("");
    setKey(Date.now()); // Оновлення ключа при завантаженні
    localStorage.removeItem("email");
    sessionStorage.removeItem("email");
  }, []);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Введіть email і пароль!");
      return;
    }
    try {
      const response = await api.post("api/auth/login", { email, password });
      const token = response.data.token;
      setAccessToken(token);
      router.push("/");
    } catch (err) {
      setError("Невірний email або пароль!");
      console.error("Login error:", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Вхід
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            key={key + "email"}
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="new-password"
          />
          <TextField
            key={key + "password"}
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Увійти
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
