export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  service: {
    superadmin: {
      url: process.env.SERVICE_SUPERADMIN_URL,
    },
    user: {
      url: process.env.SERVICE_USERS_URL,
    },
    product: {
      url: process.env.SERVICE_PRODUCT_URL,
    },
    warehouse: {
      url: process.env.SERVICE_WAREHOUSE_URL,
    },
    shipping: {
      url: process.env.SERVICE_SHIPPING_URL,
    },
  },
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    authSource: process.env.DB_AUTH_SOURCE,
  },
});
