const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 4000;
// console.log('process.env : ', process.env)
var app = express();
const User = require('./route/User');
const Factory = require('./route/Factory');
const Machine = require('./route/Machine');
const animation_table = require('./route/animation_table');

// 크로스 오리진 이슈
app.use(cors());
app.use(express.json())
app.use('/User', User);
app.use('/Factory', Factory);
app.use('/Machine', Machine);
app.use('/animation_table', animation_table);

// 리액트 빌드파일을 서버에 제공 // 배포하기전에 이부분 주석해제
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});





app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});







