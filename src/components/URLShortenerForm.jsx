import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { log } from '../utils/logger';
import { useNavigate } from 'react-router-dom';

const URLShortenerForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [expiry, setExpiry] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic URL validation
    try {
      new URL(longUrl);
    } catch {
      alert('Please enter a valid URL.');
      log('Invalid URL entered', longUrl);
      return;
    }

    // Expiry validation
    let expiryMinutes = 30; // default
    if (expiry) {
      if (!Number.isInteger(Number(expiry)) || Number(expiry) <= 0) {
        alert('Expiry must be a positive integer (minutes).');
        log('Invalid expiry entered', expiry);
        return;
      }
      expiryMinutes = Number(expiry);
    }

    // Generate or validate shortcode
    let shortcode = customCode.trim() || Math.random().toString(36).substring(2, 8);
    const mappings = JSON.parse(localStorage.getItem('urlMappings')) || [];
    if (mappings.some(m => m.shortcode === shortcode)) {
      alert('Shortcode already exists, please try another.');
      log('Shortcode collision detected', shortcode);
      return;
    }

    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + expiryMinutes * 60000);
    const mapping = {
      longUrl,
      shortcode,
      createdAt: createdAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      clicks: 0,
      clickDetails: []
    };

    mappings.push(mapping);
    localStorage.setItem('urlMappings', JSON.stringify(mappings));
    log('Shortened URL created', mapping);

    alert(`Short URL created: ${window.location.origin}/${shortcode}`);
    navigate('/stats');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h5" mb={2}>Shorten a URL</Typography>
      <TextField
        label="Long URL"
        fullWidth
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        label="Custom Shortcode (optional)"
        fullWidth
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Expiry (minutes, optional)"
        fullWidth
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Shorten URL
      </Button>
    </Box>
  );
};

export default URLShortenerForm;
