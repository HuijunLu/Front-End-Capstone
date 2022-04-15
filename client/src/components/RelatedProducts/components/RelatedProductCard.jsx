import React, { useState, useEffect } from 'react';
import Star from '../../SharedComponents/star.jsx';


const RelatedProductCard = ({ count, setProduct_id, relatedProductData, reviewData, product, setProductName }) => {

  const { id, category, photos, name, default_price, sale_price } = product;


  const handleRelatedCardClick = () => {
    setProduct_id(id);
    setProductName(name)
  }

  const calculaterating = (object) => {
    console.log(object);
    var sumrating = 0;
    var countrating = 0;
    for (let key in object) {
      sumrating += Number(key) * Number(object[key]);
      countrating += Number(object[key]);
    }
    var ratingresult = sumrating/countrating;
    return ratingresult;
  };

  return (

        <div className='RPcard' onClick={handleRelatedCardClick}>

          <img className='RPcard-image' alt='related-card' src={(!photos[0].thumbnail_url) ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png' : photos[0].thumbnail_url}></img>
          {/* <div className='RPStars'>
          <Star id='RatingMetaFractionStars' value={calculaterating(reviewData[count].ratings)}/>
          </div> */}
          <div className="RPcard__content">
            <div className="card__header-text">
              <h3 className="RPcategory">{category.toUpperCase()}</h3>
              <span className="RPname">{name}</span>
            </div>
              {sale_price ?
              <div className='RPprice'>
                <p style={{ color: 'red' }}>${sale_price}</p>
                <p style={{ textDecoration: 'line-through' }}>${default_price}</p>
              </div>
              : <span className='RPprice'>${default_price}</span> }
           </div>

        </div>

  )
}



export default RelatedProductCard;