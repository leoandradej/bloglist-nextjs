"use client";

import { useNotification } from "./NotificationProvider";

const Notification = () => {
  const { message, type } = useNotification();

  if (!message) return null;

  return (
    <div
      className={`notification ${type === "success" ? "success" : "error"}`}
      data-testid="notification"
    >
      {message}
    </div>
  );
};

export default Notification;
