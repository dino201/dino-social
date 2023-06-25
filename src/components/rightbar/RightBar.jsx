import './rightBar.scss';
import { useTranslation } from 'react-i18next';

function RightBar() {
    const { t } = useTranslation();
    return (
        <div className='rightBar'>
            <div className='container'>
                <div className='item'>
                    <span>{t('suggestions for You')}</span>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <span>Dino</span>
                        </div>
                        <div className='buttons'>
                            <button>{t('follow')}</button>
                            <button>{t('delete')}</button>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <span>Dino</span>
                        </div>
                        <div className='buttons'>
                            <button>{t('follow')}</button>
                            <button>{t('delete')}</button>
                        </div>
                    </div>
                </div>
                <div className='item'>
                    <span>{t('latest activities')}</span>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <p>
                                <span>Dino</span> Changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <p>
                                <span>Dino</span> Changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <p>
                                <span>Dino</span> Changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <p>
                                <span>Dino</span> Changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='item'>
                    <span>{t('online friend')}</span>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <div className='online' />
                            <span>Dino</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <div className='online' />
                            <span>Dino</span>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='userInfo'>
                            <img
                                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                                alt=''
                            />
                            <div className='online' />
                            <span>Dino</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RightBar;
