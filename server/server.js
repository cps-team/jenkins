const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 4000;
var app = express();
const User = require('./route/User');
const Factory = require('./route/Factory');
const Machine = require('./route/Machine');
const animation_table = require('./route/animation_table');

app.use(cors());
app.use(express.json());
app.use('/User', User);
app.use('/Factory', Factory);
app.use('/Machine', Machine);
app.use('/animation_table', animation_table);

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);

    setTimeout(() => {
        console.log(`Server shutting down after 3 minutes`);
        process.exit();
    }, 1 * 10 * 1000);
});
