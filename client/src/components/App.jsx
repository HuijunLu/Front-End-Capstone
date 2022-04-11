import React, { useState, useEffect } from 'react';

import NavBar from './Navigation/NavBar.jsx';
import Announcements from './Navigation/Announcements.jsx';
import ProductOverview from './Overview/ProductOverview.jsx';
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';
import QuestionAndAnswers from './QuestionsAndAnswers/QuestionAndAnswers.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsReviews.jsx';

import { useInView } from 'react-intersection-observer';
import useLocalStorage from "use-local-storage";
import { Link } from 'react-scroll';
import { BsArrowBarUp } from 'react-icons/bs'



const App = (props) => {

  const [product_id, setProduct_id] = useState(37311);
  const [productName, setProductName] = useState('Camo Onesie');
  const [avgReviewRating, setAvgReviewRating] = useState(null);
  const { ref, inView, entry } = useInView();
  const [questionLength, setQuestionLength] = useState(null);
  const [reviewLength, setReviewLength] = useState(null);
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const [cartData, setCartData] = useState([]);


  const handleCartData = (data) => {
    setCartData([...cartData, data]);
  }

  return (

    <div className="app" data-theme={theme}>
      <NavBar productName={productName} avgReviewRating={avgReviewRating} reviewLength={reviewLength} questionLength={questionLength} inView={inView} theme={theme} setTheme={setTheme} />
      <Announcements />
      <div ref={ref}>
        <ProductOverview product_id={product_id} handleCartData={handleCartData} />
      </div>
      {/* <div ref={ref}> */}
      <RelatedProducts product_id={product_id} setProduct_id={setProduct_id} avgReviewRating={avgReviewRating} setProductName={setProductName} />
      {/* </div> */}
      <QuestionAndAnswers product_id={product_id} setQuestionLength={setQuestionLength} />
      <RatingsAndReviews product_id={product_id} productName={productName} setAvgReviewRating={setAvgReviewRating} setReviewLength={setReviewLength} />
      <button className="scroll-top">
        <Link activeClass="active" to="app" spy={true} smooth={true}>
          <p>TOP <BsArrowBarUp /> </p>
        </Link>
      </button>

    </div>

  )
}

export default App;