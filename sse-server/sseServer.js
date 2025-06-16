const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: ["https://sprinkla.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

// Map to track SSE connections per orderId
const clients = new Map(); // orderId => res (SSE response object)

// 👂 Client subscribes to updates for a specific orderId
app.get("/events/:orderId", (req, res) => {
  const orderId = String(req.params.orderId);

  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Cache-Control", "no-cache");
  res.flushHeaders();

  // Store the connection
  if (!clients.has(orderId)) {
    clients.set(orderId, new Set());
  }
  clients.get(orderId).add(res);
  console.log(`Client connected for orderId: ${orderId}`);

  // Cleanup on client disconnect
  req.on("close", () => {
    const clientSet = clients.get(orderId);
    if (clientSet) {
      clientSet.delete(res);
      console.log(`Client disconnected for orderId: ${orderId}`);
      if (clientSet.size === 0) {
        clients.delete(orderId);
      }
    }
  });
});

// Endpoint to push delivery status updates
app.post("/update-status", (req, res) => {
  const orderId = String(req.body.orderId);
  const clientSet = clients.get(orderId);
  const status = req.body.status;

  if (clientSet && clientSet.size > 0) {
    clientSet.forEach((clientRes) => {
      clientRes.write(`data: ${JSON.stringify({ status })}\n\n`);
    });
    console.log(
      `Pushed status "${status}" to all clients of orderId: ${orderId}`
    );
  } else {
    console.log(`No active clients for orderId: ${orderId}`);
  }

  res.status(200).send("Update attempted");
});

app.listen(PORT, () => {
  console.log(`SSE server listening on http://localhost:${PORT}`);
});
