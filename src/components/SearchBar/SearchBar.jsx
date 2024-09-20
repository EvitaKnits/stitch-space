import { useEffect, useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { PieceDataContext } from '../../contexts/PieceDataContext';

// This component updates the "search" parameter on the Pieces requests
const SearchBar = () => {
    const { setParams } = useContext(PieceDataContext);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // A "debounce" that updates the search parameters 500ms after last change
    useEffect(() => {
        // Named timeout so a new one isn't created each time
        const timeoutId = setTimeout(() => {
            setParams((prevParams) => ({
                ...prevParams,
                search: inputValue,
            }));
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [inputValue, setParams]);

    return (
        <Form>
            <Form.Control
                type="text"
                placeholder="Search"
                onChange={handleInputChange}
            />
        </Form>
    );
};

export default SearchBar;