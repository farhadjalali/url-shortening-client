import React from 'react'
import {render, screen} from '@testing-library/react'
import ShortenUrl from '../components/ShortenUrl'
import {AbTestVariant} from "../types"

test('test ShortenUrl', () => {
    render(<ShortenUrl longUrl="http://sample.com" abTestVariant={AbTestVariant.A} gotUrl={(err, link) => {
        console.log("HI")
    }}/>)

    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})
