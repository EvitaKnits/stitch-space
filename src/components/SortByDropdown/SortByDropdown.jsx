import { faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'

// This component  updates the "sortBy" parameter on the Pieces requests
const SortByDropdown = ({ setParams }) => {
    const [selection, setSelection] = useState('')

    const handleSelect = (eventKey) => {
        // Stores selection to enable highlighting of selected item in the dropdown
        setSelection(eventKey)
        setParams((prevData) => {
            const newData = { ...prevData }
            delete newData['ordering']
            if (eventKey !== '') newData.ordering = eventKey
            return newData
        })
    }

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                align={{ lg: 'end' }}
            >
                <FontAwesomeIcon icon={faArrowUpWideShort} className="me-2" />
                Sort
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item active={selection === 'title'} eventKey="title">
                    Piece Name A-Z
                </Dropdown.Item>
                <Dropdown.Item
                    active={selection === '-title'}
                    eventKey="-title"
                >
                    Piece Name Z-A
                </Dropdown.Item>
                <Dropdown.Item
                    active={selection === 'rating'}
                    eventKey="rating"
                >
                    Highest Rated
                </Dropdown.Item>
                <Dropdown.Item
                    active={selection === '-rating'}
                    eventKey="-rating"
                >
                    Lowest Rated
                </Dropdown.Item>
                <Dropdown.Item
                    active={selection === 'comments'}
                    eventKey="comments"
                >
                    Most Discussed
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default SortByDropdown
