import './contacts.scss';
import Logo from '../../../../assets/logo.svg';
import { useSelector } from 'react-redux';
import { useState } from 'react';
function Contacts({ contacts, changeChat }) {
    const user = useSelector((state) => state.user.currentUser);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };
    return (
        <div className='contacts-container'>
            <div className='brand'>
                <img src={Logo} alt='logo' />
                <h3>DinoSocial</h3>
            </div>
            <div className='contacts'>
                {contacts.map((contact, index) => {
                    return (
                        <div
                            key={contact.id}
                            className={`contact ${
                                index === currentSelected ? 'selected' : ''
                            }`}
                            onClick={() => changeCurrentChat(index, contact)}
                        >
                            <div className='avatar'>
                                <img
                                    src={`/upload/${contact.profilePic}`}
                                    alt=''
                                />
                            </div>
                            <div className='username'>
                                <h3>{contact.name}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Contacts;
