import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import QuestionAndAnswers from '../QuestionAndAnswers.jsx';
import QAMockData from './QAMockData';
import '../../../__mocks__/QAaxios';



describe('Question and Answer Widget is rendered as expected', () => {

  it('should have Q&A title on page', () => {
    render(<QuestionAndAnswers product_id={37311}/>);
    expect(screen.getByText('QUESTIONS & ANSWERS')).toBeInTheDocument()
  });

  it('should have add question btn on page', () => {
    render(<QuestionAndAnswers product_id={37311}/>);
    expect(screen.getByRole('button', {name: 'ADD A QUESTION'})).toBeInTheDocument()
  });

  //mock api

  it('should have add question btn on page', async () => {
    render(<QuestionAndAnswers product_id={37311}/>);
    expect(await screen.findByRole('button', {name: 'MORE ANSWERED QUESTIONS'})).toNotBeInTheDocument()
  });






})