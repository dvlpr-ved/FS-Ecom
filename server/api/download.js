// server/api/download.js in Nuxt 3
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const imageUrl = query.url;
    
    if (!imageUrl) {
      throw createError({
        statusCode: 400,
        message: "Image URL is required",
      });
    }
    
    const response = await fetch(imageUrl);
  
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        message: "Failed to fetch image",
      });
    }
  
    // Return the image as a stream
    const blob = await response.blob();
    return blob;
  });
  