import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { fetchNotifications } from '../services/api.js';
import NotificationList from '../components/NotificationList.jsx';
import FilterBar from '../components/FilterBar.jsx';
import { Log } from '../../../logging_middleware/logger.js';

export default function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [viewedIds, setViewedIds] = useState(() => {
    const saved = localStorage.getItem('viewedNotifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    Log("frontend", "info", "page", "PriorityNotifications page loaded");
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchNotifications({
          page,
          limit: 10,
          notification_type: filter,
        });
        setNotifications(data.notifications || []);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page, filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1); // Reset to page 1 on filter change
    Log("frontend", "info", "ui", `Filter changed: ${newFilter || 'All'}`);
  };

  const markAsViewed = (id) => {
    if (!viewedIds.includes(id)) {
      const updated = [...viewedIds, id];
      setViewedIds(updated);
      localStorage.setItem('viewedNotifications', JSON.stringify(updated));
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" mb={2}>Priority Notifications</Typography>
      <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />
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
