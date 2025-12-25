"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
   
    if (window.confirm("Are you sure you want to log out?")) {
    
      localStorage.removeItem("userToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("bgImage");

      // Redirect to login page
      router.push("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        fontSize: "14px",
        cursor: "pointer",
        borderRadius: "4px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        transition: "background-color 0.2s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f44336")}
    >
      Log Out
    </button>
  );
}
