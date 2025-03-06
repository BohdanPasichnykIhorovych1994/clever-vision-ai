"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/api/axios";
import styles from "./userPage.module.css";

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/api/users/${id}`);
      setUser(response.data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching user:", err);
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.avatar}>
          <span>{user.name?.[0]}</span>
        </div>
        <h2>{user.name || "Unknown User"}</h2>
        <p>{user.email}</p>
      </div>

      <div className={styles.rightSection}>
        <h3>Profile Information</h3>
        <table className={styles.profileTable}>
          <tbody>
            <tr>
              <td>Last check-in:</td>
              <td>{new Date(user.last_check_in).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>Last active:</td>
              <td>{new Date(user.last_active).toLocaleString()}</td>
            </tr>
            <tr>
              <td>Role:</td>
              <td>{user.role || "N/A"}</td>
            </tr>
            <tr>
              <td>ID:</td>
              <td>{user._id || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
