import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import RRMockData from './RRMockData.js';
import ReviewSort from '../components/ReviewSort.jsx';
import ReviewList from '../components/ReviewList.jsx';
import ReviewTile from '../components/ReviewTile.jsx';

it('Ratings and Reviews Sort Option should default to relevant', () => {
  render(<ReviewSort reviews = {ReviewList}/>);
  expect(screen.getByText(/relevant/i)).toBeInTheDocument();
});


describe('Ratings and Reviews each tile should have expected behavior', () => {

  it('user can only click once on each tile, the second click should be disabled', () => {
    render(<ReviewTile review={RRMockData.results[0]}/>);
    const helpfulLinkElement = screen.getByTestId('testHelpfulLink');
    fireEvent.click(helpfulLinkElement);
    expect(helpfulLinkElement).not.toBeInTheDocument();
  });

  // it('should show you\'ve reported this review when clicking report', () => {
  //   render(<ReviewTile review={RRMockData.results[0]}/>);
  //   const reportLinkElement = screen.getByTestId('reportLinkElement');
  //   fireEvent.click(reportLinkElement);
  //   const reportText = screen.getByTestId('reportText');
  //   expect('reported').toBeInTheDocument();
  // });

});