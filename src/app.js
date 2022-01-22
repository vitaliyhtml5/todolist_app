const path = require('path');
const express = require('express');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public'), {
    extensions: ['html']
}));

//ACCESS
const getAccess = require('./get_access.js');
app.get('/get-access', (req, res) => getAccess(req, res));

// LOGIN
const getToken = require('./get_token.js');
app.post('/get-token', (req, res) => getToken(req, res));

// GET
const getData = require('./get_data.js');
app.get('/get-all-tasks', (req, res) => getData.getAllData(req, res));
app.get('/get-task', (req, res) => getData.getDataById(req, res));

// ADD
const addTask = require('./add_task.js');
app.post('/add-task', (req, res) => addTask(req, res));

//EDIT
const editTask = require('./edit_task.js');
const editStatus = require('./edit_status.js');
app.put('/edit-task', (req, res) => editTask(req, res));
app.patch('/edit-status', (req, res) => editStatus(req, res));

//DELETE
const deleteTask = require('./delete_task.js');
app.delete('/delete-task', (req, res) => deleteTask(req, res));

//404
app.get('*/*', (req, res) => res.status(404).sendFile(`${path.join(__dirname,'../public')}/404.html`));

app.listen(3002, console.log('Server is running on 3002 port'));