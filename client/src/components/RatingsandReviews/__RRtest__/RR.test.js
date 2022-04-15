import { render, screen, fireEvent } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import '@testing-library/jest-dom';
import axios from 'axios';
import RRMockData from './RRMockData.js';
import App from '../../App.jsx';
import RatingsReviews from '../RatingsReviews.jsx';
import ReviewSort from '../components/ReviewSort.jsx';
import ReviewList from '../components/ReviewList.jsx';
import ReviewTile from '../components/ReviewTile.jsx';
import MoreReviews from '../components/MoreReviews.jsx';

// jest.mock('axios');

it('Ratings and Reviews Sort Option should default to relevant', () => {
  render(<ReviewSort reviews = {ReviewList}/>);
  expect(screen.getByText(/relevant/i)).toBeInTheDocument();
});


describe('Ratings and Reviews each tile should have expected behavior', () => {

  // it('user can only click once on each tile, the second click should be disabled', () => {
  //   render(<ReviewTile review={RRMockData.results[0]}/>);
  //   const helpfulLinkElement = screen.getByTestId('testHelpfulLink');
  //   fireEvent.click(helpfulLinkElement);
  //   console.debug()
  //   expect(helpfulLinkElement).not.toBeInTheDocument();
  // });

  // it('should show you\'ve reported this review when clicking report', async () => {
  //   render(<ReviewTile review={RRMockData.results[0]}/>);
  //   const reportLinkElement = await screen.findByTestId('reportLinkElement');
  //   fireEvent.click(reportLinkElement);
  //   // const reportText = await screen.findByTestId('reportText');
  //   expect(reportLinkElement).not.toBeInTheDocument();
  // });

});



const mockedSetReviewsRenderCount = jest.fn();

describe('Ratings and Reviews list behaviors', () => {

  it('only 2 review tiles show upon opening of website', async () => {
    render(<ReviewList reviews={RRMockData.results} reviewsrenderedcount={2} selectedstars={[]}/>);
    const reviewTileElements = await screen.findAllByTestId('reviewtile');
    expect(reviewTileElements.length).toBe(2);
  });

  it('click more reviews button should set reviewsrendered counts', async () => {
    await render(<MoreReviews reviews={RRMockData.results} setReviewsrenderedcount={ mockedSetReviewsRenderCount}/>);
    const moreReviewButton = screen.getByTestId('moreReviews');
    fireEvent.click(moreReviewButton);
    expect(mockedSetReviewsRenderCount).toBeCalled();
  });



});