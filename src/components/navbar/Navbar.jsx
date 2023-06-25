import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import { useTranslation } from "react-i18next";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MessageIcon from '@mui/icons-material/Message';
import LanguageIcon from '@mui/icons-material/Language';

import './navbar.scss';
import { DarkModeContext } from '../../context/darkModeContext';
import Search from '../Search/Search';
import { makeRequest } from '../../httpRequest';
import { logout } from '../../store/userSlice';


function Navbar() {
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showLanguage, setShowLanguage ] = useState(false);
    const { i18n}= useTranslation()
    const { toggle, darkMode } = useContext(DarkModeContext);
    const handleLogout = async () => {
        const res = await makeRequest.post('/auth/logout');
        if (res.status === 200) {
            dispatch(logout());
            navigate('/login');
        }
    };
    const changeLanguage = (lang)=>{
        i18n.changeLanguage(lang)
    }
    return (
        <div className='navbar'>
            <div className='left'>
                <Link to='/' className='link'>
                    <span>DinoSocial</span>
                </Link>
                <HomeOutlinedIcon />
                {darkMode ? (
                    <WbSunnyOutlinedIcon onClick={toggle} />
                ) : (
                    <DarkModeOutlinedIcon onClick={toggle} />
                )}
                <LanguageIcon onClick={()=>setShowLanguage(!showLanguage)} />
                {showLanguage && (
                    <div className="list-language">
                        <span className="lang-title" onClick={()=>changeLanguage("vi")}>Vietnamese</span>
                        <span className="lang-title" onClick={()=>changeLanguage("en")}>English</span>
                    </div>
                )}
                <Search />
            </div>
            <div className='right'>
                <PersonOutlinedIcon />
                {/* <MessageIcon onClick={() => setShowMessage(!showMessage)} /> */}
                <Tippy delay={[0, 50]} content='Message' placement='bottom'>
                    <Link to={`/chats`} className='link'>
                        <MessageIcon />
                    </Link>
                </Tippy>
                <NotificationsOutlinedIcon />
                <LogoutOutlinedIcon onClick={handleLogout} />
                <Link to={`/profile/${user.id}`} className='user link'>
                    <img src={`/upload/${user.profilePic}`} alt='avatar' />
                    <span>{user.name}</span>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
