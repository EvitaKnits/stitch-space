import { useCallback } from "react";
import useDataFetcher from "./useDataFetcher";
import { Follower } from "../components/Follower/Follower";

const useFollowersList = (profileId, initialParams = {}) => {
    // Using "useCallback" to prevent unnecessary re-renders
    const dataMapper = useCallback((responseData) => {
        return responseData.results.map((value) =>
            Follower.fromFollowerJSON(value)
        );
    }, []);

    const {
        data,
        loading,
        params,
        setParams,
        pagination,
        handleNextPage,
        handlePrevPage,
    } = useDataFetcher(`/profile/${profileId}/followers`, initialParams, dataMapper);

    return {
        followers: data,
        loading,
        params,
        setParams,
        pagination,
        handleNextPage,
        handlePrevPage,
    };
};

export default useFollowersList;
