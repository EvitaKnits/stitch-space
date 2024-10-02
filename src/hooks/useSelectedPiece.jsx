import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { CurrentUserContext } from '../contexts/CurrentUserContext'
import useDataFetcher from './useDataFetcher'

const useSelectedPiece = () => {
    const { currentUser } = useContext(CurrentUserContext)
    const [isAuthUserPiece, setIsAuthUserPiece] = useState(false)
    const { pieceId } = useParams()
    // Using "useCallback" to prevent infinite loop of re-rendering
    const dataMapper = useCallback((responseData) => {
        return responseData
    }, [])
    const { data, loading, setRefresh, error, } = useDataFetcher(
        `/pieces/${pieceId}`,
        {},
        dataMapper
    )

    useEffect(() => {
        if (!loading && data && currentUser) {
            if (currentUser.id === data.id.toString()) {
                setIsAuthUserPiece(true)
            }
        }
    }, [pieceId, data, loading, currentUser])

    return {
        selectedPiece: pieceId,
        isAuthUserPiece,
        piece: data,
        loading,
        error,
        setRefresh,
    }
}

export default useSelectedPiece
