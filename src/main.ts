import express, { Express } from "express";
import accountRoutes from "./routes/account.route";
import dotenv from "dotenv";

// allow env loading
dotenv.config();

const app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes file
app.use("/api/v1/accounts", accountRoutes);

app.listen(port, () => {
    console.log(`listening on http:\\\\localhost:${port}`);
});

