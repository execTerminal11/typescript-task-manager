import express, { type Express, type Request, type Response } from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = require("node:path");
// const fs = require("node:fs");

const app: Express = express();
app.use(express.json());
const PORT = 3000;

// interface Task {
//   id: number;
//   title: string;
//   completed: boolean;
// }

// app.get("/api/health", (req: Request, res: Response) => {
//   res.status(200).json({ success: true });
// });

const distPath = path.resolve(__dirname, "../../frontend/dist");

app.use(express.static(distPath));

app.use((req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
