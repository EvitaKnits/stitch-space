import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AppHeader from './components/AppHeader/AppHeader'
import { CurrentUserProvider } from './contexts/CurrentUserContext'
import Explore from './pages/Explore/Explore'
import Feed from './pages/Feed/Feed'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'
import FollowersView from './pages/Profile/FollowersView'
import FollowingView from './pages/Profile/FollowingView'
import PiecesCreate from './pages/Profile/PiecesCreate'
import DetailView from './pages/Profile/PiecesDetailView'
import ListView from './pages/Profile/PiecesListView'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'

function App() {
    return (
        <div>
            <Router>
                {/* This Provider allows components on all pages to access the authenticated user information */}
                <CurrentUserProvider>
                    <Routes>
                        {/* This Route wraps all the other Routes as the main navigation */}
                        <Route element={<AppHeader />}>
                            <Route path="/" element={<Home />} />
                            <Route path="feed" element={<Feed />} />
                            <Route path="explore" element={<Explore />} />
                            <Route path="login" element={<Login />} />
                            {/* The Profile route wraps everything specific to a Profile or "Stitch Space" */}
                            <Route
                                path="profile/:profileId"
                                element={<Profile />}
                            >
                                <Route path="" element={<ListView />} />
                                <Route
                                    path="piece/:pieceId"
                                    element={<DetailView />}
                                />
                                <Route
                                    path="piece/new"
                                    element={<PiecesCreate />}
                                />
                                <Route
                                    path="followers"
                                    element={<FollowersView />}
                                />
                                <Route
                                    path="following"
                                    element={<FollowingView />}
                                />
                            </Route>
                            <Route path="register" element={<Register />} />
                            {/* 404 route for unmatched paths */}
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </CurrentUserProvider>
            </Router>
        </div>
    )
}

export default App
