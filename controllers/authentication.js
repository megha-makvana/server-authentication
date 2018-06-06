const User = require('../models/user')

exports.signup = function(req, res, next) {
    //check whther the email entered exists in the db
  
    const email= req.body.email;
    const password= req.body.password;

    if(!email || !password){
        return res.status(422).send({ error: 'You must provide and email and password'})
    }

    User.findOne({email: email}, function(err, existingUser){

        if(err) {
            return next(err);
        }
        //if the email alread exists, return an error
        if(existingUser) {
            return res.status(422).send({error :'Email is in use'})
        }
        //if the email doesn'rt exists then, create user record with that email 
        const user = new User({
            email: email,
            password: password
        })

        user.save( function(err) {
            if(err) { return next(err); }

            //respond with an appropirate msg that successful creaton of record.
            res.json({success: true});

        })

    })

    

    
}