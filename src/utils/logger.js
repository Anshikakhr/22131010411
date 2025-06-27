export const log = (message, data = null) => {
  const timestamp = new Date().toISOString();
  if (data !== null) {
    console.info(`[${timestamp}] ${message}`, data);
  } else {
    console.info(`[${timestamp}] ${message}`);
  }
};