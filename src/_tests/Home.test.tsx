import React from 'react'
import {render, screen} from '@testing-library/react'
import {Home} from '../components/Home'

test('test Home', () => {
    render(<Home></Home>)

    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})
