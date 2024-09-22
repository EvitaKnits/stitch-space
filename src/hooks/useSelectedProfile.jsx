import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDataFetcher from "./useDataFetcher";

const useSelectedProfile = () => {
    const [isAuthUserProfile, setIsAuthUserProfile] = useState(false)
    const { profileId } = useParams();
    // Using "useCallback" to prevent infinite loop of re-rendering
    const dataMapper = useCallback((responseData) => {
        return responseData
    }, []);
    const {
        data,
        loading,
    } = useDataFetcher(`/profile/${profileId}`, {}, dataMapper);

    useEffect(() => {
        if (!loading && data) {
            if (profileId === data.id.toString()) {
                setIsAuthUserProfile(true)
            }
        }
    }, [profileId, data, loading])

    return {
        selectedProfile: profileId,
        isAuthUserProfile,
        profile: data,
        loading
    }
}

export default useSelectedProfile;
