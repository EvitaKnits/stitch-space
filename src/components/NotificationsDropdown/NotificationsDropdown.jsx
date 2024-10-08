import {
    faBell,
    faComment,
    faEye,
    faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { NavItem } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'

import axiosClient from '../../api/axiosDefaults'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import styles from '../NavBar/NavBar.module.css'

const NotificationsDropdown = () => {
    const { loading, currentUser } = useContext(CurrentUserContext)
    const [notifications, setNotifications] = useState([])
    const [lastVisited, setlastVisited] = useState(null)

    // Fetch notifications once the profile has loaded
    useEffect(() => {
        if (!loading && currentUser) {
            try {
                const fetchNotifications = async () => {
                    try {
                        const response = await axiosClient.get(
                            `profile/${currentUser.pk}/notifications/`,
                            { params: { page_size: 200 } }
                        )
                        setNotifications(response.data?.results || [])
                        // Get the last visited date from the first entry in the response data
                        if (lastVisited === null)
                            setlastVisited(
                                new Date(
                                    response.data?.results[0]?.recipient?.lastVisitedNotifications
                                )
                            )
                    } catch (err) {
                        console.log(err.response?.data)
                    }
                }
                fetchNotifications()
            } catch (error) {
                // Handle errors gracefully
                console.error('Error fetching comments (placeholder):', error)
            }
        }
    }, [loading, currentUser, lastVisited])

    const updateLastViewedTime = () => {
        const updateProfile = async () => {
            try {
                await axiosClient.patch(`profile/${currentUser.pk}/`, {
                    // Use Date format that matches Django's expected format
                    lastVisitedNotifications: new Date().toISOString(),
                })
            } catch (err) {
                console.log(err.response?.data)
            }
        }
        updateProfile()
    }

    const renderNotificationText = ({ interactionType, actor, piece }) => {
        // Maps the type of interaction to specific text and icon
        switch (interactionType) {
            case 'follow':
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faEye}
                            className="icons me-2"
                        />
                        {`${actor.firstName} ${actor.lastName} started following you`}
                    </>
                )
            case 'rating':
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faStar}
                            className="icons me-2"
                        />
                        {`${actor.firstName} ${actor.lastName} rated ${piece.title}`}
                    </>
                )
            case 'comment':
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faComment}
                            className="icons me-2"
                        />
                        {`${actor.firstName} ${actor.lastName} commented on ${piece.title}`}
                    </>
                )
            default:
                return 'Unknown notification type'
        }
    }

    return (
        <Dropdown
            as={NavItem}
            className="m-1"
            onToggle={updateLastViewedTime}
            autoClose={true}
        >
            <Dropdown.Toggle className={styles.NavDropdownButton} size="lg" aria-label='notification-dropdown'>
                <FontAwesomeIcon
                    icon={faBell}
                    className="icons"
                />
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.NotificationsMenu}>
                {notifications.length > 0 ? (
                    notifications.map((notification) => {
                        const notificationCreated = new Date(
                            notification.createdAt
                        )
                        // Link to the relevant profile or piece
                        const notificationUrl = notification.piece
                            ? `/profile/${notification.recipient.id}/piece/${notification.piece.id}/`
                            : `/profile/${notification.actor.id}/`

                        return (
                            <Dropdown.Item
                                key={notification.id}
                                className={styles.NotificationItem + ' p-3'}
                                href={notificationUrl}
                                // Differentiate between read and unread notifications
                                style={{
                                    color:
                                        notificationCreated < lastVisited
                                            ? 'grey'
                                            : 'black',
                                }}
                            >
                                {renderNotificationText(notification)}
                            </Dropdown.Item>
                        )
                    })
                ) : (
                    <Dropdown.Item className={styles.NotificationItem}>
                        No notifications
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default NotificationsDropdown
