import express, {Router} from "express";
import * as path from "path";

const app = express();

const Movies = new Router();

Movies.get("/api/movies", (req,res) => {
    res.json([
        {
            title: "Movie 1"
        },
        {
            title: "Movie 2"
        }
    ]);
});

app.use(Movies);

app.use(express.static("../client/dist/"));

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Started on http://localhost:${server.address().port}`);
});