import React from 'react'
import "./HomeMainbar.css"
import {useLocation, Link, useNavigate} from "react-router-dom"
import Questions from './Questions';
import QuestionList from './QuestionList';
import {useSelector} from "react-redux";

const HomeMainbar = () => {

  // var questionList=[{
  //   _id:1,
  //   upVotes:5,
  //   downVotes:3,
  //   questionTitle:"what is a function",
  //   questionBody:"It meant to be",
  //   questionTags:["java", "node.js", "react.js", "mongodb"],
  //   userId:1,
  //   noOfAnswers:3,
  //   userPosted:"abc",
  //   askedOn:"jan 1",
  //   answer:[{
  //     answerBody:"Answer",
  //     userAnswered:"Ramu",
  //     answeredOn:"jan 2",
  //     userId:2,
  //   }]
  // },{
  //   _id:2,
  //   upVotes:3,
  //   downVotes:3,
  //   questionTitle:"what is a function",
  //   questionBody:"It meant to be",
  //   questionTags:["java", "node.js", "react.js", "mongodb"],
  //   userId:2,
  //   noOfAnswers:1,
  //   userPosted:"abc",
  //   askedOn:"jan 1",
  //   answer:[{
  //     answerBody:"Answer",
  //     userAnswered:"Ramu",
  //     answeredOn:"jan 2",
  //     userId:2,
  //   }]
  // }];

  const questionList=useSelector((state)=>state.questionsReducer);

  console.log("ques",questionList);

  const location=useLocation();
  const user=useSelector((state)=>state.currentUserReducer);;
  const navigate=useNavigate();

  const checkAuth=()=>{
    if(user===null){
      alert("Login or Signup to ask question");
      navigate('/Auth');
    }
    else{
      navigate('/AskQuestions');
    }
  }

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {
          location.pathname==='/'?(
            <h1>Top Questions</h1>
          ):(
            <h1>All Questions</h1>
          )
        }
        <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
      </div>
      <div>
        {
          questionList.data===null?(
            <h1>Loading...</h1>
          ):(
            <>
              <p>{questionList.data.length} questions</p>
              <>
                <QuestionList questionList={questionList.data}/>
              </>
            </>
          )
        }
      </div>
    </div>
  )
}

export default HomeMainbar
