import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { log } from '../utils/logger';

const URLStatsTable = ({ stats }) => {
  useEffect(() => {
    log('URLStatsTable mounted');
  }, []);

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 900, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom mt={2}>Shortened URL Statistics</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Long URL</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Expires At</TableCell>
            <TableCell>Total Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.shortUrl}</TableCell>
              <TableCell>{row.longUrl}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.expiresAt}</TableCell>
              <TableCell>{row.clicks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default URLStatsTable;
