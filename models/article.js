//Require mongoose
var mongoose = require('mongoose');
//Create Schema
var Schema = mongoose.Schema;

//Create Article Schema

var ArticleSchema = new Schema({
    //Title
    title: {
        type: String,
        unique: true
    },
    author: {
        type: String
    },
    //Summary
    summary: {
        type: String
    },
    //Link
    link: {
        type: String
    },
    //Saved
    saved: {
        type: Boolean,
        default: false
    },
    //Note
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

//Create article schema with this
var Article = mongoose.model('Article', ArticleSchema);

//Export for use
module.exports = Article;