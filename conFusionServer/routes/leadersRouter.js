const express = require('express');
const bodyParser = require('body-parser');

const leadersRouter = express.Router();

leadersRouter.use(bodyParser.json())

leadersRouter.route('/')
 
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    
    next();
})

.get((req,res,next) => {
    res.end('will send all leaders to you')
})
   
.post((req,res,next) => {
    res.end('Will add the leader : ' + req.body.name + ' with details : ' + req.body.description);
})
   
.put((req,res,next) => {
    res.end('Put operation not supported on leaders ');
})
   
.delete((req,res,next) => {
    res.end('Deleting all promotions...')
});
   

leadersRouter.route('/:leaderId')
.get((req,res,next) => {
    res.end('will send leader of dish : ' + req.params.leaderId + ' to you.');
})
   
.post((req,res,next) => {
    res.end('Post operation not supported : ' + req.params.leaderId);
})
   
.put((req,res,next) => {
    res.write('Updating promotions ');
    res.end('Will update leader : ' + req.body.name + ' with details : ' + req.body.description)
})
   
.delete((req,res,next) => {
    res.end('Deleting leaders ' + req.params.leaderId);
})



module.exports = leadersRouter;