import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";


import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Profile from '../pages/profile/Profile'
import Message from "../pages/Message/Message";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Router = () => {

    const { user } = useContext(AuthContext)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user ? <Home /> : <Register />} />
                <Route path="/login" element={user ? <Navigate to='/' /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                <Route path="/message" element={!user ? <Navigate to="/" /> : <Message />} />
                <Route path="/profile/:username" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router