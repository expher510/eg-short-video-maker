import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
  createTheme
} from '@mui/material';
import VideoIcon from '@mui/icons-material/VideoLibrary';
import AddIcon from '@mui/icons-material/Add';

interface LayoutProps {
  children: React.ReactNode;
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0a192f', // Dark tech blue
    },
    secondary: {
      main: '#64ffda', // Tech accent
    },
    background: {
      default: '#020c1b',
      paper: '#112240',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontFamily: '"Outfit", sans-serif',
    },
    h4: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 500,
    },
    button: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
      },
    },
  },
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 0%, #0c2652 0%, #020c1b 50%, #010812 100%)',
      }}>
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{ 
            backgroundColor: 'rgba(2, 12, 27, 0.7)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <Toolbar>
            <VideoIcon sx={{ mr: 2 }} />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                cursor: 'pointer', 
                fontWeight: 700, 
                letterSpacing: 2,
                background: 'linear-gradient(90deg, #ffffff 0%, #64ffda 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              onClick={() => navigate('/')}
            >
              EG AUTONOMOUS
            </Typography>
            <Button 
              color="inherit" 
              startIcon={<AddIcon />}
              onClick={() => navigate('/create')}
            >
              Create Video
            </Button>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          {children}
        </Container>
        <Box 
          component="footer" 
          sx={{ 
            py: 3, 
            mt: 'auto', 
            backgroundColor: 'rgba(17, 34, 64, 0.5)',
            backdropFilter: 'blur(5px)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            EG AUTONOMOUS &copy; {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout; 