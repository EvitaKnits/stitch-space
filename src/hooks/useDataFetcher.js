import { useState, useEffect } from "react";
import axiosClient from "../api/axiosDefaults";
import { generateMockPieces } from "../utils/developmentData";
import { useNavigate } from "react-router-dom";

// Custom hook to fetch data from the API
const useDataFetcher = (endpoint, initialParams = {}, dataMapper = (data) => data) => {
    const [data, setData] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [params, setParams] = useState(initialParams);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
        totalPages: 0,
        total: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

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
                setData(null)
                if (err.response?.status === 404) {
                    navigate('/404')
                }
            } finally {
                // Shows the loading is complete
                setLoading(false);
                setRefresh(false)
            }
        };
        fetcher();
    }, [endpoint, params, pagination.page, dataMapper, navigate, refresh]);

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
        setRefresh,
    };
};

const fetchData = async (endpoint, params = {}) => {
    try {
        let responseData;
        // Generate mock data for development and get 'real' data for testing
        if (!import.meta.env.DEV && !import.meta.env.VITE_TEST_VAR) {
            if (endpoint.includes('/followers')) {
                responseData = {
                    "followers": [
                        {
                            "id": 3,
                            "followerProfile": {
                                "id": 3,
                                "firstName": "John",
                                "lastName": "Doe",
                                "username": "johndoe",
                                "image": "https://picsum.photos/seed/303/300/300",
                                "email": "john.doe@example.com",
                                "biography": "Passionate about knitting and crochet.",
                                "lastVisitedNotifications": null,
                                "createdAt": "2024-09-19T12:47:56.267675Z",
                                "updatedAt": "2024-09-19T12:47:56.267675Z"
                            },
                            "createdAt": "2024-09-20T11:24:08.958484Z"
                        },
                        {
                            "id": 4,
                            "followerProfile": {
                                "id": 4,
                                "firstName": "Jane",
                                "lastName": "Smith",
                                "username": "janesmith",
                                "image": "https://picsum.photos/seed/304/300/300",
                                "email": "jane.smith@example.com",
                                "biography": "Lover of embroidery and weaving.",
                                "lastVisitedNotifications": null,
                                "createdAt": "2024-09-19T12:50:00.123456Z",
                                "updatedAt": "2024-09-19T12:50:00.123456Z"
                            },
                            "createdAt": "2024-09-21T09:45:12.789012Z"
                        }
                    ]
                }
            }
            if (endpoint === '/pieces') responseData = generateMockPieces(50);
            if (endpoint === '/pieces/1' || endpoint === '/pieces/2') {
                const piece = generateMockPieces(1).pieces[0]
                piece.userId = 1
                responseData = piece
            }
            if (endpoint === '/pieces/3' || endpoint === '/pieces/4') {
                const piece = generateMockPieces(1).pieces[0]
                piece.userId = 2
                responseData = piece
            }
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
        console.log(`Error fetching data from ${endpoint}:`, error);
    }
};

export default useDataFetcher;