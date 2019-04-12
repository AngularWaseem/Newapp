const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const post=require('../models/register');
const cteatepost=require('../models/post');

const db="mongodb://localhost:27017/TechMBookM";
var jwt=require('jsonwebtoken')

//we add this because if we dont, we may get a warning //that mongoose is default promise library is deprecated
mongoose.Promise=global.Promise;
//so we add above statement before we connect
mongoose.connect(db, function(err){
if(err){
console.log("Connection error");
}
});


router.post('/login', function(req,res,next){
  let promise = post.findOne({uname: req.body.username,password:req.body.password}).exec();
  promise.then(function(doc){
   if(doc) { // if user is available in database
    console.log(' Request - Username and Password ' + req.body.username + ' ' + req.body.password);
   // console.log(' Inside doc - Username and Password ' + doc.values.username + ' ' + doc.values.password);

    console.log('User name is available in database');
     if(req.body.password!=null) {
     // if(doc.isValidate(req.body.password)){
         // generate token
         let token = jwt.sign({username: req.body.username},'secret', {expiresIn : '3h'});
         return res.status(200).json(token);
     } else {
       return res.status(501).json({message:' Invalid Credentials'});
     }
   }
   else {
     return res.status(501).json({message:'Username is not registered.'})
   }
  });

  promise.catch(function(err){
    return res.status(501).json({message:'Some internal error'});
  })
})

router.get('/username', verifyToken, function(req,res,next){
  //console.log(decodedToken.username);
  return res.status(200).json(decodedToken.username);
})
var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;
  console.log(token);
  jwt.verify(token,'secret', function(err, tokendata){
    // console.log("err " + err);
    // console.log(" tokendata "+ tokendata);
    if(err){
      return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
      console.log('Token Data' + tokendata);
      decodedToken = tokendata;
      console.log(decodedToken);
      next();
    }
  })
}


router.get('/getpost',function(req,res){
 console.log('Requesting posts');
 cteatepost.find({})
 .exec(function(err,getpost){
   if(err){
    console.log('Error getting the getpost');
   }
   else {
    res.json(getpost);
    console.log(getpost);
   }
  });
});



router.post("/add", (req, res, next) => {
  const post1 = new post({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    email: req.body.email,
    uname: req.body.uname,
    password: req.body.password,
  });
  post1.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

router.post("/addpost", (req, res, next) => {
  const post1 = new cteatepost({
    ptitle: req.body.ptitle,
    pdesc: req.body.pdesc,
    uname: req.body.uname
    //date: req.body.date
  });
  post1.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});



router.route('/delete/:id').get(function (req, res) {

  cteatepost.findByIdAndRemove({ _id: req.params.id }, function (err, post) {
  
  if (err) res.json(err);
  
  else res.json('Postgram Deleted Successfully');
  
  });
  
  });

  /*router.route('/update/:id').get(function (req, res) {
    var myquery = { _id: req.body._id };
    const post1 = new cteatepost({
      ptitle: req.body.ptitle,
      pdesc: req.body.pdesc,
      uname: req.body.uname
      //date: req.body.date
    });
      cteatepost.updateOne(myquery, post1, function(err, res){
    if (err) res.json(err);
    
    else res.json('Postgram Deleted Successfully');
    
    });
    
    });*/


    router.post('/update/:id', function(req, res){
      cteatepost.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, post) {
        if (err) return next(err);
       // res.send('Product udpated.');
    });

      /*cteatepost.findByIdAndUpdate({_id: req.params.id},
                         {
      ptitle: req.body.ptitle,
      pdesc: req.body.pdesc,
      uname: req.body.uname
             }, function(err, docs){
               console.log(docs);
             if(err) res.json(err);
             
            else
            { 
               console.log(docs);
               //res.redirect('/update/'+req.params.id);
             }
           });*/
    });
module.exports = router;