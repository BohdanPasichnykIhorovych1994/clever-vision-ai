import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4002",
  timeout: 20000,
});

// 📌 Додаємо інтерсептор для запитів (підставляє токен)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 📌 Додаємо інтерсептор для обробки помилок (401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Токен прострочений або невалідний. Виконується вихід...");

      clearAccessToken(); // Видаляємо токен
      window.location.href = "/login"; // Редірект на логін
    }

    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// 📌 Функції для роботи з токенами
export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const clearAccessToken = () => {
  localStorage.removeItem("accessToken");
};

export default api;
