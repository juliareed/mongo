// set up dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create comments
var CommentSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;