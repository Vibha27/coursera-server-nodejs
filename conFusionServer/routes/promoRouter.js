const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json())

promoRouter.route('/')
 
.get((req,res,next) => {
    Promotions.find({})
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    }, (err) => next(err))
    .catch((err) => next(err))
})
   
.post((req,res,next) => {
    Promotions.create(req.body)
    .then((promo) => {
        console.log('New Promo added : ' + promo)
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err))
})
   
.put((req,res,next) => {
    res.end('Put operation not supported on promotions ');
})
   
.delete((req,res,next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err))
    
});
   

promoRouter.route('/:promoId')
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promo) => {
        console.log(promo);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promo)
    }, (err) => next(err))
    .catch((err) => next(err))
})
   
.post((req,res,next) => {
    res.end('Post operation not supported : ' + req.params.promoId);
})
   
.put((req,res,next) => {
    Promotions.findByIdAndUpdate(req.params.promoId,{
        $set : req.body
    },{
        new : true
    })
    .then((promo) => {
        console.log('Updated promotions ' + req.params.promoId);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch(err => next(err));
})
   
.delete((req,res,next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    },(err) => next(err))
    .catch((err) => next(err));
})


module.exports = promoRouter;