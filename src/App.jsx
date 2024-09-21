import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PieceDataProvider } from './contexts/PieceDataContext';
import styles from './App.module.css';
import Home from './pages/Home/Home';
import Feed from './pages/Feed/Feed';
import Explore from './pages/Explore/Explore';
import Login from './pages/Login/Login';
import MyStitchSpace from './pages/MyStitchSpace/MyStitchSpace';
import Register from './pages/Register/Register';
import UserDetails from './pages/UserDetails/UserDetails';
import NotFound from './pages/NotFound/NotFound';
import AppHeader from './components/AppHeader/AppHeader';
import { CurrentUserProvider } from './contexts/CurrentUserContext'

function App() {
    return (
        <div className={`App ${styles.App}`}>
            {/* This Provider allows components on all pages to access the authenticated user information */}
            <CurrentUserProvider >
                {/* This Provider allows components on all pages to search for Pieces */}
                <PieceDataProvider>
                    <Router>
                        <Routes>
                            {/* This Route wraps all the other Routes as the main navigation */}
                            <Route element={<AppHeader />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/feed" element={<Feed />} />
                                <Route path="/explore" element={<Explore />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/mystitchspace" element={<MyStitchSpace />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/userdetails" element={<UserDetails />} />
                                {/* 404 route for unmatched paths */}
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </Router>
                </PieceDataProvider>
            </CurrentUserProvider>
        </div>
    );
};

export default App;
