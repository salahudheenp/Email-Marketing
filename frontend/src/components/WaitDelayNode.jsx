import React from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, Typography, TextField } from '@mui/material';

const WaitDelayNode = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Wait/Delay</Typography>
        <TextField
          label="Delay (hours)"
          variant="outlined"
          size="small"
          fullWidth
          margin="dense"
          type="number"
          defaultValue={data.delay}
        />
      </CardContent>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
};

export default WaitDelayNode;