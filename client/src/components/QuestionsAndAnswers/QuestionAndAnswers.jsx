//import packages
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import components
import SearchBar from './components/SearchBar.jsx';
import QAList from './components/QAList.jsx';
import AddQuestion from './components/AddQuestion.jsx';
import "./components/QuestionAndAnswers.css";


const QuestionAndAnswers = ({ product_id, setQuestionLength}) => {


  const [questionList, setQuestionList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(4);
  const [collapseQuestions, setCollapseQuestions] = useState(true)



  const handleSearch = (term) => {
    if (term.length > 2) {
      let filteredQuestions = questionList.filter(
        q => q.question_body.toLowerCase().includes(term.toLowerCase()));
      setFilteredQuestions(filteredQuestions);;
    } else {
      setFilteredQuestions(questionList);
    }
  }

  const handleOpenModel = () => {
    setShowModel(showModel => !showModel);
  }

  const showMoreQuestion = () => {
    setQuestionNumber(questionList.length);
    setCollapseQuestions(prev => !prev)
  }

  const closeQuestions = () => {
    setQuestionNumber(4);
    setCollapseQuestions(prev => !prev);
  }


  useEffect(() => {
    axios.get('/qa/questions', { params: { product_id: product_id } })
      .then(res => {
        var sortedQuestions = res.data.results.sort((a, b) => {
          return b.question_helpfulness - a.question_helpfulness;
        })
        setQuestionList(sortedQuestions);
        setFilteredQuestions(sortedQuestions);
        setQuestionLength(res.data.results.length)
        setCollapseQuestions(true);
        setQuestionNumber(4);
      })
      .catch(err => {
        console.log("err in getting questions per id:", err)
      })
  }, [product_id])



  return (

    <div className='QuestionAndAnswers'>

      <h2 className='QAtitle'>QUESTIONS & ANSWERS</h2>
      <SearchBar handleSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

      {questionList ?
        <QAList searchTerm={searchTerm} filteredQuestions={filteredQuestions} questionNumber={questionNumber}/> : null}
      <br></br>

      <div className='QABtn'>
        {filteredQuestions.length > 4  && collapseQuestions ?
          <button data-testid = 'moreQBtn' className='moreQBtn' onClick={showMoreQuestion} >MORE ANSWERED QUESTIONS</button> : null}
        {!collapseQuestions ?
          <button className='goBackQ' onClick = {closeQuestions}>GO BACK</button> : null}
        <button className='addQBtn' onClick={handleOpenModel} >ADD A QUESTION</button>
        {showModel ?
          <AddQuestion  product_id={product_id} handleOpenModel={handleOpenModel} /> : null}
      </div>

    </div>
  )

}

export default QuestionAndAnswers;