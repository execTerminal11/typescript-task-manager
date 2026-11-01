import express, {
  type Request,
  type Response,
  type Application,
} from "express";

const app: Application = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "My fullstack project API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      tasks: "/api/tasks",
    },
  });
});

export default app;
