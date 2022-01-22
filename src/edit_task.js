const fs = require('fs');
const getData = require('./get_data.js');
const checkData = require('./check_data.js');
const checkToken = require('./check_token.js');

const editTask = (req, res) => {
    try {
        if (checkToken(req)) {
            getData.readData(res, './fs/tasks.json', (data) => {
                const taskIndex = checkData.checkExistedId(data, req.body.id);
                const index = data.findIndex(item => item.id == req.body.id);
                 
                if (req.body.id === undefined || req.body.task === undefined || req.body.comment === undefined || req.body.status === undefined || !checkData.checkEmptyData(req.body.id, req.body.task, req.body.comment, req.body.status)) {
                    res.status(400).send({code: 400, message: 'some data is missed'});
                } else if (req.body.status !== 'complete' && req.body.status !== 'incomplete') {
                    res.status(400).send({code: 400, message: 'value of status is incorrect'});
                } else if (taskIndex === -1) {
                    res.send({message: 'task does not exist'});
                } else {
                    rewriteFile(data, index);
                }
            });
        } else {
            res.status(401).send({code: 401, message:'Unauthorized'});
        }
    } catch (e) {
        res.status(500).send('something went wrong');
    }

    const rewriteFile = (data, index) => {
        const editedTask = {
            id: req.body.id,
            task: req.body.task,
            comment: req.body.comment,
            created: data[index].created,
            status: req.body.status
        }

        data.splice(index, 1, editedTask);
        
        fs.writeFile('./fs/tasks.json', JSON.stringify(data), (err) => {
            if (err) {
                return res.send(err);
            } else {
                res.send({message: 'task was edited'});
            }
        });
    }
}

module.exports = editTask;