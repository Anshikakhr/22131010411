import React, { useEffect } from 'react';
import { log } from '../utils/logger';
import URLShortenerForm from '../components/URLShortenerForm';

const URLShortenerPage = () => {
  useEffect(() => {
    log("URLShortenerPage mounted");
  }, []);

  return (
    <div>
      <URLShortenerForm />
    </div>
  );
};

export default URLShortenerPage;
