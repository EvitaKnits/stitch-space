import { useCallback } from "react";
import useDataFetcher from "./useDataFetcher";
import { Follower } from "../components/Follower/Follower";

const useFollowersList = (profileId, initialParams = {}) => {
    // Using "useCallback" to prevent unnecessary re-renders
    const dataMapper = useCallback((responseData) => {
        return responseData.followers.map((value) =>
            Follower.fromJSON(value)
        );
    }, []);

    const {
        data,
        loading,
        params,
        setParams,
    } = useDataFetcher(`/profiles/${profileId}/following`, initialParams, dataMapper);

    return {
        followers: data,
        loading,
        params,
        setParams,
    };
};

export default useFollowersList;
