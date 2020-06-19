const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');
const Favorites = require('../models/favorite');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')

//get all the favorite dishes  
.get(function (req, res, next) {
    Favorites.find({})
	.populate('user')
	.populate('dishes')
    .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})

//Add the first favorite dish  
.post(function (req, res, next) {
Favorites.create(req.body, function (err, favorite) {
	if (err) throw err;   
	favorite.user = req.user_id;
	favorite.dishes.push(req.body);
	favorite.save(function (err, favorite) {
		if (err) throw err;
     console.log('Created Favorites!');
            res.json(favorite);;
        });
    });
})

//delete all the favorite dishes
.delete(function (req, res, next) {
     Favorites.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
	   });
    });

favoriteRouter.route('/:dishId')
 
//delete a specific favorite dish
.delete(function (req, res, next) {
	Favorites.findOne({}, function (err, favorite) {
		if (err) throw err;
		var index = favorite.dishes.indexOf(req.params.dishId);
		favorite.dishes.splice(index, 1)
		  console.log('Favorite deleted!'); 
		favorite.save(function (err, favorite) {
			if (err) throw err;
            console.log('Updated Favorites!'); 
            res.json(favorite);;
        });
    });
});
	
module.exports = favoriteRouter;