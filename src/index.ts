import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/componentsRoutes";
import quotationRoutes from "./routes/quotationRoutes";
import consumptionRoutes from "./routes/consumptionRoutes";
import calculationRoutes from "./routes/calculationRoutes";
import isAuth from "./middlewares/is-Auth";

import errorMiddleware from "./middlewares/Error";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", isAuth, adminRoutes);
app.use("/api/consumption", isAuth, consumptionRoutes);
app.use("/api/calculation", isAuth, calculationRoutes);
app.use("/api/quotation", quotationRoutes);

app.use(errorMiddleware);

app.listen(5000);
