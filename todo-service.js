var db = require("./database");

var task = [{ id: 0, title: "buy milk", complete: 0 }, { id: 1, title: "learn Azure DevOps", complete: 0 }, { id: 2, title: "Make Kruger a digital company", complete: 0 }];
var complete = [{ id: 3, title: "finish developingos a POC Nodejs app", complete: 1 }];
var startId = 4;

module.exports.databaseUsed = true;

module.exports.getPendingTasks = () => {
    return getTasks(0);
}

module.exports.getCompletedTasks = () => {
    return getTasks(1);
}

function getTasks(completed) {
    return db.runQuery(`SELECT * FROM tasks WHERE complete=${completed}`).then(result => result.recordset)
        .catch(() => {
            module.exports.databaseUsed = false; return completed == 0 ? task : complete
        });
}



module.exports.addTask = (newTask) => {

    return db.runQuery(`INSERT INTO tasks(title) VALUES ('${newTask}');`)
        .catch(() => {
            module.exports.databaseUsed = false;
            task.push({ id: startId++, title: newTask, complete: 0 })
        });
}


module.exports.completeTask = (completedTaskId) => {
    return db.runQuery(`UPDATE tasks SET complete = 1 WHERE id = ${completedTaskId}`)
        .catch(() => {
            module.exports.databaseUsed = false;
            complete.push(task.filter(item => item.id == completedTaskId).map(item => { item.complete = 1; return item })[0]);
            task = task.filter(item => item.id != completedTaskId);
        });
}