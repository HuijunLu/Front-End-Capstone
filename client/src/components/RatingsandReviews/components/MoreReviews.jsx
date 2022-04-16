import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MoreReviews ({setReviewsrenderedcount, reviews}) {

  return(
    <div>
       <button id="morereviews" data-testid='moreReviews'  onClick={()=>
      {setReviewsrenderedcount({reviews}.length);}}>
        MORE REVIEWS
      </button>
    </div>
  )

};

export default MoreReviews;