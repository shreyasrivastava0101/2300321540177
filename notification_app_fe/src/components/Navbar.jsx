import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ mb: 4, background: 'linear-gradient(45deg, #2196f3, #21cbf3)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Notification System
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            All Notifications
          </Button>
          <Button color="inherit" component={Link} to="/priority">
            Priority View
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
