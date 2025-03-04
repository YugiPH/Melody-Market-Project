import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import "reflect-metadata"
import { AppDataSource } from "@database/data-source";
import addressRouter from '@routes/address.router'
import categoryRouter from '@routes/categories.router'
import brandRouter from '@routes/brands.router'
import userRouter from '@routes/users.router'
import uploadRoutes from "@routes/upload.routes";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

AppDataSource.initialize().then(() => {
  console.log('initialized db')
}).catch(() => {
  console.error('Error while connecting to the database')
  process.exit(1)  // exit with error code 1 to indicate failure to connect to the database
});

app.use("/", addressRouter, categoryRouter, brandRouter, userRouter)
app.use("/image", uploadRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
