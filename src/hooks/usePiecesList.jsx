import { useCallback } from 'react'

import Piece from '../components/Piece/Piece'
import useDataFetcher from './useDataFetcher'

const usePiecesList = (intitialParams = {}) => {
    // Using "useCallback" to prevent infinite loop of re-rendering
    const dataMapper = useCallback((responseData) => {
        return responseData.results.map((value) => Piece.fromJSON(value))
    }, [])

    // Using the custom hook that gets the data
    const {
        data,
        loading,
        params,
        setParams,
        pagination,
        handleNextPage,
        handlePrevPage,
    } = useDataFetcher('/pieces', intitialParams, dataMapper)

    return {
        pieces: data,
        loading,
        params,
        setParams,
        pagination,
        handleNextPage,
        handlePrevPage,
    }
}

export default usePiecesList
