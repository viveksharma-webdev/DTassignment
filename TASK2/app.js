const express = require('express');
const app = express();
const path =require('path');

const {CreateRouter} = require('./routes/CreateRouter');         
const {DeleteRouter} = require('./routes/DeleteRouter');        
const {IndexRouter}= require('./routes/IndexRouter');
const {UpdateRouter}= require('./routes/UpdateRouter');
const{UserNudgeRouter}= require('./routes/UserNudgeRouter');

app.use(express.json());

app.use('/api/v1/app',CreateRouter);
app.use('/api/v1/app',IndexRouter);
app.use('/api/v1/app',UserNudgeRouter);
app.use('/api/v1/app',UpdateRouter);
app.use('/api/v1/app',DeleteRouter);