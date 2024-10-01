import { render, waitFor } from '@testing-library/react'
import { act } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import axiosClient from '../../api/axiosDefaults'
import useDataFetcher from '../useDataFetcher'

// Stops real calls to the API for testing
vi.mock('../../api/axiosDefaults')

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const mod = await vi.importActual(
        "react-router-dom"
    );
    return {
        ...mod,
        useNavigate: () => mockedUseNavigate,
    };
});

// Some mocked responses
const mockResponseData = {
    page1: {
        pieces: [
            {
                id: '27',
                title: 'Trees in Autumn',
                image: 'http://example.com/dir1/xyz123.png',
                userId: '10',
                userName: 'Tim Tam',
                artType: 'embroidery',
                rating: 3.8,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ],
        pagination: {
            total: 2,
            page: 1,
            pageSize: 1,
            totalPages: 2,
        },
    },
    updatedPage1: {
        pieces: [
            {
                id: '27',
                title: 'Trees in Autumn',
                image: 'http://example.com/dir1/xyz123.png',
                userId: '10',
                userName: 'Tim Tam',
                artType: 'embroidery',
                rating: 2.1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ],
        pagination: {
            total: 2,
            page: 1,
            pageSize: 1,
            totalPages: 2,
        },
    },
    page2: {
        pieces: [
            {
                id: '2',
                title: 'Ocean Waves',
                image: 'http://example.com/dir1/xyz123.png',
                userId: '10',
                userName: 'Tim Tam',
                artType: 'embroidery',
                rating: 3.8,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ],
        pagination: {
            total: 2,
            page: 2,
            pageSize: 1,
            totalPages: 2,
        },
    },
}

const dataMapperFunc = (responseData) => {
    return responseData.pieces.map((value) => value)
}

describe('useDataFetcher Hook', () => {
    afterEach(() => {
        vi.clearAllMocks()
    })

    // A test component that uses this hook
    const TestComponent = ({
        endpoint,
        initialParams = {},
        dataMapper = dataMapperFunc,
    }) => {
        const {
            data,
            loading,
            error,
            pagination,
            handlePrevPage,
            handleNextPage,
            setParams,
        } = useDataFetcher(endpoint, initialParams, dataMapper)

        return (
            <div>
                {loading && <div data-testid="loading">Loading...</div>}
                {error && <div data-testid="error">Error: {error.message}</div>}
                {data && <div data-testid="data">{JSON.stringify(data)}</div>}
                <div data-testid="pagination">Page: {pagination.page}</div>
                <button
                    data-testid="change-params"
                    onClick={() => setParams({ search: 'updated' })}
                >
                    Change Params
                </button>

                {handleNextPage && (
                    <button data-testid="next-page" onClick={handleNextPage}>
                        Next Page
                    </button>
                )}
                {handlePrevPage && (
                    <button data-testid="prev-page" onClick={handlePrevPage}>
                        Previous Page
                    </button>
                )}
            </div>
        )
    }

    it('should fetch data successfully', async () => {
        // Mocks the response
        axiosClient.get.mockResolvedValue({ data: mockResponseData.page1 })

        // Renders the test component
        const { getByTestId, queryByTestId } = render(<TestComponent />)

        // Waits for loading to finish
        await waitFor(() =>
            expect(queryByTestId('loading')).not.toBeInTheDocument()
        )

        // Confirms the right data is present
        expect(queryByTestId('error')).not.toBeInTheDocument()
        expect(getByTestId('data')).toHaveTextContent(
            JSON.stringify(mockResponseData.page1.pieces)
        )
    })

    it('should handle fetch errors', async () => {
        const mockError = new Error('Network Error')

        // Mocks an error from the API
        axiosClient.get.mockRejectedValue(mockError)

        const { getByTestId, queryByTestId } = render(<TestComponent />)

        // Waits for loading to finish
        await waitFor(() =>
            expect(queryByTestId('loading')).not.toBeInTheDocument()
        )

        // Confirms an error is on the page
        expect(getByTestId('error')).toHaveTextContent('Error: Network Error')

        // Checks there is no data
        expect(queryByTestId('data')).not.toBeInTheDocument()
    })

    it('should update when params change', async () => {
        // Mocks two responses to pretend there's been an update
        axiosClient.get
            .mockResolvedValueOnce({ data: mockResponseData.page1 })
            .mockResolvedValueOnce({ data: mockResponseData.updatedPage1 })

        const { getByTestId, queryByTestId } = render(<TestComponent />)

        // Waits for initial data to be loaded
        await waitFor(() =>
            expect(queryByTestId('loading')).not.toBeInTheDocument()
        )

        expect(getByTestId('data')).toHaveTextContent(
            JSON.stringify(mockResponseData.page1.pieces)
        )

        // Trigger a parameter change
        await act(async () => getByTestId('change-params').click())

        // Waits for updated data after parameters change
        await waitFor(() =>
            expect(getByTestId('data')).toHaveTextContent(
                JSON.stringify(mockResponseData.updatedPage1.pieces)
            )
        )
    })
})
