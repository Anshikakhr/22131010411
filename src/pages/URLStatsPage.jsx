import React, { useEffect, useState } from 'react';
import URLStatsTable from '../components/URLStatsTable';
import { log } from '../utils/logger';

const URLStatsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    log("URLStatsPage mounted");

    const mappings = JSON.parse(localStorage.getItem('urlMappings')) || [];
    const processedData = mappings.map(m => ({
      shortUrl: `${window.location.origin}/${m.shortcode}`,
      longUrl: m.longUrl,
      createdAt: new Date(m.createdAt).toLocaleString(),
      expiresAt: new Date(m.expiresAt).toLocaleString(),
      clicks: m.clicks
    }));

    setStats(processedData);
  }, []);

  return (
    <div>
      <URLStatsTable stats={stats} />
    </div>
  );
};

export default URLStatsPage;