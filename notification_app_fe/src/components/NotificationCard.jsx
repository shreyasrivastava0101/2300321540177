import { Card, CardContent, Typography, Box } from '@mui/material';
import { Log } from '../../../logging_middleware/logger.js';

export default function NotificationCard({ notification, isViewed, markAsViewed }) {
  const id = notification.id || notification._id;
  const handleClick = () => {
    if (!isViewed) {
      markAsViewed(id);
      Log("frontend", "info", "ui", `Notification clicked: ${id}`);
    }
  };

  return (
    <Card 
      onClick={handleClick}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        backgroundColor: isViewed ? '#f5f5f5' : '#ffffff',
        borderLeft: isViewed ? "4px solid #4caf50" : "4px solid #ff9800",
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography 
            variant="h6" 
            component="div"
            sx={{ fontWeight: isViewed ? 'normal' : 'bold' }}
          >
            {notification.title || 'Notification'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {notification.timestamp ? new Date(notification.timestamp).toLocaleDateString() : ''}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" mb={1}>
          {notification.message || notification.content || ''}
        </Typography>
        <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          Type: {notification.notification_type || notification.type || 'General'}
        </Typography>
      </CardContent>
    </Card>
  );
}