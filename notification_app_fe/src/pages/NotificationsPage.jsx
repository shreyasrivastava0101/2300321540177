import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

import { fetchNotifications } from "../api/notificationApi";
import NotificationList from "../components/NotificationList";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [viewedIds, setViewedIds] = useState(() => {
    const saved = localStorage.getItem("viewedNotifications");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch notifications
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle marking as viewed
  const handleView = (id) => {
    if (!viewedIds.includes(id)) {
      const updated = [...viewedIds, id];

      setViewedIds(updated);

      localStorage.setItem(
        "viewedNotifications",
        JSON.stringify(updated)
      );
    }
  };

  // Loading state
  if (loading) {
    return <h2>Loading notifications...</h2>;
  }

  // Error state
  if (error) {
    return <h2>Error: {error}</h2>;
  }

  // Filtering logic (search + viewed/unviewed)
  const filteredNotifications = notifications
    .filter((notification) => {
      const text =
        `${notification.title} ${notification.message}`.toLowerCase();

      return text.includes(searchTerm.toLowerCase());
    })
    .filter((notification) => {
      if (filter === "all") return true;

      if (filter === "viewed") {
        return viewedIds.includes(notification.id);
      }

      if (filter === "unviewed") {
        return !viewedIds.includes(notification.id);
      }

      return true;
    });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Notification Center
      </Typography>

      {/* Filter Dropdown */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "12px", padding: "8px" }}
      >
        <option value="all">All</option>
        <option value="viewed">Viewed</option>
        <option value="unviewed">Unviewed</option>
      </select>

      {/* Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Notification List */}
      <NotificationList
        notifications={filteredNotifications}
        viewedIds={viewedIds}
        handleView={handleView}
      />
    </Container>
  );
}

export default NotificationsPage;