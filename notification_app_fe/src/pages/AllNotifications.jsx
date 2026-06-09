import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { fetchNotifications } from "../api/notificationApi";
import NotificationList from '../components/NotificationList.jsx';
import { Log } from '../../../logging_middleware/logger.js';

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [viewedIds, setViewedIds] = useState(() => {
    const saved = localStorage.getItem('viewedNotifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    Log("frontend", "info", "page", "AllNotifications page loaded");
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchNotifications({
          page,
          limit: 10,
        });

        setNotifications(data.notifications || []);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page]);

  const markAsViewed = (id) => {
    if (!viewedIds.includes(id)) {
      const updated = [...viewedIds, id];
      setViewedIds(updated);
      localStorage.setItem('viewedNotifications', JSON.stringify(updated));
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" mb={3}>All Notifications</Typography>
      <NotificationList 
        notifications={notifications}
        viewedIds={viewedIds}
        markAsViewed={markAsViewed}
        loading={loading}
        error={error}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
}
