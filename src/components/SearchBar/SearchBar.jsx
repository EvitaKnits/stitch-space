import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

// This component updates the "search" parameter on the Pieces requests
const SearchBar = ({ setParams }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // A "debounce" that updates the search parameters 500ms after last change
    useEffect(() => {
        // Named timeout so a new one isn't created each time
        const timeoutId = setTimeout(() => {
            setParams((prevData) => {
                const newData = {...prevData}
                delete newData["search"]
                if (inputValue !== '') newData.search = inputValue
                return newData;
              });
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [setParams, inputValue])

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