import React from 'react';
import '@testing-library/jest-dom';
import ProductDetail from '../components/ProductDetail';
import { render, screen } from '@testing-library/react';
import productExample from '../../../__mocks__/overviewDataExample.js';
import stylesExample from '../../../__mocks__/overviewStylesExample.js';


let example = [];
example.push(productExample[0]);
example.push(stylesExample);

test('should render name of product', async () => {
  render(<ProductDetail data={example} stylesIndex={0} />);
  const productName = screen.getByText(/Camo Onesie/i);
  expect(productName).toBeInTheDocument();
});

it('should render name of product as a heading', async () => {
  render(<ProductDetail data={example} stylesIndex={0} />);
  const productName = screen.getByRole(heading);
  expect(productName).toBeInTheDocument();
});

it('should show discounted price if product is on sale', async () => {
  // render(<ProductDetail data="Camo Onesie" />);
  // const productName = screen.getByRole(heading);
  // expect(productName).toBeInTheDocument();
});

it('should render product price dynamically', async () => {
  // render(<ProductDetail data="Camo Onesie" />);
  // const productName = screen.getByRole(heading);
  // expect(productName).toBeInTheDocument();
});