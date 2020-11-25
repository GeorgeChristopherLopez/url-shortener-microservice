const express = require('express');
const router = express.Router();
const ShortUrl = require("../models/shorturl");
const dns = require('dns');

router.get('/',  (req, res)=>{
    res.send('this is api/shorturl')
});

router.get('/new', (req, res) => {
    // as params
    res.send('this is api/shorturl/new.  NEED PARAMS')
    // else 
    // {"error":"Wrong format"}
  });

  router.get('/:id', function(req, res) {
      // get url by :id from mongodb
    
      ShortUrl.find({"short_url":req.params.id}).then(result=>{
        console.log(result);
            if(result.length > 0){
              res.redirect(result[0]['original_url'] 
            )
            } else {
              res.json({"error":"Invalid Entry"})
            }

      });
      // if exhist redirect to url
      // if not return error
  
  });
  
  router.post('/new', (req, res) =>{

    // validate url
   const host = req.body.url;
   let validity = dns.lookup(host, (err, addresses, family)=>{
     if(err){


     res.json({"error":"Invalid Url"})

     } else {
           // check if url exhists 
    ShortUrl.find({"original_url":host}).then(result=>{
      if(result.length > 0){
   
        console.log("result found", result);
        console.log(result.short_url)
        res.json({
          original_url : result[0]['original_url'], 
          short_url : result[0]['short_url']
        })

      } else {
        console.log("url not found, creating new one")
            // if so return it to api/shorturl/new
    // else add new, return it to api/shorturl/new
    ShortUrl.find().then(result=>{
     
      const id = result.length + 1;
      console.log( id,host)
    
      const shorturl = new ShortUrl({
        original_url: host,
        short_url: id
      })
      
      shorturl.save()
      .then(data=>{
        res.json({
        original_url: req.body.url,
        short_url: id
      })
      })
      .catch(err=>{
        res.json({"error":"Invalid URL"})
      })
  
  
    })
  
    // res.redirect('/api/shorturl/new')

      }
     
     
      
    });




     }
   });
  
   
  });
module.exports = router;