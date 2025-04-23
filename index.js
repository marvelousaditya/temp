// Importing required modules
const os = require("os");
const express = require("express");

// Creating an instance of Express
const app = express();

// Calculate server's IP address
let serverIPAddress;
const networkInterfaces = os.networkInterfaces();
Object.keys(networkInterfaces).forEach((interfaceName) => {
  const networkInterface = networkInterfaces[interfaceName];
  networkInterface.forEach((entry) => {
    if (!entry.internal && entry.family === "IPv4") {
      serverIPAddress = entry.address;
    }
  });
});

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/health", (req, res) => {
  const userId = req.params.id;
  res.status(201).send(`ok`);
});

app.get("/user", (req, res) => {
  const userId = req.params.id;
  res
    .status(201)
    .send(
      `This is hello from the User page and SERVER ip is ${serverIPAddress}`
    );
});

app.get("/payment", (req, res) => {
  const userId = req.params.id;
  res
    .status(201)
    .send(
      `This is hello from the PAYMENT page and SERVER ip is ${serverIPAddress}`
    );
});

// Start the server
const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
