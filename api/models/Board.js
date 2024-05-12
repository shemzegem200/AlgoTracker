const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const BoardSchema = new Schema(
    {
        board: [[String]]
    }
);

const BoardModel = model('Board', BoardSchema);
module.exports = BoardModel;