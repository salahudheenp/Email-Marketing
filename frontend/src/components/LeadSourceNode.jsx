import React from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, Typography, TextField } from '@mui/material';

const LeadSourceNode = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Lead Source</Typography>
        <TextField
          label="Source Name"
          variant="outlined"
          size="small"
          fullWidth
          margin="dense"
          defaultValue={data.sourceName}
        />
      </CardContent>
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
};

export default LeadSourceNode;