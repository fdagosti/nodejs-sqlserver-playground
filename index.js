var bodyParser = require("body-parser");

var express = require('express');
var app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

var task = ["buy milk", "learn Azure DevOps", "Make Kruger a digital company"];

app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect("/");
});
app.get("/", function (req, res) {
    res.render("index", { task: task, complete: complete });
});

var complete = ["finish developing a POC Nodejs app"];
app.post("/removetask", function (req, res) {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

app.listen(8080, function () {
    console.log('Running on port 8080!')
});