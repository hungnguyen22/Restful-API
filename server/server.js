var express = require('express'),
   bodyParser = require('body-parser'),
   _ = require('underscore'),
json = require('./lions.json'),
   app = express();
 
app.set('port', process.env.PORT || 8080);
 
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
 
var router = new express.Router();
// TO DO: Setup endpoints ...
app.use('/', router);

router.get('/', function(req, res) {
   res.json(json);
});


router.get('/:id', function(req, res){
  var lion = _.find(res.json(json), {id: req.params.id});
  res.json(lion);
});





router.post('/', function(req, res) {
   // insert the new item into the collection (validate first)
   if(req.body.Id ) {
       json.push(req.body);
       res.json(json);
   } else {
       res.json(500, { error: 'There was an error!' });
   }
});


router.put('/:id', function(req, res) {
   // update the item in the collection
   if(req.params.id) {
       _.each(json, function(elem, index) {
            // find and update:
           if (elem.Id === req.params.id) {
               elem.Id == req.body.id;
              
           }
       });
 
       res.json(json);
   } else {
       res.json(500, { error: 'There was an error!' });
   }
});



router.delete('/:id', function(req, res) {
   var indexToDel = -1;
   _.each(json, function(elem, index) {
       if (elem.Id === req.params.id) {
           indexToDel = index;
       }
   });
   if (~indexToDel) {
       json.splice(indexToDel, 1);
   }
   res.json(json);
});




 
var server = app.listen(app.get('port'), function() {
   console.log('Server up: http://localhost:' + app.get('port'));
});









