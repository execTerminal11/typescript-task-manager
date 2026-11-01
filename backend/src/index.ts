import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import app from "./app.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const distPath = path.resolve(__dirname, "../../frontend/dist");
app.use(express.static(distPath));

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method !== "GET") return next();
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
