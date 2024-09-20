import { useState, useEffect } from "react";
import axiosClient from "../api/axiosDefaults";
import { generateMockPieces } from "../utils/developmentData";

// Custom hook to fetch data from the API
const useDataFetcher = (endpoint, initialParams = {}, dataMapper = (data) => data) => {
    const [data, setData] = useState(null);
    const [params, setParams] = useState(initialParams);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
        totalPages: 0,
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetcher = async () => {
            // Sets initial loading and error states
            setLoading(true);
            setError(null);
            try {
                const response = await fetchData(endpoint, { ...params, page: pagination.page });
                // Maps data for reusability in other resources
                const mappedData = dataMapper(response);
                setData(mappedData);

                // Applies pagination where relevant
                if (response.pagination) {
                    setPagination(response.pagination);
                }
            } catch (err) {
                setError(err);
            } finally {
                // Shows the loading is complete
                setLoading(false);
            }
        };
        fetcher();
    }, [endpoint, params, pagination.page, dataMapper]);

    const handleNextPage = () => {
        setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    };

    const handlePrevPage = () => {
        setPagination((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }));
    };

    return {
        data,
        loading,
        error,
        setParams,
        pagination,
        handleNextPage,
        handlePrevPage,
    };
};

const fetchData = async (endpoint, params = {}) => {
    try {
        let responseData;
        // Generate mock data for development and get 'real' data for testing
        if (import.meta.env.DEV && !import.meta.env.VITE_TEST_VAR) {
            responseData = generateMockPieces(50);
        } else {
            const response = await axiosClient.get(endpoint, { params });
            responseData = response.data;
        }

        return responseData
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
};

export default useDataFetcher;