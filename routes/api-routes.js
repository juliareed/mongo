//Dependencies
var Article = require('../models/Article.js');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

function updateSaveStatus(id, action) {
    Article.findOneAndUpdate({
        _id: id
    }, {
        saved: action
    }).exec(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
}

module.exports = function(app) {
    app.get('/all', function(req, res) {
        Article.find({}).exec(function(err, articles) {
            if (err) {
                console.log('ERROR');
                console.log('*******');
            } else {
                res.json(articles);
            }
        });
    });

    app.post('/article/:action/:id', function(req, res) {
        console.log('running article save!');
        console.log(req.params.action);
        console.log(req.params.id);

        switch (req.params.action) {
            case 'save':
                updateSaveStatus(req.params.id, true);
                break;
            case 'unsave':
                updateSaveStatus(req.params.id, false);
                break;
        }

    });
};