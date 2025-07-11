import app from './app';

// Define the port to listen on from environment variable or default 3000.
const port = process.env.PORT || 3000;

// Start Express server and listen for incoming requests on defined port.
app.listen(port, () => {
  console.log(`Listening on Port ${port}.`);
});