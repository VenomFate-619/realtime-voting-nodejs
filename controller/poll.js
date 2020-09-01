const mongoose = require("mongoose");
const express = require("express");
const app = express();
// const http = require("http").createServer(app);
// let io = require("socket.io")(http);

const Vote = require("../models/Vote");


const keys = require("../config/keys");

module.exports={
    formget:(req,res)=>{
        res.render('index');
    },
    formpost:(req,res)=>{ 
        // validation of title by creating index and using if(err.code==1100)
        let{title,question,option}=req.body
        var choice=[];
        for (let index = 0; index < option.length; index++) {
            choice.push({opt:option[index]})
        }
        const newVote=new Vote({title,question,choice})
            newVote.save()
            .then((data)=>{
                if(!!data)
                {
                    console.log(data);
                    res.render('poll',{
                        title:data.title,
                        question:data.question,
                        choice:data.choice
                    })
                }
                
            })
            .catch(err=>{
                console.log(err);
            })
        // Vote.find().then((votes) => res.json({ success: true, votes: votes }));
    },
    pollget:(req,res)=>{
        // socket 
          req.io.on('connection',(socket)=>{
              console.log('new user connected');
            //   param from frontend
              socket.on('join',(param)=>{
                //   change in id or title
                  socket.join(req.params.title)
              })
          })
        Vote.findOne({title:req.params.title})
            .then((data)=>{
                if(!!data)
                {
                   
                    return res.render('poll',{
                        title:data.title,
                        question:data.question,
                        choice:data.choice
                    })
                }
                // req.flash('err_msg','not such poll existes')
                return res.redirect('/')
                
            })
            .catch((err)=>{
                // for server error
                return res.status(500).json({msg:"server errors"})
            })
    },
    pollpost:(req,res)=>{
        const{checked,title}=req.body;
        // that title should be id or title
        // plz dont change this as it is searching for checked option 
        Vote.findOneAndUpdate({'choice.opt':checked},{$inc:{"choice.$.vote":1}})
            .then(data=>{
                    // socket
                    console.log(data);
                    // choice will be arrsay of choice in db
                    // title or id
                    // .to() should be same as socket.join()
                     req.io.to(title).emit('voteCount',{
                        // send filter data
                        choice:data.choice
                    });
                    res.json({msg:'success'}) 
            })
            .catch((err)=>{
                // flash msg
                // room is the parameter so make it global ok;
               return  res.json({msg:'fail'})
                // res.redirect(`/poll/${room}`)
            });
    }
}
