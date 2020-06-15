const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Leaders = require('../models/leaders');
const cors = require('./cors');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.options(cors.corsWithOptions, (req,res) => { res.sendStatus(200) })
.get(cors.cors,(req,res,next) => {
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err))
})
   
.post(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
    Leaders.create(req.body)
    .then((leader) => {
        console.log('New leader added : ' + leader)
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err))
})
   
.put(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
    res.end('Put operation not supported on Leaders ');
})
   
.delete(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err))
    
});
   

leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions, (req,res) => { res.sendStatus(200) })

.get(cors.cors,(req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        console.log(leader);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => next(err))
})
   
.post(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
    res.end('Post operation not supported : ' + req.params.leaderId);
})
   
.put(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId,{
        $set : req.body
    },{
        new : true
    })
    .then((leader) => {
        console.log('Updated Leaders ' + req.params.leaderId);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch(err => next(err));
})
   
.delete(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    },(err) => next(err))
    .catch((err) => next(err));
})


module.exports = leaderRouter;