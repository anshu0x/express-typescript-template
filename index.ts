import express, { Express, Request, Response } from "express";
const app: Express = express();
const port = process.env.PORT || 3000;
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  const data = await prisma.user.findMany();
  console.log(data);
  res.json(data);
});
app.get("/:key", async (req: Request, res: Response) => {
  if (req.params.key) {
    const data = await prisma.user.findMany({
      where: {
       OR:[
        {
          name: {
            contains: req.params.key,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: req.params.key,
            mode: "insensitive",
          },
        }
       ],
      },
    });
    console.log(data);
    res.json(data);
  }
  return ;
});
app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
