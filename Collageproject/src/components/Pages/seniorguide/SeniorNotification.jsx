import { useState } from "react";

function SeniorNotifications({ notifications, setNotifications }) {

  // ✅ Mark notification as read
  const markAsRead = (id) => {

    const updatedNotifications = notifications.map((item) =>
      item.id === id
        ? { ...item, is_read: true }
        : item
    );

    setNotifications(updatedNotifications);
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>🔔 Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (

        notifications.map((item) => (

          <div
            key={item.id}
            onClick={() => markAsRead(item.id)}
            style={{
              backgroundColor: item.is_read
                ? "#f1f1f1"
                : "#d4f5ff",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >

            <p>{item.message}</p>

            <small>
              {item.is_read ? "✅ Read" : "🆕 Unread"}
            </small>

          </div>

        ))

      )}

    </div>
  );
}

export default SeniorNotifications;