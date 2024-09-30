import { useCallback } from 'react'

import Piece, { MasonryWall } from '../../components/Piece/Piece'
import useDataFetcher from '../../hooks/useDataFetcher'

const Feed = () => {
    // Providing the custom context for Pieces to the context hook
    const dataMapper = useCallback((responseData) => {
        return responseData.results.map((value) => Piece.fromJSON(value))
    }, [])

    // Using the custom hook that gets the data
    const { data, loading, ...rest } = useDataFetcher(
        '/pieces/feed/',
        {},
        dataMapper
    )

    return (
        <div className="p-3">
            {!loading && data ? <MasonryWall pieces={data} {...rest} /> : ''}
        </div>
    )
}

export default Feed
