import { useCallback } from 'react'

import { Follower } from '../components/Follower/Follower'
import useDataFetcher from './useDataFetcher'

const useFollowingList = (profileId, initialParams = {}) => {
    // Using "useCallback" to prevent unnecessary re-renders
    const dataMapper = useCallback((responseData) => {
        return responseData.results.map((value) =>
            Follower.fromFollowingJSON(value)
        )
    }, [])

    const {
        data,
        loading,
        params,
        setParams,
        pagination,
        handleNextPage,
        handlePrevPage,
    } = useDataFetcher(
        `/profile/${profileId}/following`,
        initialParams,
        dataMapper
    )

    return {
        followers: data,
        loading,
        params,
        setParams,
        pagination,
        handleNextPage,
        handlePrevPage,
    }
}

export default useFollowingList
