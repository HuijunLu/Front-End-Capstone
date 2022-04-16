import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddReview ({setReviewmodalshow}) {

  return(
    <div>
      <button id="addreview" onClick={()=>
      {setReviewmodalshow(true);}}>
        ADD A REVIEW
      </button>
    </div>
  )

};

export default AddReview;