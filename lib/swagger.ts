export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Image Template IO API Documentation',
    version: '1.0.0',
    description: 'Documentation for the Image Template IO API endpoints',
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'production' 
        ? 'https://your-production-url.com'
        : 'http://localhost:3000',
      description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
    },
  ],
  components: {
    // Reusable components will be defined here
  },
};

