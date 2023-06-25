
import Chats from "../pages/chat/Chats";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Register from "../pages/register/Register";
import Friends from "../pages/friends/Friends";

const routes = {
    home: { path: '/', element: <Home /> },
    login: { path: '/login', element: <Login /> },
    register: { path: '/register', element: <Register /> },
    profile: { path: '/profile/:id', element: <Profile /> },
    chat: { path: '/chats', element: <Chats /> },
    friends: { path: '/friends', element: <Friends /> },
}


export default routes;
