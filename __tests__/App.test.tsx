/* eslint-disable testing-library/render-result-naming-convention */
/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { TextInput } from 'react-native';


it('renders correctly', () => {
  renderer.create(<App />);
});

describe('Todo Component', () => {
  
  it("should add a new task", async () => {
    const appRender = render(<App />);
    const input = appRender.getByTestId('taskInput');
    fireEvent.changeText(input, 'myTask');
    fireEvent.press(appRender.getByTestId('addTaskBtn'));
    const taskText = await waitFor(() => appRender.getByTestId('taskText'));
    const textInput = taskText.findByType(TextInput);
    expect(textInput.props.value).toBe('myTask');
  });
  
  

  it("should show error message for empty task", () => {
    const appRender = render(<App />);
    const input = appRender.getByTestId('taskInput');
    fireEvent.changeText(input, '');
    fireEvent.press(appRender.getByTestId('addTaskBtn'));
    expect(appRender.getByText('Task cannot be empty.')).toBeTruthy();
  });


  it("should delete a task", () => {
    const appRender = render(<App />);
    const input = appRender.getByTestId('taskInput');
    fireEvent.changeText(input, 'New Task');
    fireEvent.press(appRender.getByTestId('addTaskBtn'));
    fireEvent.press(appRender.getByTestId('dltTaskBtn'));
    expect(appRender.queryByText('New Task')).toBeNull();
  });
  

  it("should edit a task", async()=>{
    const appRender = render(<App />);
    const input = appRender.getByTestId('taskInput');
    fireEvent.changeText(input, 'myTask');
    fireEvent.press(appRender.getByTestId('addTaskBtn'));
    const taskText = await waitFor(() => appRender.getByTestId('taskText'));
    const textInput = taskText.findByType(TextInput);
    fireEvent.changeText(textInput, 'editedTask');
    expect(textInput.props.value).toBe('editedTask');
  })

  it('input field is defined', () => {
    const appRender = render(<App />);
    const input = appRender.getByTestId('taskInput');
    expect(input).toBeDefined();
  });

});
