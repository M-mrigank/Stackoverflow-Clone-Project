import Questions from "../models/Questions.js"
import mongoose from "mongoose"

export const AskQuestion=async (req, res)=>{
    const postQuestionData=req.body;
    const postQuestion=new Questions({
        ...postQuestionData,
        userId:req.userId,
    });
    try{
        await postQuestion.save();
        return res.status(200).json("Posted a question successfully");
    }
    catch(error){
        console.log(error);
        return res.status(400).json("Couldn't post a new question");
    }
}

export const getAllQuestions=async (req, res)=>{
    try{
        const questionList=await Questions.find();
        return res.status(200).json(
            questionList
        )
    }
    catch(error){
        return res.status(404).json({message:error.message});
    }
}

export const deleteQuestion=async(req, res)=>{
    const {id:_id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json("Question not available");
    }
    try{
        await Questions.findByIdAndRemove(_id);
        return res.status(200).json({message:"Successfully deleted..."});
    }
    catch(error){
        return res.status(404).json({messgae:error.message});
    }
}

export const voteQuestion=async(req, res)=>{
    const {id:_id}=req.params;
    const {value, userId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json("Question unavailable...");
    }
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json("Answer not available...");
    }
    try{
        const question=await Questions.findById(_id);
        const upIndex=question.upVote.findIndex((id)=>id===String(userId));
        const downIndex=question.downVote.findIndex((id)=>id===String(userId));
        if(value==='upVote'){
            if(downIndex!==-1){
                question.downVote=question.downVote.filter((id)=>id!==String(userId));
            }
            if(upIndex===-1){
                question.upVote.push(userId);
            }
            else{
                question.upVote=question.upVote.filter((id)=>id!==String(userId));
            }
        }
        else if(value==='downVote'){
            if(upIndex!==-1){
                question.upVote=question.upVote.filter((id)=>id!==String(userId));
            }
            if(downIndex===-1){
                question.downVote.push(userId);
            }
            else{
                question.downVote=question.downVote.filter((id)=>id!==String(userId));
            }
        }
        await Questions.findByIdAndUpdate(_id, question);
        return res.status(200).json({message:"Voted successfully..."});
    }
    catch(error){
        return res.status(404).json({message:"Id not found"});
    }
}