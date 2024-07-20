export async function fetchFromSanctum({ method, url, headers = {}, body = null }) {
    if (!method) {
      throw new Error('HTTP method is required.');
    }
  
    if (!url) {
      throw new Error('URL is required.');
    }
  
    try {
      const options = {
        method,
        headers,
      };
  
      if (body) {
        options.body = JSON.stringify(body);
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';
      }
  
      const response = await fetch(url, options);
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }