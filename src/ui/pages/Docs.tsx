import React from 'react';
import { Box, Typography, Paper, Divider, Container } from '@mui/material';

const Docs: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.contrastText', mb: 4 }}>
        Documentation
      </Typography>

      {/* REST API Section */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        backgroundColor: 'rgba(17, 34, 64, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'secondary.main', fontWeight: 600 }}>
          REST API Overview
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
          The EG AUTONOMOUS Video Creator provides a robust REST API to programmatically generate videos.
        </Typography>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>POST /api/short-video</Typography>
          <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
            Initiates the creation of a short video. It accepts a JSON payload containing the scenes and configuration.
          </Typography>
          <Box sx={{ p: 2, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 2, overflowX: 'auto' }}>
            <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace' }}>
{`{
  "scenes": [
    {
      "text": "This is a test scene.",
      "searchTerms": ["technology", "code", "future"]
    }
  ],
  "config": {
    "paddingBack": 1500,
    "music": "chill",
    "captionPosition": "center",
    "captionBackgroundColor": "#ff0000",
    "voice": "af_heart",
    "orientation": "portrait",
    "musicVolume": "medium"
  }
}`}
            </pre>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>GET /api/video/:id/status</Typography>
          <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
            Poll this endpoint to check the progress of your video generation. Returns status: <code>processing</code>, <code>ready</code>, or <code>failed</code>.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>GET /api/video/:id</Typography>
          <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
            Once the status is <code>ready</code>, use this endpoint to download the rendered MP4 file.
          </Typography>
        </Box>
      </Paper>

      {/* MCP Server Section */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        backgroundColor: 'rgba(17, 34, 64, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'secondary.main', fontWeight: 600 }}>
          MCP Server (Model Context Protocol)
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
          The server also exposes an MCP interface, allowing AI agents (like Claude, n8n, etc.) to interact directly with the video generator.
        </Typography>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>Connection (SSE)</Typography>
          <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
            The MCP server runs over HTTP using Server-Sent Events (SSE). 
            Agents connect to <code>GET /mcp/sse</code> to establish the session, and send JSON-RPC commands to <code>POST /mcp/messages?sessionId=...</code>.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>Available Tools</Typography>
          
          <Typography variant="subtitle1" sx={{ color: '#fff', mt: 2, fontWeight: 'bold' }}>1. create-short-video</Typography>
          <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
            Allows the agent to pass a list of scenes and configuration to queue a video. 
            <br/><br/>
            <b>Important Agent Instructions:</b> The agent is instructed to combine <code>searchTerms</code> into a single prompt for the EG-Autonomous API. Since background videos are exactly 5 seconds long, agents should keep spoken text under 5 seconds per scene, or divide long text into multiple scenes. If a scene exceeds 5 seconds, the background video will automatically loop.
          </Typography>

          <Typography variant="subtitle1" sx={{ color: '#fff', mt: 2, fontWeight: 'bold' }}>2. get-video-status</Typography>
          <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
            Allows the agent to check if the generated <code>videoId</code> has finished rendering.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Docs;
