import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import AllNotifications from './pages/AllNotifications.jsx';
import PriorityNotifications from './pages/PriorityNotifications.jsx';

const theme = createTheme({
  palette: {
    background: {
      default: '#f0f2f5',
    },
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllNotifications />} />
          <Route path="/priority" element={<PriorityNotifications />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;