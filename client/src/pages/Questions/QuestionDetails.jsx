import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import upVote from "../../assets/sort-up.svg"
import downVote from "../../assets/sort-down.svg"
import "./Questions.css"
import Avatar from "../../components/Avatar/Avatar"
import DisplayAnswer from "./DisplayAnswer"
import { useDispatch, useSelector } from 'react-redux';
import {deleteQuestion, postAnswer, voteQuestion} from "../../actions/question";
import moment from "moment";
import copy from "copy-to-clipboard";

const QuestionDetails = () => {

    const {id}=useParams();
    const questionList=useSelector((state)=>state.questionsReducer);
    // var questionList=[{
    //     _id:'1',
    //     upVotes:5,
    //     downVotes:3,
    //     questionTitle:"what is a function",
    //     questionBody:"It meant to be",
    //     questionTags:["java", "node.js", "react.js", "mongodb"],
    //     userId:1,
    //     noOfAnswers:3,
    //     userPosted:"abc",
    //     askedOn:"jan 1",
    //     answer:[{
    //       answerBody:"Answer",
    //       userAnswered:"Ramu",
    //       answeredOn:"jan 2",
    //       userId:2,
    //     }]
    //   },{
    //     _id:'2',
    //     upVotes:3,
    //     downVotes:3,
    //     questionTitle:"what is a function",
    //     questionBody:"It meant to be",
    //     questionTags:["java", "node.js", "react.js", "mongodb"],
    //     userId:2,
    //     noOfAnswers:1,
    //     userPosted:"abc",
    //     askedOn:"jan 1",
    //     answer:[{
    //       answerBody:"Answer",
    //       userAnswered:"Ramu",
    //       answeredOn:"jan 2",
    //       userId:2,
    //     }]
    //   }];
    const [answer, setAnswer]=useState('');
    const user=useSelector((state)=>(state.currentUserReducer));
    const navigate=useNavigate();
    const dispatch=useDispatch();
    console.log("questionlist", questionList);
    const handlePostAnswer=(event, answerLength)=>{
        event.preventDefault();
        if(user===null){
            alert("Login or Signup to answer the question");
            navigate('/Auth');
        }
        else{
            if(answer===''){
                alert('Enter answer before submitting');
            }
            else{
                dispatch(postAnswer({id, noOfAnswers:answerLength+1, answerBody:answer, userAnswered:user.result.name}));
                setAnswer("")
            }
        }
    }

    const location=useLocation();
    const url=`https://stackoverflow-clone-backend-ezcl.onrender.com`
    // const url=`http://localhost:3000`

    const handleShare=()=>{
        copy(url+location.pathname);
        alert(`Copied url: ${url+location.pathname}`);
    }

    const handleDelete=()=>{
        dispatch(deleteQuestion(id, navigate));
    }

    const handleUpvote=()=>{
        dispatch(voteQuestion(id, 'upVote', user.result._id));
    }

    const handleDownvote=()=>{
        dispatch(voteQuestion(id, 'downVote', user.result._id));
    }

  return (
    <div className='question-details-page'>
      {
        questionList.data===null?(
            <h1>Loading...</h1>
        ):(
            <>
                {
                    questionList.data.filter(question=>question._id===id).map((question)=>(
                        <div key={question._id}>
                            <section className='question-details-container'>
                                <h1>{question.questionTitle}</h1>
                                <div className='question-details-container-2'>
                                    <div className="question-votes">
                                        <img src={upVote} alt="" width={18} className='votes-icon' onClick={handleUpvote}/>
                                        <p>{question.upVote.length-question.downVote.length}</p>
                                        <img src={downVote} alt="" width={18} className='votes-icon' onClick={handleDownvote}/>
                                    </div>
                                    <div style={{width:"100%"}}>
                                        <p className='question-body'>{question.questionBody}</p>
                                        <div className="question-details-tags">
                                            {
                                                question.questionTags.map((tag)=>(
                                                    <p key={tag}>{tag}</p>
                                                ))
                                            }
                                        </div>
                                        <div className="question-actions-user">
                                            <div>
                                                <button type='button' onClick={handleShare}>Share</button>
                                                {
                                                    user?.result?._id===question.userId && (
                                                        <button type='button' onClick={handleDelete}>Delete</button>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <p>asked {moment(question.askedOn).fromNow()}</p>
                                                <Link to={`/user/${question.userId}`} className='user-link' style={{color:"#00086d8"}}>
                                                    <Avatar backgroundColor={"orange"} px={"8px"} py={"5px"}>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                    <div>
                                                        {
                                                            question.userPosted
                                                        }
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {
                                question.noOfAnswers!==0 && (
                                    <section>
                                        <h3>{question.noOfAnswers} Answers</h3>
                                        <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                                    </section>
                                )
                            }
                            <section className='post-ans-container'>
                                <h3>Your Answer</h3>
                                <form onSubmit={(event)=>{handlePostAnswer(event, question.answer.length)}}>
                                    <textarea name='' rows={10} cols={30} id='' onChange={(event)=>setAnswer(event.target.value)}></textarea>
                                    <br/>
                                    <input type='submit' className='post-ans-btn' value="Post Your Answer"/>
                                </form>
                                <p>
                                    Browse Questions Tagged
                                    {
                                        question.questionTags.map((tag)=>(
                                            <Link to={"/Tags"} key={tag} className='ans-tags'>{tag}</Link>
                                        ))
                                    } or
                                    <Link to={'/AsQuestion'} style={{textDecoration:"none", color:"#009dff"}}> ask your own question</Link>
                                </p>
                            </section>
                        </div>
                    ))
                }
            </>
        )
      }
    </div>
  )
}

export default QuestionDetails
