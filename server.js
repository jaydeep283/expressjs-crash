import path from "path";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

import express from "express";
import { log } from "console";
const app = express();

const port = process.env.PORT || 8000;

// //To make use of Static folder
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "about.html"));
// });

// Body parser Middleware (for raw & urlencoded data)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging Middleware
app.use(logger);

// Routs
app.use("/api/posts", posts);

// Error handler Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
