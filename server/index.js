require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

// ===== MongoDB Connection =====
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      server.listen(PORT, () =>
        console.log(`Server listening on port ${PORT}`)
      );
    })
    .catch((err) => console.log("Connection failed", err));
} else {
  console.warn(
    "MONGO_URI is not set. API will return 503 until database is configured."
  );
  server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}
