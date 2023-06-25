import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './share.scss';
import Image from '../../assets/img.png';
import Map from '../../assets/map.png';
import Friend from '../../assets/friend.png';
import { makeRequest } from '../../httpRequest';

const Share = () => {
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState('');
    const user = useSelector((state) => state.user.currentUser);
    const { t } = useTranslation();

    const upload = async (req, res) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await makeRequest.post('/upload', formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (newPost) => {
            return makeRequest.post('/posts', newPost);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const handleClick = async (e) => {
        e.preventDefault();
        let imgURL = '';
        if (file) {
            imgURL = await upload();
        }
        mutation.mutate({ desc, img: imgURL });
        setDesc('');
        setFile(null);
    };

    return (
        <div className='share'>
            <div className='container'>
                <div className='top'>
                    <img src={`/upload/${user.profilePic}`} alt='' />

                    <input
                        type='text'
                        value={desc}
                        placeholder={`${t("what's on your mind")} ${
                            user.name
                        }?`}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className='overviewImg'>
                    {/* {file?.type === 'video/mp4' ? (
                        <video
                            src={URL.createObjectURL(file)}
                            playsInline
                            muted
                            autoPlay
                        />
                    ) : (
                        <img src={URL.createObjectURL(file)} alt='' />
                    )} */}

                    {file && <img src={URL.createObjectURL(file)} alt='' />}
                </div>
                <hr />
                <div className='bottom'>
                    <div className='left'>
                        <input
                            type='file'
                            id='file'
                            style={{ display: 'none' }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor='file'>
                            <div className='item'>
                                <img src={Image} alt='' />
                                <span>{t('add image')}</span>
                            </div>
                        </label>
                        <div className='item'>
                            <img src={Map} alt='' />
                            <span>{t('add place')}</span>
                        </div>
                        <div className='item'>
                            <img src={Friend} alt='' />
                            <span>{t('tag friend')}</span>
                        </div>
                    </div>
                    <div className='right'>
                        <button onClick={handleClick}>{t('share')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
