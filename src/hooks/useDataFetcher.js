import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axiosClient from '../api/axiosDefaults'

// Custom hook to fetch data from the API
const useDataFetcher = (
    endpoint,
    initialParams = {},
    dataMapper = (data) => data
) => {
    const [data, setData] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [params, setParams] = useState(initialParams)
    const [pagination, setPagination] = useState({
        count: 0,
        nextPage: null,
        previousPage: null,
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetcher = async () => {
            // Sets initial loading and error states
            setLoading(true)
            setError(null)
            try {
                const response = await fetchData(endpoint, { ...params })
                // Maps data for reusability in other resources
                const mappedData = dataMapper(response)
                setData(mappedData)

                // Applies pagination where relevant
                if (response.count) {
                    setPagination({
                        count: response.count,
                        nextPage: response.nextPage,
                        previousPage:
                            response.nextPage === '3'
                                ? '1'
                                : response.previousPage,
                    })
                }
            } catch (err) {
                setError(err)
                setData(null)
                if (err.response?.status === 404) {
                    navigate('/404')
                }
            } finally {
                // Shows the loading is complete
                setLoading(false)
                setRefresh(false)
            }
        }
        fetcher()
    }, [endpoint, params, pagination.page, dataMapper, navigate, refresh])

    const handleNextPage = () => {
        setParams((prev) => ({ ...prev, page: pagination.nextPage }))
    }

    const handlePrevPage = () => {
        setParams((prev) => ({ ...prev, page: pagination.previousPage }))
    }

    return {
        data,
        loading,
        error,
        params,
        setParams,
        pagination,
        handleNextPage,
        handlePrevPage,
        setRefresh,
    }
}

const fetchData = async (endpoint, params = {}) => {
    try {
        const response = await axiosClient.get(endpoint, { params })
        return response.data
    } catch (error) {
        console.log(`Error fetching data from ${endpoint}:`, error)
        throw error
    }
}

export default useDataFetcher
