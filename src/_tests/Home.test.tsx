import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import {MockedProvider, MockedResponse} from '@apollo/client/testing'
import {Home} from '../components/Home'
import {BrowserRouter as Router} from "react-router-dom";

const mocks: readonly MockedResponse<Record<string, any>>[] | undefined = []

beforeEach(() => {
    render(
        <Router>
            <MockedProvider mocks={mocks} addTypename={false}>
                <Home/>
            </MockedProvider>
        </Router>
    )
})

test('Test rendering "Shorten url" button', () => {
    const buttonElement = screen.getByText(/SHORTEN URL/i)
    expect(buttonElement).toBeInTheDocument()
})

test('Test error message on empty url', () => {
    const buttonElement = screen.getByText(/SHORTEN URL/i)
    buttonElement.click()

    const messageElement = screen.getByText(/Please enter a valid url/i)
    expect(messageElement).toBeInTheDocument()
})

test('Test error message on invalid url', () => {
    const inputElement = screen.getByTestId("long-url-input")
    fireEvent.change(inputElement, {target: {value: "/test.com"}})

    const buttonElement = screen.getByText(/SHORTEN URL/i)
    buttonElement.click()

    const messageElement = screen.getByText(/Please enter a valid url/i)
    expect(messageElement).toBeInTheDocument()
})