const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors({ origin: "https://sprinkla.vercel.app", credentials: true }));
app.use(express.json());

// Map to track SSE connections per deliveryId
const clients = new Map(); // deliveryId => res (SSE response object)

// 👂 Client subscribes to updates for a specific deliveryId
app.get("/events/:deliveryId", (req, res) => {
  const deliveryId = String(req.params.deliveryId);

  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Cache-Control", "no-cache");
  res.flushHeaders();

  // Store the connection
  if (!clients.has(deliveryId)) {
    clients.set(deliveryId, new Set());
  }
  clients.get(deliveryId).add(res);
  console.log(`Client connected for deliveryId: ${deliveryId}`);

  // Cleanup on client disconnect
  req.on("close", () => {
    const clientSet = clients.get(deliveryId);
    if (clientSet) {
      clientSet.delete(res);
      console.log(`❌ Client disconnected for deliveryId: ${deliveryId}`);
      if (clientSet.size === 0) {
        clients.delete(deliveryId); // clean up
      }
    }
  });
});

// 🔁 Endpoint to push delivery status updates
app.post("/update-status", (req, res) => {
  const deliveryId = String(req.body.deliveryId);
  const clientSet = clients.get(deliveryId);
  const status = req.body.status;

  if (clientSet && clientSet.size > 0) {
    clientSet.forEach((clientRes) => {
      clientRes.write(`data: ${JSON.stringify({ status })}\n\n`);
    });
    console.log(
      `📤 Pushed status "${status}" to all clients of deliveryId: ${deliveryId}`
    );
  } else {
    console.log(`⚠️ No active clients for deliveryId: ${deliveryId}`);
  }

  res.status(200).send("Update attempted");
});

app.listen(PORT, () => {
  console.log(`✅ SSE server listening on http://localhost:${PORT}`);
});
