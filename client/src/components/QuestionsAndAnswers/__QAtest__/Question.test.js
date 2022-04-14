import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Question from '../components/Question.jsx';
import QAMockData from '../__QAtest__/QAMockData.js';





describe('Individual question is rendered as expected', () => {


  it('should render question on page', () => {
    render(<Question question={QAMockData.questions.results[0]}/>);
    expect(screen.getByText('Helpful?')).toBeInTheDocument()
  });

  it('should have add answer option on page', () => {
    render(<Question question={QAMockData.questions.results[0]}/>);
    expect(screen.getByText('Add Answer')).toBeInTheDocument()
  });

  it('should increase the helpful count after click' , () => {
    render(<Question question={QAMockData.questions.results[0]}/>);
    const linkElement = screen.getByTestId('helpfulLink');
    fireEvent.click(linkElement);
    expect(linkElement).toBeInTheDocument('Yes (5)')
  });

  it('should open add answer model after click' , () => {
    render(<Question question={QAMockData.questions.results[0]}/>);
    const linkElement = screen.getByText('Add Answer');
    fireEvent.click(linkElement);
    expect(screen.getByText('Submit your Answer')).toBeInTheDocument()
  });

  it('should open add answer model after click and model should have close and submit button' , () => {
    render(<Question question={QAMockData.questions.results[0]}/>);
    const linkElement = screen.getByText('Add Answer');
    fireEvent.click(linkElement);
    expect(screen.getByText('Submit your Answer')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument()
  });

  it('add answer model should have upload pictures function' , () => {
    render(<Question question={QAMockData.questions.results[0]}/>);
    const linkElement = screen.getByText('Add Answer');
    fireEvent.click(linkElement);
    expect(screen.getByRole('button', {name: 'Upload Pictures'})).toBeInTheDocument()
  });

  it('should alert when email input is invalid' , () => {
    const alertMock = jest.spyOn(global,'alert').mockImplementation();
    render(<Question question={QAMockData.questions.results[0]}/>);
    const linkElement = screen.getByText('Add Answer');
    fireEvent.click(linkElement);
    const inputElement = screen.getByPlaceholderText('Example: jackson11@gmail.com')
    fireEvent.change(inputElement, {target: {value: '123@'}});
    fireEvent.click(screen.getByText('Submit'));
    expect(alertMock).toHaveBeenCalledTimes(1)
  });



})