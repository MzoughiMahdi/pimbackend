const express = require("express");
const router = express.Router();
const passport = require("passport");

//post model
const Post = require("../../models/Post");
const User = require("../../models/User");
//profile model
const Profile = require("../../models/Profile");

// validation
const validatePostInput = require("../../validation/post");
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'public/')
  },
  filename: (req, file, cb) => {
      const mimeType = file.mimetype.split('/');
      const fileType = mimeType[1];
      const fileName = file.originalname;
      cb(null, fileName);
  },
});
const upload = multer({ storage: storage });
var pathFolder = 'public/';
//@route         GET api/posts/test
// @desc         tests post

//@route         GET api/posts/
// @desc         tests post route

router.get('/', async(req, res) => {
  try {
    const post = await Post.find();
    
    var newPost=[];
   

    
    
    for (var i = 0; i <post.length; i++) {
     
     
      newPost.push({
        
        "_id": post[i]._id,
        "text": post[i].text,
        "title": post[i].title,
        "photo": post[i].photo,
        "date": post[i].date,
        "comments":post[i].comments
      })

    }
    
    res.json(newPost);

} catch (err) {
    res.json({ message: err });
}
});


router.post('/getCommentsByPost', async(req, res) => {
  try {
       const post = await Post.findOne({ '_id': req.body.postId });
       const users = await User.find();

       var newComment=[];
       var newUser=[];
       for (var j = 0; j <users.length; j++) {
         newUser.push(users[j]);
       }
      
      
        for(var l=0; l<post.comments.length; l++){
          for(var m=0; m<newUser.length; m++){
            if(newUser[m]._id.toString() === post.comments[l].author.toString()){
              newComment.push({
                "_id":post.comments[l]._id,
                "date":post.comments[l].date,
                "text":post.comments[l].text,
                "username":newUser[m].firstName+" "+ newUser[m].lastName,
                "avatar":newUser[m].avatar
              })
            }
        
          }
        
        }
      
          
      

      res.json(newComment);


  } catch (err) {
      res.json({ message: err });
  }
});
router.post('/getpostlike', function (req, res) {
  try {
      Post.findOne({_id: req.body.publicationId}, function (err, post) {
          if (err) {
              return res.json({
                  status: 0,
                  message: ('error get Profile ' + err)
              });
          }
          if (!post) {
              return res.json({
                  status: 0,
                  message: ('post does not exist')
              });
          }
           else {
              var liked = "0"
              for (var i = 0; i < post.likes.length; i++) {
                  
                   console.log("userrrrr"+post.likes[i].user._id)
                  console.log("userrrrr body"+req.body.userId)
                  if(post.likes[i].user._id.equals(req.body.userId)){
                      liked="1"
                  }
              }
                  res.json(liked);
              }
      });
  } catch (err) {
      console.log(err);
      res.json({
          status: 0,
          message: '500 Internal Server Error',
          data: {}
      })

  }
});
router.post('/getnbLikes', function (req, res) {
  try {
      Post.findOne({_id: req.body.publicationId}, function (err, post) {
          if (err) {
              return res.json({
                  status: 0,
                  message: ('error get Profile ' + err)
              });
          }
          if (!post) {
              return res.json({
                  status: 0,
                  message: ('post does not exist')
              });
          }
           else {
              
                  res.json(post.likes.length);
              }
      });
  } catch (err) {
      console.log(err);
      res.json({
          status: 0,
          message: '500 Internal Server Error',
          data: {}
      })

  }
});
router.post('/dislikePublication', function (req, res) {
  Post.findOne({'_id':req.body.publicationId},function (err,publication) {
      if (err) {
          return res.json({
              status: 0,
              message: ('Error find publication ') + err
          });
      } else {
          for (var i = 0; i < publication.likes.length; i++) {
              if(publication.likes[i].user == req.body.userId)
              {
                  publication.likes.splice(i,1);
              }
          }
          publication.save();
          res.json({
              status: 1,
              message : 'Publication is disliked succeffully'
          });
      }
  });
});
//@route         GET api/posts/:id
// @desc         get post by id

router.get("/getById/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((posts) => res.json(posts))
    .catch((err) =>
      res.status(404).json({ nopostfound: "no post found with that id" })
    );
});
router.post('/deletePost', function (req, res) {
  Post.findByIdAndRemove(req.body.publicationId)
      .then(() => {
          res.json({
              message : 'Publication is deleted successfully'
          });
     
        })
      .catch(error => {
          res.json({
              message : 'Internal server error'
          });
      })
});
router.post('/addLike', function (req, res) {
  try {
      Post.findOne({'_id': req.body.publicationId}).exec(function (err, publication) {
          if (err) {
              return res.json({
                  message: ('Error find publication ') + err
              });
          } else {
              try {
                  var likeContent = [];
                      likeContent = publication.likes;
                      const like = {
                          user: req.body.userId
                          
                      };
                      likeContent.push(like);
                      publication.likes = likeContent;
                      publication.save(function (err) {
                          if (err) {
                              console.log('error' + err)
                          } else {
                              return res.json({
                                  message: 'Publication is liked succeffully'
                              });
                          }
                      });
                  
              } catch (err) {
                  console.log(err);
                  res.json({
                      message: '500 Internal Server Error'
                  })

              }
          }
      });

  } catch (err) {
      console.log(err);
      res.json({
          message: '500 Internal Server Error'
      })

  }
});
router.post('/getPostByUser', function (req, res) {
  


  Post.find({'user':req.body.userId}).exec(function (err,posts){
      if (err) {
          return res.json({
              message:"Internal server error"
          })
      }else{
          var newPosts=[]
          for (var i = 0; i < posts.length; i++) {
              newPosts.push({
                  "_id": posts[i]._id,
                  "text": posts[i].text,
                  "title": posts[i].title,
                  "photo": posts[i].photo,
                  "date": posts[i].date,
              })
          }
          res.json(newPosts)
      }
  })
  

})

