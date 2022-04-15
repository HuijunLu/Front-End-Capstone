import { render, screen, fireEvent } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import '@testing-library/jest-dom';
import axios from 'axios';
import RRMockData from './RRMockData.js';
import RRMetaMockData from './RRMetaMockData.js';

import RatingsReviews from '../RatingsReviews.jsx';
import ReviewSort from '../components/ReviewSort.jsx';
import ReviewList from '../components/ReviewList.jsx';
import ReviewTile from '../components/ReviewTile.jsx';
import MoreReviews from '../components/MoreReviews.jsx';
import RatingBreakdown from '../components/RatingBreakdown.jsx';
import AddReview from '../components/AddReview.jsx';
import ProductBreakdown from '../components/ProductBreakdown.jsx';
import ReviewModal from '../components/ReviewModal.jsx';

jest.mock('axios');


describe('Ratings and Reviews: each review tile should have expected behavior', () => {

  it('user can only put helpful on each tile once, the second click should be disabled', async () => {

    axios.put.mockImplementation (url => {
      if (url === '/reviews/1115643/helpful') {
        return Promise.resolve ()
      }
    })

    render(<ReviewTile review={RRMockData.results[0]}/>);
    const helpfulLinkElement = screen.getByTestId('testHelpfulLink');
    fireEvent.click(helpfulLinkElement);
    expect(helpfulLinkElement).not.toBeInTheDocument();
  });

  it('user can only report each tile once, the second click should be disabled', () => {

    axios.put.mockImplementation (url => {
      if (url === '/reviews/1115643/report') {
        return Promise.resolve ()
      }
    })

    render(<ReviewTile review={RRMockData.results[0]}/>);
    const reportLinkElement = screen.getByTestId('reportLinkElement');
    fireEvent.click(reportLinkElement);
    expect(reportLinkElement).not.toBeInTheDocument();
  });

});


const mockedSetReviewsRenderCount = jest.fn();

describe('Ratings and Reviews: review list should have expected behaviors', () => {

  it('only 2 review tiles show upon opening of website', () => {
    render(<ReviewList reviews={RRMockData.results} reviewsrenderedcount={2} selectedstars={[]}/>);
    const reviewTileElements = screen.getAllByTestId('reviewtile');
    expect(reviewTileElements.length).toBe(2);
  });

  it('click more reviews button should set reviewsrendered counts', () => {
    render(<MoreReviews reviews={RRMockData.results} setReviewsrenderedcount={ mockedSetReviewsRenderCount}/>);
    const moreReviewButton = screen.getByTestId('moreReviews');
    fireEvent.click(moreReviewButton);
    expect(mockedSetReviewsRenderCount).toBeCalled();
  });

});

const setSelectedstars = jest.fn();
const setReviewsrenderedcount = jest.fn();
const setAvgReviewRating = jest.fn();


describe('Ratings and Reviews: Rating Breakdown should have expected behaviors', () => {

  it('should apply star filter upon clicking on the breakdown', () => {
    render(<RatingBreakdown metadata={RRMetaMockData} selectedstars={[5]} setSelectedstars={setSelectedstars} setReviewsrenderedcount={setReviewsrenderedcount} setAvgReviewRating={setAvgReviewRating}/>);
    const fivestarbar = screen.getByTestId('fivestar');
    fireEvent.click(fivestarbar);
    const removeallfilters = screen.getByText(/Star filters currently applied:/i)
    expect(removeallfilters).toBeInTheDocument();
  });

  it('click on the applied rating breakdown second time will remove that star filter', async () => {
    render(<RatingBreakdown metadata={RRMetaMockData} selectedstars={[3, 5]} setSelectedstars={setSelectedstars} setReviewsrenderedcount={setReviewsrenderedcount} setAvgReviewRating={setAvgReviewRating}/>);
    const fivestarbar = screen.getByTestId('fivestar');
    const threestarbar = screen.getByTestId('threestar');
    fireEvent.click(fivestarbar);
    fireEvent.click(threestarbar);
    const removeallfilters = await screen.findByText(/3,5/i)
    expect(removeallfilters).toBeInTheDocument();
  });

});

describe('Ratings and Reviews: all elements should render on the page', () => {

  it('should show the number of reviews on the page', () => {
    render(<ReviewSort reviews = {RRMockData.results}/>);
    expect(screen.getByText(/18/i)).toBeInTheDocument();
  });

  it('Ratings and Reviews Sort Option should default to relevant', () => {
    render(<ReviewSort reviews = {RRMockData.results}/>);
    expect(screen.getByText(/relevant/i)).toBeInTheDocument();
  });

  it('More Reviews button should be on the page when first loaded', () => {
    render(<MoreReviews reviews = {RRMockData.results}/>);
    expect(screen.getByText(/MORE REVIEWS/i)).toBeInTheDocument();
  });

  it('Add a Review button should be on the page when first loaded', () => {
    render(<AddReview/>);
    expect(screen.getByText(/ADD A REVIEW/i)).toBeInTheDocument();
  });

  it('recommend percentage should be on the page when first loaded', () => {
    render(<RatingBreakdown metadata={RRMetaMockData} selectedstars={[]} setSelectedstars={setSelectedstars} setReviewsrenderedcount={setReviewsrenderedcount} setAvgReviewRating={setAvgReviewRating}/>);
    expect(screen.getByText(/% of reviews recommend this product/i)).toBeInTheDocument();
  });

  it('Number of product breakdown bars rendered on page will depend on each product', () => {
    render(<ProductBreakdown metadata={RRMetaMockData}/>);
    const productbreakdownbars = screen.getAllByTestId('productbreakdown');
    expect(productbreakdownbars.length).toBe(4);
  });

});

const setReviewmodalshow = jest.fn();
const setReviews = jest.fn();

describe('Ratings and Reviews: add Review Modal should have expected behaviors', () => {

  it('should have product name listed under title of this form', async () => {
    render(<ReviewModal product_id={RRMetaMockData.product_id} productName="Camo Onesie" productChars={RRMetaMockData.characteristics} setReviewmodalshow={setReviewmodalshow} setReviews={setReviews}/>);
    const productname = await screen.findByText(/Camo Onesie/i);
    expect(productname).toBeInTheDocument();
  });

  it('should render one radio form for each characteristic', async () => {
    render(<ReviewModal product_id={RRMetaMockData.product_id} productName="Camo Onesie" productChars={RRMetaMockData.characteristics} setReviewmodalshow={setReviewmodalshow} setReviews={setReviews}/>);
    const radioelements = await screen.findAllByTestId('reviewmodalradio');
    expect(radioelements.length).toBe(4);
  });

});