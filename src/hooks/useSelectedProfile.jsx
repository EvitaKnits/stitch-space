import { useCallback, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { CurrentUserContext } from '../contexts/CurrentUserContext'
import useDataFetcher from './useDataFetcher'

const useSelectedProfile = () => {
    const userContext = useContext(CurrentUserContext)
    const { profileId } = useParams()

    // Using "useCallback" to prevent infinite loop of re-rendering
    const dataMapper = useCallback((responseData) => {
        return responseData
    }, [])

    const { data, loading, error, setRefresh } = useDataFetcher(
        profileId?`/profile/${profileId}`:null,
        {},
        dataMapper
    )

    // Determines if the logged in user has selected their own piece
    const checkIsAuthUser = useCallback(() => {
        if (!userContext.loading && userContext.currentUser) {
            return profileId === userContext.currentUser.pk.toString()
        }
    }, [profileId, userContext.currentUser, userContext.loading])

    return {
        selectedProfile: profileId,
        isAuthUserProfile: checkIsAuthUser(),
        profile: data,
        loading,
        error,
        setRefresh,
    }
}

export default useSelectedProfile
