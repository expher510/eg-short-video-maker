import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  CircularProgress, 
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';

interface VideoItem {
  id: string;
  status: string;
}

const VideoList: React.FC = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('/api/short-videos');
      setVideos(response.data.videos || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch videos');
      setLoading(false);
      console.error('Error fetching videos:', err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleCreateNew = () => {
    navigate('/create');
  };

  const handleVideoClick = (id: string) => {
    navigate(`/video/${id}`);
  };

  const handleDeleteVideo = async (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    
    try {
      await axios.delete(`/api/short-video/${id}`);
      fetchVideos();
    } catch (err) {
      setError('Failed to delete video');
      console.error('Error deleting video:', err);
    }
  };

  const capitalizeFirstLetter = (str: string) => {
    if (!str || typeof str !== 'string') return 'Unknown';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth="md" mx="auto" py={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Your Videos
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
        >
          Create New Video
        </Button>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      )}
      
      {videos.length === 0 ? (
        <Paper sx={{ 
          p: 6, 
          textAlign: 'center',
          backgroundColor: 'rgba(17, 34, 64, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        }}>
          <Typography variant="h6" sx={{ color: '#ccd6f6', mb: 2 }}>
            You haven't created any videos yet.
          </Typography>
          <Typography variant="body2" sx={{ color: '#8892b0', mb: 3 }}>
            Use EG-Autonomous API to generate AI-powered videos in seconds.
          </Typography>
          <Button 
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateNew}
            sx={{ 
              mt: 1,
              backgroundColor: '#1565c0',
              color: '#fff',
              fontWeight: 600,
              '&:hover': { backgroundColor: '#1976d2' }
            }}
          >
            Create Your First Video
          </Button>
        </Paper>
      ) : (
        <Paper sx={{
          backgroundColor: 'rgba(17, 34, 64, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        }}>
          <List>
            {videos.map((video, index) => {
              const videoId = video?.id || '';
              const videoStatus = video?.status || 'unknown';
              
              return (
                <div key={videoId}>
                  {index > 0 && <Divider />}
                  <ListItem 
                    button 
                    onClick={() => handleVideoClick(videoId)}
                    sx={{ 
                      py: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    <ListItemText
                      primary={`Video ${videoId.substring(0, 8)}...`}
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color={
                            videoStatus === 'ready' ? 'success.main' : 
                            videoStatus === 'processing' ? 'info.main' : 
                            videoStatus === 'failed' ? 'error.main' : 'text.secondary'
                          }
                        >
                          {capitalizeFirstLetter(videoStatus)}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      {videoStatus === 'ready' && (
                        <IconButton 
                          edge="end" 
                          aria-label="play"
                          onClick={() => handleVideoClick(videoId)}
                          color="primary"
                        >
                          <PlayArrowIcon />
                        </IconButton>
                      )}
                      <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        onClick={(e) => handleDeleteVideo(videoId, e)}
                        color="error"
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              );
            })}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default VideoList; 