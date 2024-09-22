import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Feed from './pages/Feed/Feed';
import Explore from './pages/Explore/Explore';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UserDetails from './pages/UserDetails/UserDetails';
import NotFound from './pages/NotFound/NotFound';
import AppHeader from './components/AppHeader/AppHeader';
import { CurrentUserProvider } from './contexts/CurrentUserContext'
import Profile from './pages/Profile/Profile';
import DetailView from './pages/Profile/PieceDetailView';
import ListView from './pages/Profile/PieceListView';

function App() {
    return (
        <div>
            {/* This Provider allows components on all pages to access the authenticated user information */}
            <CurrentUserProvider >
                <Router>
                    <Routes>
                        {/* This Route wraps all the other Routes as the main navigation */}
                        <Route element={<AppHeader />}>
                            <Route path="/" element={<Home />} />
                            <Route path="feed" element={<Feed />} />
                            <Route path="explore" element={<Explore />} />
                            <Route path="login" element={<Login />} />
                            <Route path="profile/:profileId" element={<Profile />}>
                                <Route path="" element={<ListView />} />
                                <Route path="piece/:pieceId" element={<DetailView />} />
                            </Route>
                            <Route path="/register" element={<Register />} />
                            <Route path="/userdetails" element={<UserDetails />} />
                            {/* 404 route for unmatched paths */}
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </Router>
            </CurrentUserProvider>
        </div>
    );
};

export default App;
