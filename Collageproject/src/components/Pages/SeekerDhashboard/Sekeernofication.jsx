import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCircle,
  Clock,
  Mail,
  Calendar,
  Star,
  FileText,
  MessageCircle,
  UserPlus,
  Award,
  ArrowLeft,
  Trash2,
  CheckCheck,
  AlertCircle
} from "lucide-react";

function SeekerNotifications({ notifications, setNotifications }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [selectMode, setSelectMode] = useState(false);

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch(type) {
      case "booking":
        return <Calendar size={18} style={{ color: "#ff6b35" }} />;
      case "guide":
        return <UserPlus size={18} style={{ color: "#ff6b35" }} />;
      case "rating":
        return <Star size={18} style={{ color: "#ff6b35" }} />;
      case "report":
        return <FileText size={18} style={{ color: "#ff6b35" }} />;
      case "message":
        return <MessageCircle size={18} style={{ color: "#ff6b35" }} />;
      default:
        return <Bell size={18} style={{ color: "#ff6b35" }} />;
    }
  };

  // Get time ago text
  const getTimeAgo = (time) => {
    return time;
  };

  // Mark notification as read
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((item) =>
      item.id === id ? { ...item, read: true } : item
    );
    setNotifications(updatedNotifications);
  };

  // Mark all as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((item) => ({
      ...item,
      read: true
    }));
    setNotifications(updatedNotifications);
  };

  // Delete notification
  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter((item) => item.id !== id);
    setNotifications(updatedNotifications);
  };

  // Delete selected notifications
  const deleteSelected = () => {
    const updatedNotifications = notifications.filter(
      (item) => !selectedNotifications.includes(item.id)
    );
    setNotifications(updatedNotifications);
    setSelectedNotifications([]);
    setSelectMode(false);
  };

  // Toggle selection
  const toggleSelect = (id) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter((sid) => sid !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((item) => {
    if (filter === "unread") return !item.read;
    if (filter === "read") return item.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: {
      x: 20,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffbed" }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ backgroundColor: "#ff6b35" }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"
          style={{ backgroundColor: "#545454" }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Back Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 transition-colors group"
          style={{ color: "#545454" }}
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Dashboard</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 p-6 mb-8"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div 
                className="p-3 rounded-xl shadow-lg"
                style={{ background: "linear-gradient(135deg, #ff6b35, #e55a2b)" }}
              >
                <Bell className="text-white" size={24} />
              </div>
              <div>
                <h1 
                  className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent"
                  style={{ background: "linear-gradient(135deg, #ff6b35, #545454)" }}
                >
                  Notifications
                </h1>
                <p className="text-sm mt-1" style={{ color: "#545454" }}>
                  Stay updated with your latest activities
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <div 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: "#ffebdd", color: "#ff6b35" }}
              >
                {unreadCount} unread
              </div>
            )}
          </div>
        </motion.div>

        {/* Filters and Actions */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap items-center justify-between gap-4"
          style={{ border: `1px solid #ffebdd` }}
        >
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === "all" ? "text-white" : ""
              }`}
              style={{
                backgroundColor: filter === "all" ? "#ff6b35" : "#fffbed",
                color: filter === "all" ? "white" : "#545454"
              }}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === "unread" ? "text-white" : ""
              }`}
              style={{
                backgroundColor: filter === "unread" ? "#ff6b35" : "#fffbed",
                color: filter === "unread" ? "white" : "#545454"
              }}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter("read")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === "read" ? "text-white" : ""
              }`}
              style={{
                backgroundColor: filter === "read" ? "#ff6b35" : "#fffbed",
                color: filter === "read" ? "white" : "#545454"
              }}
            >
              Read
            </button>
          </div>
          <div className="flex gap-2">
            {!selectMode ? (
              <>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{ backgroundColor: "#fffbed", color: "#545454", border: `1px solid #ffebdd` }}
                  >
                    <CheckCheck size={16} />
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setSelectMode(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ backgroundColor: "#fffbed", color: "#545454", border: `1px solid #ffebdd` }}
                >
                  Select
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={deleteSelected}
                  disabled={selectedNotifications.length === 0}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50"
                  style={{ backgroundColor: "#ffebdd", color: "#ff6b35" }}
                >
                  <Trash2 size={16} />
                  Delete ({selectedNotifications.length})
                </button>
                <button
                  onClick={() => {
                    setSelectMode(false);
                    setSelectedNotifications([]);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ backgroundColor: "#fffbed", color: "#545454", border: `1px solid #ffebdd` }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Notification List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl overflow-hidden border"
          style={{ borderColor: "#ffebdd" }}
        >
          <div 
            className="px-6 py-4 border-b"
            style={{ borderColor: "#ffebdd", backgroundColor: "#fffbed" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail size={18} style={{ color: "#ff6b35" }} />
                <h2 className="font-semibold" style={{ color: "#545454" }}>
                  Notification Center
                </h2>
              </div>
              <span className="text-xs" style={{ color: "#545454" }}>
                {filteredNotifications.length} notifications
              </span>
            </div>
          </div>

          <div className="divide-y" style={{ borderColor: "#ffebdd" }}>
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16">
                <div 
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                  style={{ backgroundColor: "#fffbed" }}
                >
                  <Bell size={32} style={{ color: "#d1d5db" }} />
                </div>
                <p className="font-medium" style={{ color: "#545454" }}>No notifications</p>
                <p className="text-sm mt-1" style={{ color: "#545454" }}>
                  {filter === "all" 
                    ? "You don't have any notifications yet" 
                    : `No ${filter} notifications available`}
                </p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className={`p-5 transition-all duration-200 ${
                      !notification.read ? "bg-orange-50/30" : "hover:bg-gray-50"
                    }`}
                    style={{ cursor: selectMode ? "default" : "pointer" }}
                    onClick={() => {
                      if (!selectMode) {
                        markAsRead(notification.id);
                      }
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox for select mode */}
                      {selectMode && (
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={() => toggleSelect(notification.id)}
                          className="mt-1 w-4 h-4 rounded"
                          style={{ accentColor: "#ff6b35" }}
                        />
                      )}

                      {/* Icon */}
                      <div 
                        className="p-2 rounded-xl"
                        style={{ backgroundColor: "#fffbed" }}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="font-semibold" style={{ color: "#545454" }}>
                              {notification.title}
                            </h4>
                            <p className="text-sm mt-1" style={{ color: "#545454" }}>
                              {notification.message}
                            </p>
                          </div>
                          {!selectMode && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: "#9ca3af" }}
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <Clock size={12} style={{ color: "#9ca3af" }} />
                            <span className="text-xs" style={{ color: "#9ca3af" }}>
                              {getTimeAgo(notification.time)}
                            </span>
                          </div>
                          {!notification.read && !selectMode && (
                            <span 
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: "#ffebdd", color: "#ff6b35" }}
                            >
                              New
                            </span>
                          )}
                          {notification.read && (
                            <div className="flex items-center gap-1">
                              <CheckCircle size={12} style={{ color: "#10b981" }} />
                              <span className="text-xs" style={{ color: "#10b981" }}>
                                Read
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* Tips Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-4 rounded-xl flex items-start gap-3"
          style={{ backgroundColor: "#ffebdd", border: `1px solid #ffd4be` }}
        >
          <AlertCircle size={18} style={{ color: "#ff6b35" }} />
          <div>
            <p className="text-sm font-medium" style={{ color: "#545454" }}>Notification Tips</p>
            <p className="text-xs mt-1" style={{ color: "#545454" }}>
              Click on any notification to mark it as read. Use the filter tabs to organize your notifications.
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-xs" style={{ color: "#545454" }}>
            Notifications are automatically deleted after 30 days
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default SeekerNotifications;