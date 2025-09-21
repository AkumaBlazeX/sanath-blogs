const API_URL = 'https://wdyz1q53nf.execute-api.eu-north-1.amazonaws.com/deployeble/subscribe';
const API_KEY = import.meta.env.VITE_API_KEY || '';

if (!API_URL || !API_KEY) {
  console.error('API configuration missing. Please check environment variables.');
}

export const API_CONFIG = {
  BASE_URL: API_URL,
  API_KEY: API_KEY
};
