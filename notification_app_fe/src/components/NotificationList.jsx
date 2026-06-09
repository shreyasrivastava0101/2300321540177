import { Box, Typography, Button } from '@mui/material';
import NotificationCard from './NotificationCard.jsx';

export default function NotificationList({ 
  notifications, 
  viewedIds, 
  markAsViewed, 
  loading, 
  error, 
  page, 
  setPage 
}) {
  return (
    <Box>
      {loading && (
        <Typography sx={{ textAlign: "center", mt: 5 }}>
          Loading notifications...
        </Typography>
      )}

      {(!notifications || notifications.length === 0) && !loading && (
        <Typography sx={{ textAlign: "center", mt: 5, color: "gray" }}>
          No notifications available
        </Typography>
      )}

      {error && !loading && (
        <Typography sx={{ textAlign: "center", mt: 5, color: "error.main" }}>
          Error loading notifications.
        </Typography>
      )}

      {!loading && notifications && notifications.length > 0 && (
        <>
          {notifications.map((notif, index) => (
            <NotificationCard 
              key={notif.id || notif._id || index} 
              notification={notif} 
              isViewed={viewedIds.includes(notif.id || notif._id)}
              markAsViewed={markAsViewed}
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 4, gap: 2 }}>
            <Button 
              variant="outlined" 
              disabled={page === 1} 
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setPage(page + 1)}
              disabled={notifications.length < 10} // Assuming limit 10
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}