import express from "express";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/userAccount.routes.js";
import mongoose from "mongoose";
import config from "./configuration/config.js";
import errorHandler from "./middlewares/error.middleware.js";
import authentication from "./middlewares/authentication.middleware.js";
import { createAdmin } from "./configuration/initAdmin.js";

const app = express();

app.use(express.json());

app.use(authentication)

app.use('/forum', postRoutes);
app.use('/account', userRoutes);
app.use(errorHandler);

app.use((req, res) => res.status(404).type('text/plain; charset=utf-8').send('Not found')
);

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodb.uri, config.mongodb.db);
        console.log('Connected to MongoDB');
    } catch (e) {
        console.log('Failed to connect to database', e);
    }
}

async function startServer() {
    await connectDB();
    await createAdmin();
    app.listen(config.port, () => console.log(`Server running on port ${config.port}. Press Ctrl+C to stop.`));
}

startServer();