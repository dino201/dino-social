import './leftBar.scss';

import Friends from '../../assets/1.png';
import Groups from '../../assets/2.png';
import Market from '../../assets/3.png';
import Watch from '../../assets/4.png';
import Memories from '../../assets/5.png';
import Events from '../../assets/6.png';
import Gaming from '../../assets/7.png';
import Gallery from '../../assets/8.png';
import Videos from '../../assets/9.png';
import Messages from '../../assets/10.png';
import Tutorials from '../../assets/11.png';
import Courses from '../../assets/12.png';
import Fund from '../../assets/13.png';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
function LeftBar() {
    const user = useSelector((state) => state.user.currentUser);
    const { t } = useTranslation();
    return (
        <div className='leftBar'>
            <div className='container'>
                <div className='menu'>
                    <div className='user'>
                        <img
                            src={`/upload/${user && user.profilePic}`}
                            alt='avatar'
                        />
                        <span>{user && user.name}</span>
                    </div>
                    <Link className='item link' to='/friends'>
                        <img src={Friends} alt='' />
                        <span>{t('friends')}</span>
                    </Link>
                    <div className='item'>
                        <img src={Groups} alt='' />
                        <span>{t('groups')}</span>
                    </div>
                    <div className='item'>
                        <img src={Market} alt='' />
                        <span>{t('market')}</span>
                    </div>
                    <div className='item'>
                        <img src={Watch} alt='' />
                        <span>Watch</span>
                    </div>
                    <div className='item'>
                        <img src={Memories} alt='' />
                        <span>{t('memories')}</span>
                    </div>
                    <hr />
                    <div className='menu'>
                        <span>{t('your shortcuts')}</span>
                        <div className='item'>
                            <img src={Events} alt='' />
                            <span>{t('events')}</span>
                        </div>
                        <div className='item'>
                            <img src={Gaming} alt='' />
                            <span>{t('gaming')}</span>
                        </div>
                        <div className='item'>
                            <img src={Gallery} alt='' />
                            <span>{t('gallery')}</span>
                        </div>
                        <div className='item'>
                            <img src={Videos} alt='' />
                            <span>Videos</span>
                        </div>
                        <div className='item'>
                            <img src={Messages} alt='' />
                            <span>{t('messages')}</span>
                        </div>
                    </div>
                    <hr />
                    <div className='menu'>
                        <span>{t('others')}</span>
                        <div className='item'>
                            <img src={Tutorials} alt='' />
                            <span>{t('tutorials')}</span>
                        </div>
                        <div className='item'>
                            <img src={Courses} alt='' />
                            <span>{t('courses')}</span>
                        </div>
                        <div className='item'>
                            <img src={Fund} alt='' />
                            <span>{t('fund')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftBar;
