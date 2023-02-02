const express = require('express');
const cors = require('cors');
// const path = require('path');

const PORT = process.env.PORT || 4000;
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

// 리액트 빌드파일을 서버에 제공
// app.use(express.static("public"));
// app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});







