const fs = require('fs');
const getData = require('./get_data.js');
const checkData = require('./check_data.js');
const checkToken = require('./check_token.js');

const addTask = (req, res) => {
    try {
        if (checkToken(req)) {
            getData.readData(res, './fs/tasks.json', (data) => {
                if (req.body.task === undefined || req.body.comment === undefined || !checkData.checkEmptyData(req.body.task, req.body.comment)) {
                    res.status(400).send({code: 400, message: 'some data is missed'});
                } else {
                    writeFile(data);
                }
            });
        } else {
            res.status(401).send({code: 401, message:'Unauthorized'});
        }
        
    } catch (e) {
        res.status(500).send('something went wrong');
    }

    const writeFile = data => {
        let newId;
        data.length === 0 ? newId = 1 : newId = data[data.length - 1].id + 1;
        const created = getCurrentDate();

        const newTask = {
            id: newId,
            task: req.body.task,
            comment: req.body.comment,
            created: created,
            status: 'incomplete'
        }

        data.push(newTask);

        fs.writeFile('./fs/tasks.json', JSON.stringify(data), (err) => {
            if (err) {
                return res.send(err);
            } else {
                res.status(201).send({code: 201, message: 'task was created'});
            }
        });
    }
}

const getCurrentDate = () => {
    const setDate = item => {
        if (String(item).length === 1) return `0${item}`;
        else return item;
    }
    const date = new Date();
    const created = `${setDate(date.getDate())}.${setDate(date.getMonth()+1)}.${date.getFullYear()} ${setDate(date.getHours())}:${setDate(date.getMinutes())}`;
    return created;
}

module.exports = addTask;