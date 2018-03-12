var express = require('express')
var app = express()
var apiRoutes = express.Router()
var appData = require('./mock/data')

apiRoutes.get('/getNews/:id', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");

    console.log(req.params.id)
    res.send({
        errno: 0,
        key: req.params.id,
        urls: __dirname,
        data: appData[req.params.id]
    })
})

app.use('/api', apiRoutes)

var port = 3000

module.exports = app.listen(port, function(err){
    if(err){
        console.log(err)
        return
    }
    console.log('servering......'+port)
})