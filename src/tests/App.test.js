import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LightsOut from '../components/LightsOut';
import '@testing-library/jest-dom/extend-expect'

test('buttons are diasbled while bot is active', () => {
  const { getByTestId, getAllByRole } = render(<LightsOut />);
  fireEvent.click(getByTestId('bot'))
  getAllByRole('button').forEach((button) => {
    expect(button).toHaveAttribute('disabled');
  });
});

test('clicking top left toggles as expected', () => {
  const { getByTestId } = render(<LightsOut />);
  const topLeft = getByTestId('0-0');
  const below = getByTestId('0-1');
  const right = getByTestId('1-0');
  const topLeftClass = topLeft.className;
  const belowClass = below.className;
  const rightClass = right.className;
  fireEvent.click(topLeft);
  expect(topLeft.className).not.toEqual(topLeftClass);
  expect(below.className).not.toEqual(belowClass);
  expect(right.className).not.toEqual(rightClass);
});

test('clicking middle toggles as expected', () => {
  const { getByTestId } = render(<LightsOut />);
  const middle = getByTestId('2-2');
  const above = getByTestId('2-1');
  const below = getByTestId('2-3');
  const right = getByTestId('3-2');
  const left = getByTestId('1-2');
  const middleClass = middle.className;
  const belowClass = below.className;
  const aboveClass = above.className;
  const rightClass = right.className;
  const leftClass = left.className;
  fireEvent.click(middle);
  expect(middle.className).not.toEqual(middleClass);
  expect(above.className).not.toEqual(aboveClass);
  expect(below.className).not.toEqual(belowClass);
  expect(right.className).not.toEqual(rightClass);
  expect(left.className).not.toEqual(leftClass);
});

test('clicking bottom right toggles as expected', () => {
  const { getByTestId, queryByTestId } = render(<LightsOut />);
  const bottomRight = getByTestId('4-4');
  const above = getByTestId('4-3');
  const left = getByTestId('3-4');
  const bottomRightClass = bottomRight.className;
  const aboveClass = above.className;
  const leftClass = left.className;
  fireEvent.click(bottomRight);
  expect(bottomRight.className).not.toEqual(bottomRightClass);
  expect(above.className).not.toEqual(aboveClass);
  expect(left.className).not.toEqual(leftClass);
  expect(queryByTestId('4-5')).toBeNull();
  expect(queryByTestId('5-4')).toBeNull();
});
