/* Bootstrap only, intentionally left without tests: starts the HTTP
   listener, no branching logic to cover -- see README "Development". */
const { createApp } = require('./app');

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  const app = createApp();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`fi-orders-api listening on port ${PORT}`);
  });
}

module.exports = { PORT };