router.get('/getPostBYCategory', async(req, res) => {
  try {
      const post = await Post.find({category: req.headers.category });
      console.log(post);
      console.log(post.length);
      var newPost=[];
      for (var i = 0; i <post.length; i++) {
       
        newPost.push({
          
          "_id": post[i]._id,
          "text": post[i].text,
          "title": post[i].title,
          "photo": post[i].photo,
          "date": post[i].date
        })

      }
      console.log(newPost);
      res.json(newPost);

  } catch (err) {
      res.json({ message: err });
  }
});
router.post('/getPostBYId', async(req, res) => {
  try {
      const post = await Post.findOne({_id: req.body.id });
      console.log(post);
    
      res.json({
       
        postId: post._id,
        text: post.text,
        title: post.title,
        user: post.user,
        photo: post.photo,
        category: post.category,
        date: post.date,
        
    });

  } catch (err) {
      res.json({ message: err });
  }
});

//@route         Post api/posts/
// @desc         create post route

router.post(
  "/add",upload.single('file'),
  /*passport.authenticate("jwt", { session: false }),*/
  (req, res) => {
    try {
     
      const newPost = new Post({
        text: req.body.text,
        title: req.body.title,
        photo: req.file.originalname,
        category: req.body.category,
        date: new Date(),
        user: req.body.userid,
      });

      newPost
        .save()
        .then((post) =>
          res.json(post).json({ nopostfound: "no post found with that id" })
        );
    } catch (err) {
      console.log(err);
    }
  }
);

//@route         DELETE api/posts/:id
// @desc
//@access        Private

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          //check for posts owner\
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ noauth: "user not auth" });
          }
          post.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "no post found" })
        );
    });
  }
);

//@route         Post api/posts/like:id
// @desc

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "user already liked this post" });
          }

          //add user id to likes PropTypes.array
          post.likes.unshift({ user: req.user.id });

          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "no post found" })
        );
    });
  }
);

//@route         Post api/posts/unlike:id
// @desc

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            (post.likes.filter(
              (like) => like.user.toString() === req.user.id
            ).length = 0)
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "you have not yet liked this post" });
          }

          // get remove index
          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          //spice it out of the array
          post.likes.splice(removeIndex, 1);

          //save
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "no post found" })
        );
    });
  }
);

//@route         Post api/posts/comment/:id
// @desc       add a         Private

router.post("/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };
        //add to comments array
        post.comments.unshift(newComment);

        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "post not found" }));
  }
);

//@route         delete api/posts/comment/:id
// @desc       delete a         Private

router.delete("/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        //check to see if comment exists
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(400).json({
            commentnotexists: "comment does not exist",
          });
        }

        // get remove index
        const removeIndex = post.comments
          .map((item) => item.user.toString())
          .indexOf(req.params.comment_id);

        //spice it out of the array
        post.comments.splice(removeIndex, 1);

        //save
        post.save().then((post) => res.json(post));
      })
      .catch((err) =>
        res.status(404).json({
          postnotfound: "no post found",
        })
      );
  }
);




router.post('/addComment', function (req, res) {
  try {
      console.log(req.body)
      Post.findOne({'_id': req.body.publicationId}).exec(function (err, publication) {
          if (err) {
              return res.json({
                  status: 0,
                  message: ('Error find publication ') + err
              });
          } else {
              try {
                  var commentContent = [];
                  
                      commentContent = publication.comments;
                      const comment = {
                          text: req.body.text,
                          author: req.body.userId,
                          date: Date.now(),
                      };

                      commentContent.push(comment);
                      publication.comments = commentContent;
                      publication.save(function (err) {
                          if (err) {
                              console.log('error' + err)
                          } else {
                              return res.json({
                                  
                                  message: 'Comment added succeffully'
                              });
                          }
                      });
                  
              } catch (err) {
                  console.log(err);
                  res.json({
                      status: 0,
                      message: '500 Internal Server Error',
                      data: {}
                  })

              }
          }
      });

  } catch (err) {
      console.log(err);
      res.json({
          status: 0,
          message: '500 Internal Server Error',
          data: {}
      })

  }
});
module.exports = router;
