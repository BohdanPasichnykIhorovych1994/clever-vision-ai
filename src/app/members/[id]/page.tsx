"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/api/axios";
import styles from "./memberPage.module.css";

export default function MemberPage() {
  const { id } = useParams();
  const [member, setMember] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMember = async () => {
    try {
      const response = await api.get(`/api/members/${id}`);
      setMember(response.data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching member:", err);
      setError("Failed to fetch member data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.avatar}>
          <span>{member.userName?.[0]}</span>
        </div>
        <h2>{member.userName || "Unknown User"}</h2>
        <p>{member.email}</p>
      </div>

      <div className={styles.rightSection}>
        <h3>Profile Information</h3>
        <table className={styles.profileTable}>
          <tbody>
            <tr>
              <td>Role:</td>
              <td>{member.role || "N/A"}</td>
            </tr>
            <tr>
              <td>ID:</td>
              <td>{member._id || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
