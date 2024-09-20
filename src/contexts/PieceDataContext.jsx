import { createContext, useCallback } from "react";
import useDataFetcher from "../hooks/useDataFetcher";
import Piece from "../components/Piece/Piece";

export const PieceDataContext = createContext();

export const PieceDataProvider = ({ children }) => {
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
        error,
        setParams,
        pagination,
        handleNextPage,
    } = useDataFetcher("/pieces/", {}, dataMapper);

    return (
        <PieceDataContext.Provider
            value={{
                data,
                loading,
                error,
                setParams,
                handleNextPage,
                pagination,
            }}
        >
            {/* Provides context to any children in the provider */}
            {children}
        </PieceDataContext.Provider>
    );
};