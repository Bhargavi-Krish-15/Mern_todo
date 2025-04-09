const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task:{type:String, required:true},
    completed:{type:Boolean, default:false},
    // The user field is a reference to the User model
    // the user field stores a MongoDB ObjectId, to uniquely identify documents in a collection. It is the default type for the _id field of every MongoDB document unless you explicitly specify a different type.
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date, default: Date.now}
    })

const TodoModel = mongoose.model('Todo', TodoSchema);
module.exports = TodoModel;
