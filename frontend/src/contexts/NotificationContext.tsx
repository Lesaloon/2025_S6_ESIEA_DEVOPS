import { createContext, useContext, useState, ReactNode } from "react";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface NotificationContextType {
  addNotification: (message: string, type?: "success" | "error" | "info") => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: "success" | "error" | "info" = "info") => {
    setNotifications((prev) => {
      const alreadyExists = prev.some(n => n.message === message);
      if (alreadyExists) return prev;
      const id = crypto.randomUUID();
      const newNotif = { id, message, type };
      setTimeout(() => {
        setNotifications(current => current.filter(n => n.id !== id));
      }, 5000);
      return [...prev, newNotif];
    });
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const getNotificationColor = (type: "success" | "error" | "info") => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "info":
      default:
        return "bg-blue-500";
    }
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-4 p-4 pr-5 border border-white/20 shadow-xl rounded-lg text-white backdrop-blur-lg transition-all animate-fade-in-up ${
              getNotificationColor(notification.type)
            }`}
          >
            <div className="text-xl">
              {notification.type === "success" && "✅"}
              {notification.type === "error" && "❌"}
              {notification.type === "info" && "ℹ️"}
            </div>
            <div className="flex-1">{notification.message}</div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-white hover:text-gray-300 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
