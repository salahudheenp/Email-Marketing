import React from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, Typography, TextField } from '@mui/material';

const ColdEmailNode = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Cold Email</Typography>
        <TextField
          label="Subject"
          variant="outlined"
          size="small"
          fullWidth
          margin="dense"
          defaultValue={data.subject}
        />
        <TextField
          label="Content"
          variant="outlined"
          size="small"
          fullWidth
          multiline
          rows={4}
          margin="dense"
          defaultValue={data.content}
        />
      </CardContent>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
};

export default ColdEmailNode;