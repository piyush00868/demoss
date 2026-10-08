const express = require("express");
const path = require("path");

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use("/calculator", express.static(path.join(__dirname, "frontend")));

app.get("/", (_req, res) => {
  res.json({
    message: "Express server is running",
  });
});

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

app.use((_req, res) => {
  res.status(404).json({
    error: "Not found",
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
