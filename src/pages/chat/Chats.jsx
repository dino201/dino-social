import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import './chats.scss';
import Contacts from './components/Contacts';
import { makeRequest } from '../../httpRequest';
import ChatContainer from './components/ChatContainer';
import Welcome from './components/Welcome/Welcome';

function Chats() {
    const user = useSelector((state) => state.user.currentUser);
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);

    useEffect(() => {
        makeRequest('/users/follow').then((res) => {
            setContacts(res.data);
        });
    }, []);

    useEffect(() => {
        if (user) {
            socket.current = io('http://localhost:5000');
            socket.current.emit('add-user', user.id);
        }
    }, [user]);
    const handleChangeChat = (chat) => {
        setCurrentChat(chat);
    };

    return (
        // <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
        //     <Navbar />
        <div className='chats-container'>
            <div className='chats-content'>
                <Contacts contacts={contacts} changeChat={handleChangeChat} />
                {currentChat === undefined ? (
                    <Welcome />
                ) : (
                    <ChatContainer currentChat={currentChat} socket={socket} />
                )}
            </div>
        </div>
        // </div>
    );
}

export default Chats;
