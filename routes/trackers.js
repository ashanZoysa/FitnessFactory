const express = require('express');
const trackers = require('../models/trackers');

const Trackers = require('../models/trackers');

const router = express.Router();

//save trackers

router.post('/tracker/save',(req,res)=>{

    let newTracker = new Trackers(req.body);

    newTracker.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
                success:"Tracker Saved successfully"
        });
    });

});

//get trackers

router.get('/trackers',(req,res)=>{
    Trackers.find().exec((err,trackers)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingTrackers:trackers
    });
});
});


//get a specific tracker

router.get("/tracker/:id",(req,res) =>{

    let trackerId = req.params.id;

    Trackers.findById(trackerId,(err,tracker) =>{
        if(err){
            return res.status(400).json({success:false, err}); 
        }

            return res.status(200).json({
                success:true,
                tracker       
        });

    });

});

//update trackers

router.put('/tracker/update/:id',(req,res)=>{
    Trackers.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,tracker)=>{
            if(err){
                return res.status(400).json({error:err});
            }

                return res.status(200).json({
                    success:"Updated Successfully"        
            });
        }
    );
});

//delete tracker

router.delete('/tracker/delete/:id',(req,res)=>{
    Trackers.findByIdAndRemove(req.params.id).exec((err,deletedTracker) =>{
        
            if(err) return res.status(400).json({
                message:"Delete Unsuccessful",err
            });

            return res.json({
                message:"Delete Successful",deletedTracker       
            });
        });
});

module.exports = router;
