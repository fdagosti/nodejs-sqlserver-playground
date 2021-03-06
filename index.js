require("dotenv").config()

var bodyParser = require("body-parser");
var cors = require('cors');

var express = require('express');
var app = express()

var tasksService = require("./todo-service");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.set('view engine', 'ejs');



app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
    tasksService.addTask(newTask).then(() => res.redirect("/"));
});

app.get("/", function (req, res) {
    tasksService.getPendingTasks().then((task) => {
        return tasksService.getCompletedTasks().then(complete => {
            res.render("index", { task, complete, env: Object.keys(process.env), dbUsed: tasksService.databaseUsed });
        })
    })
});


app.post("/removetask", function (req, res) {
    (async function loop() {
        var completeTask = req.body.check;
        if (typeof completeTask === "string") {
            await tasksService.completeTask(completeTask);
        } else if (typeof completeTask === "object") {
            for (var i = 0; i < completeTask.length; i++) {
                await tasksService.completeTask(completeTask[i]);
            }
        }
        res.redirect("/")
    })();

});

app.get('/api/messages', (req, res) => {
    return res.send(Object.values(messages));
});

let messages = [
    { id: 1, title: "a message", description: "a simple description" },
    { id: 2, title: "this is a title", description: "and this is a description" },
    { id: 3, title: "titles are good", description: "but descriptions are better" },
    { id: 4, title: "hidden subject", description: "and a hidden message" },
    { id: 5, title: "How to become rich", description: "Exploit your skill as a self-employed expert and invest in it." },
    { id: 6, title: "How to become famous", description: "Know your brand" },
    { id: 7, title: "How to become attractive", description: "Give some compliments" },
    { id: 8, title: "All you need is love", description: "There's nothin' you can do that can't be done" },
];

app.listen(8080, function () {
    console.log('Running on port 8080!')
});