import { useCallback } from "react";
import useDataFetcher from "./useDataFetcher";
import { Follower } from "../components/Follower/Follower";

const useFollowingList = (profileId, initialParams = {}) => {
    // Using "useCallback" to prevent unnecessary re-renders
    const dataMapper = useCallback((responseData) => {
        return responseData.results.map((value) =>
            Follower.fromFollowingJSON(value)
        );
    }, []);

    const {
        data,
        loading,
        params,
        setParams,
    } = useDataFetcher(`/profile/${profileId}/following`, initialParams, dataMapper);

    return {
        followers: data,
        loading,
        params,
        setParams,
    };
};

export default useFollowingList;
