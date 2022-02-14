import express from "express";

const app = express();

app.get("/quiz", (req, res, next) => {
    res.json({question: "Test Question Task 5?"});
})
app.post("/quiz", (req, res, next) => {
    res.sendStatus(401);
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(
        `started on http://localhost:${server.address().port}`
    );
});