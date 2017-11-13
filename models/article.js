// require mongoose
var mongoose = require('mongoose');
// create Schema
var Schema = mongoose.Schema;

// create Article Schema

var ArticleSchema = new Schema({
    // title
    title: {
        type: String,
        unique: true
    },
    author: {
        type: String
    },
    // summary
    summary: {
        type: String
    },
    // link
    link: {
        type: String
    },
    // saved
    saved: {
        type: Boolean,
        default: false
    },
    // note
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

// create article schema with this
var Article = mongoose.model('Article', ArticleSchema);

// export for use
module.exports = Article;