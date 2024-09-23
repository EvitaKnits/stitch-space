import { useCallback } from "react";
import useDataFetcher from "./useDataFetcher";
import Piece from "../components/Piece/Piece";

const usePiecesList = (intitialParams = {}) => {
    // Using "useCallback" to prevent infinite loop of re-rendering
    const dataMapper = useCallback((responseData) => {
        return responseData.pieces.map((value) =>
            Piece.fromJSON(value)
        );
    }, []);

    // Using the custom hook that gets the data
    const {
        data,
        loading,
        params,
        setParams,
    } = useDataFetcher("/pieces", intitialParams, dataMapper);

    return {
        pieces: data,
        loading,
        params,
        setParams
    }
}

export default usePiecesList;