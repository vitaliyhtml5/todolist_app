const fs = require('fs');
const getData = require('./get_data.js');
const checkData = require('./check_data.js');
const checkToken = require('./check_token.js');

//delete-task?id=6
const deleteTask = (req, res) => {
    try {
        if (checkToken(req)) {
            getData.readData(res, './fs/tasks.json', (data) => {
                const taskIndex = checkData.checkExistedId(data, req.query.id);
                const index = data.findIndex(item => item.id == req.query.id);
    
                if (req.query.id === undefined || !checkData.checkEmptyData(req.query.id)) {
                    res.status(400).send({code: 400, message: 'id is required'});
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
        data.splice(index, 1);
        
        fs.writeFile('./fs/tasks.json', JSON.stringify(data), (err) => {
            if (err) {
                return res.send(err);
            } else {
                res.send({message: 'task was removed'});
            }
        });
    }
}

module.exports = deleteTask;