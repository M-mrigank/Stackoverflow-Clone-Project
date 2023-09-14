import React, { useState } from 'react'
import "./AskQuestion.css"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { askQuestion } from '../../actions/question'

const AskQuestion = () => {

    const [questionTitle, setQuestionTitle]=useState('');
    const [questionBody, setQuestionBody]=useState('');
    const [questionTags, setQuestionTags]=useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((state)=>(state.currentUserReducer));

    const handleSubmit=(event)=>{
        event.preventDefault();
        // console.log({questionTitle, questionBody, questionTags});
        dispatch(askQuestion({questionTitle, questionBody, questionTags, userPosted:user.result.name}, navigate));
        
    }

    const handleEnter=(event)=>{
        if(event.key==='Enter'){
            setQuestionBody(questionBody+'\n');
        }
    }

  return (
    <div className='ask-question'>
        <div className="ask-ques-container">
            <h1>Ask a public Question</h1>
            <form onSubmit={handleSubmit}>
                <div className="ask-form-container">
                    <label htmlFor='ask-ques-title'>
                        <h4>Title</h4>
                        <p>Be specific and imagine you’re asking a question to another person</p>
                        <input type='text' id='ask-ques-title' placeholder="e.g. Is there an R function for finding the index of an element in a vector?" onChange={(event)=>{setQuestionTitle(event.target.value)}}/>
                    </label>

                    <label htmlFor='ask-ques-body'>
                        <h4>Body</h4>
                        <p>Include all the information someone would need to answer your question</p>
                        <textarea id='ask-ques-body' cols={"30"} rows={"10"} onChange={(event)=>{setQuestionBody(event.target.value)}} onKeyPress={handleEnter}/>
                    </label>

                    <label htmlFor='ask-ques-tags'>
                        <h4>Tags</h4>
                        <p>Add up to 5 tags to describe what your question is about</p>
                        <input type='text' id='ask-ques-title' placeholder="e.g. (xml typescript wordpress)" onChange={(event)=>{setQuestionTags(event.target.value.split(' '))}}/>
                    </label>
                </div>
                <input type='submit' value={'Review your question'} className='review-btn' />
            </form>
        </div>
    </div>
  )
}

export default AskQuestion
