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
    const [loading, setLoading] = useState(true);
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
        params,
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
            if (endpoint === '/pieces') responseData = generateMockPieces(50);
            if (endpoint === '/pieces/1' || endpoint === '/pieces/2'){ 
                const piece = generateMockPieces(1).pieces[0]
                piece.userId = 1
                responseData = piece}
            if (endpoint === '/pieces/3' || endpoint === '/pieces/4'){ 
                const piece = generateMockPieces(1).pieces[0]
                piece.userId = 2
                responseData = piece}
            if (endpoint.includes('/profile/1')) responseData = {
                    "id": 1,
                    "firstName": "Evita",
                    "lastName": "Orrock",
                    "email": "evita.orrock@gmail.com",
                    "biography": "Bio Text for Evita",
                    "image": "https://picsum.photos/seed/400/300/300",
                    "lastVisitedNotifications": Date.now(),
                    "createdAt": "19 Sep 2024",
                    "updatedAt": "19 Sep 2024"
                }
                if (endpoint.includes('/profile/2')) responseData = {
                    "id": 2,
                    "firstName": "Alice",
                    "lastName": "Wunderland",
                    "email": "alice@gmail.com",
                    "biography": "Bio Text for Alice",
                    "image": "https://picsum.photos/seed/420/300/300",
                    "lastVisitedNotifications": Date.now(),
                    "createdAt": "20 Sep 2024",
                    "updatedAt": "30 Sep 2024"
                }
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