import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { log } from '../utils/logger';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const mappings = JSON.parse(localStorage.getItem('urlMappings')) || [];
    const index = mappings.findIndex(m => m.shortcode === shortcode);

    if (index !== -1) {
      const mapping = mappings[index];
      const now = new Date();

      if (new Date(mapping.expiresAt) < now) {
        alert('This short URL has expired.');
        log('Attempt to access expired shortcode', shortcode);
        navigate('/stats');
        return;
      }

      const clickData = {
        timestamp: now.toISOString(),
        referrer: document.referrer || 'Direct',
        geo: 'N/A' // Placeholder for geo-location
      };

      mapping.clicks = (mapping.clicks || 0) + 1;
      mapping.clickDetails = mapping.clickDetails || [];
      mapping.clickDetails.push(clickData);

      mappings[index] = mapping;
      localStorage.setItem('urlMappings', JSON.stringify(mappings));

      log('Redirecting to long URL', { shortcode, longUrl: mapping.longUrl });

      window.location.href = mapping.longUrl;
    } else {
      alert('Invalid shortcode.');
      log('Invalid shortcode accessed', shortcode);
      navigate('/stats');
    }
  }, [shortcode, navigate]);

  return (
    <div>
      <h3>Redirecting...</h3>
    </div>
  );
};

export default RedirectHandler;
