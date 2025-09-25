import { Express } from "express";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user.routes";

const app: Express = express();


app.use(cors(
    {
        origin:process.env.CORS_ORIGIN || 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }
));
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

connectDB();

app.use('/api',userRoutes)
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

export default app;
