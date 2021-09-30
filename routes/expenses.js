const express = require('express');
const Expenses = require ('../models/expenses');

const router = express.Router();

//save Expenses
router.post('/expense/save',(req,res)=>{

    const expenseType = req.body.expenseType;
    const expenseDate = Date.parse(req.body.expenseDate);
    const expenseDescription = req.body.expenseDescription;
    const expenseAmount = Number(req.body.expenseAmount);

    const newExpense = new Expenses({
        expenseType,
        expenseDate,
        expenseDescription,
        expenseAmount
    });


    newExpense.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({
            success:"Expense saved successfully !"
        })

    }) 

});

//get expense
router.get('/expenses',(req,res)=>{

    Expenses.find().exec((err,expenses)=>{

        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({
            success:true,
            existingExpenses:expenses
        });

    });

});

//get specific expense
router.get("/expense/:id",(req,res)=>{

    let expenseId = req.params.id;

    Expenses.findById(expenseId,(err,expense)=>{

        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            expense
        });


        
    });

});

//update expenses
router.put('/expense/update/:id',(req,res)=>{

        Expenses.findByIdAndUpdate(

                req.params.id,
                {
                    $set:req.body
                },

                (err,post)=>{

                    if(err){
                        return res.status(400).json({error:err});
                    }

                    return res.status(200).json({
                        success:"Update Successfuly"
                    });


                }

        );


});



//delete expense
router.delete('/expense/delete/:id',(req,res)=>{

        Expenses.findByIdAndRemove(req.params.id).exec((err,deletedExpense)=>{

            if(err){
                return res.status(400).json({
                    message:"Delete unsuccessful",err
                });
            }

            return res.json({
                message:"Delete Successful",deletedExpense
            });

        });

});


module.exports = router;