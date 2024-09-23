import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDataFetcher from "./useDataFetcher";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const useSelectedProfile = () => {
    const {currentUser} = useContext(CurrentUserContext)
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
            if (profileId === currentUser.pk.toString()) {
                setIsAuthUserProfile(true)
            }
        }
    }, [profileId, data, loading, currentUser])

    return {
        selectedProfile: profileId,
        isAuthUserProfile,
        profile: data,
        loading
    }
}

export default useSelectedProfile;
