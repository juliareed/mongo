//Dependencies
var path = require('path');
var cheerio = require('cheerio');
var Article = require('../models/Article.js');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

//Routes
module.exports = function(app, request) {

    app.get('/', function(req, res) {
        //Send landing page
        var scraped = {
            scrape: false
        };
        res.render('index', scraped);
    });

    app.get('/scrape', function(req, res) {
        //Scrape website for titles and posts
        request('https://www.nytimes.com/section/politics', function(error, response, html) {
            var $ = cheerio.load(html);
            //find by proper id/class
            var results = {
                articles: []
            }

            $('.story-body').each(function(i, element) {
                //Set up object to be fed to handlebars
                var article = {};
                article.title = $(this).find('.headline').text();
                article.link = $(this).find('story-link').attr('href');
                article.summary = $(this).find('.summary').text()
                article.author = $(this).find('.byline').text();
                article.saved = false;
                //Create object for handlebars to render
                results.articles.push(article);
                //Insert into MongoDB				
                var newArticle = new Article(article);

                newArticle.save(function(err, doc) {
                    //Log errors
                    if (err) {
                        console.log('ERROR:');
                        console.log('==================================');
                        console.log(err);
                    } else {
                        //Or log the doc
                        console.log(doc);
                    }
                });
            });

            //Render with scrape notification
            var scraped = {
                scrape: true
            };
            res.render('index', scraped);
        });
    });

    app.get('/NYT', function(req, res) {
        Article.find({}).exec(function(err, docs) {
            console.log('Documents:');
            console.log(docs);
            var results = {
                    articles: docs
                }
                //sput in an object, render with handlebars baby
            res.render('NYT', results);
        });
    });

    app.get('/profile', function(req, res) {
        Article.find({
            saved: true
        }).exec(function(err, docs) {
            if (err) {
                console.log(err);
                res.send('Error');
            } else {
                console.log('DOCS');
                console.log('================================');
                console.log(docs);
                var saved = {
                    articles: docs
                }
                res.render('profile', saved);
            }
        });
    });
};