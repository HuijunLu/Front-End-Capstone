import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Answer from '../components/Answer.jsx';

const answerMock = {
  id: 68,
  body: "We are selling it here without any markup from the middleman!",
  date: "2018-08-18T00:00:00.000Z",
  answerer_name: "Seller",
  helpfulness: 4,
  photos: []
}


describe('Individual answer is rendered as expected', () => {

  it('should render answers on page', () => {
    render(<Answer answer={answerMock}/>);
    expect(screen.getByText('A:')).toBeInTheDocument()
  });

  it('should have report option on page', () => {
    render(<Answer answer={answerMock}/>);
    expect(screen.getByText('Report')).toBeInTheDocument()
  });

  it('should change the report to static after click' , () => {
    render(<Answer answer={answerMock}/>);
    const linkElement = screen.getByText('Report');
    fireEvent.click(linkElement);
    expect(linkElement).toBeInTheDocument('Reported!');
  });

  it('should increase the helpful count after click' , () => {
    render(<Answer answer={answerMock}/>);
    const linkElement = screen.getByText('Helpful?');
    fireEvent.click(linkElement);
    expect(linkElement).toBeInTheDocument('Yes (5)')
  });


})