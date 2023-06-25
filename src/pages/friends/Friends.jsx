import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeRequest } from '../../httpRequest';
import './friends.scss';

function Friends() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        makeRequest('/users/follow').then((res) => {
            setContacts(res.data);
        });
    }, []);
    const handleClick = (id) => {
        makeRequest.delete('/relationships?followerUserId=' + id);
    };

    return (
        <div className='friends'>
            <h2>Danh sách bạn bè đang theo dõi</h2>
            <div className='friend'>
                {contacts === 0 ? (
                    <span>Bạn chưa theo dõi ai</span>
                ) : (
                    contacts.map((contact, index) => {
                        return (
                            <div className='item' key={index}>
                                <img
                                    src={'/upload/' + contact.profilePic}
                                    alt=''
                                    className='avatar'
                                />
                                <div className='info'>
                                    <span className='name'>{contact.name}</span>
                                    <p>{contact.city}</p>
                                </div>
                                <button onClick={() => handleClick(contact.id)}>
                                    Following
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default Friends;
