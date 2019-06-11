const express= require('express')
const router=express.Router();
const contact = require('../models/contactSchema.js');

router.get('/contacts',(req,res,next)=>{
    contact.find((err, contacts)=>{
        res.json(contacts);
    })
})

router.post('/contact',(req,res,next)=>{
    let newContact = new contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });

    console.log(newContact);

    newContact.save((err, contact)=>{
        if(err){
            res.json({msg:"Failed"});
        }else{
            res.json({msg:"Added"});
        }
    });
})

router.delete('/contact/:id',(req,res,next)=>{
    contact.remove({_id: req.params.id}, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    });
})




module.exports=router;