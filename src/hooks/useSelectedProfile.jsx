import { useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import useDataFetcher from "./useDataFetcher";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const useSelectedProfile = () => {
    const {currentUser} = useContext(CurrentUserContext)
    const { profileId } = useParams();

    // Using "useCallback" to prevent infinite loop of re-rendering
    const dataMapper = useCallback((responseData) => {
        return responseData
    }, []);

    const {
        data,
        loading,
    } = useDataFetcher(`/profile/${profileId}`, {}, dataMapper);

    const checkIsAuthUser = useCallback(() => {
        if (!loading && data) {
            return profileId === currentUser.pk.toString()
        }
    }, [profileId, data, loading, currentUser])

    return {
        selectedProfile: profileId,
        isAuthUserProfile: checkIsAuthUser(),
        profile: data,
        loading
    }
}

export default useSelectedProfile;
