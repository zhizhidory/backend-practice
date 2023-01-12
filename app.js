let express = require('express');
let app = express();
let indexRouter = require('./routes/index'); // 引入 index 的所有路由

app.set('view engine', 'pug')
app.use(express.static('public'))

app.use('/', indexRouter);

app.listen(3000, function () {
    console.log('Example Nodejs Express listening on port 3000!');
});