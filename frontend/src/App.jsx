import React from 'react';
import FlowChart from './components/FlowChart';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Email Marketing Sequence Designer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        <FlowChart />
      </Box>
    </Box>
  );
}

export default App;


