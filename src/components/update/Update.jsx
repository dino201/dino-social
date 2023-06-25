import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { makeRequest } from '../../httpRequest';
import { replaceUserData } from '../../store/userSlice';

import './update.scss';

function Update({ user, setOpenUpdate }) {
    const [coverPic, setCoverPic] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [texts, setTexts] = useState({
        email: user.email,
        // password: user.password,
        name: user.name,
        city: user.city,
        website: user.website,
    });

    const dispatch = useDispatch();

    const upload = async (file) => {
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
        mutationFn: (user) => {
            makeRequest.put('/users', user).then((res) => {
                if (res.status === 200) {
                    dispatch(replaceUserData(res.data[0]));
                }
            });
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const handleClick = async (e) => {
        e.preventDefault();
        let coverPicURL = coverPic ? await upload(coverPic) : user.coverPic;
        let profilePicURL = profilePic
            ? await upload(profilePic)
            : user.profilePic;
        mutation.mutate({
            ...texts,
            coverPic: coverPicURL,
            profilePic: profilePicURL,
        });

        setTexts('');
        setCoverPic(null);
        setProfilePic(null);
        setOpenUpdate(false);
    };

    const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
    };
    return (
        <div className='update'>
            <div className='wrapper'>
                <h1>Update Your Profile</h1>
                <form>
                    <div className='files'>
                        <label htmlFor='cover'>
                            <span>Cover Picture</span>
                            <div className='imgContainer'>
                                <img
                                    src={
                                        coverPic
                                            ? URL.createObjectURL(coverPic)
                                            : '/upload/' + user.coverPic
                                    }
                                    alt=''
                                />
                                <CloudUploadIcon className='icon' />
                            </div>
                        </label>
                        <input
                            type='file'
                            id='cover'
                            style={{ display: 'none' }}
                            onChange={(e) => setCoverPic(e.target.files[0])}
                        />
                        <label htmlFor='profile'>
                            <span>Profile Picture</span>
                            <div className='imgContainer'>
                                <img
                                    src={
                                        profilePic
                                            ? URL.createObjectURL(profilePic)
                                            : '/upload/' + user.profilePic
                                    }
                                    alt=''
                                />
                                <CloudUploadIcon className='icon' />
                            </div>
                        </label>
                        <input
                            type='file'
                            id='profile'
                            style={{ display: 'none' }}
                            onChange={(e) => setProfilePic(e.target.files[0])}
                        />
                    </div>
                    <label>Email</label>
                    <input
                        type='text'
                        value={texts.email}
                        name='email'
                        onChange={handleChange}
                    />
                    {/* <label>Password</label>
                    <input
                        type='text'
                        value={texts.password}
                        name='password'
                        onChange={handleChange}
                    /> */}
                    <label>Name</label>
                    <input
                        type='text'
                        value={texts.name}
                        name='name'
                        onChange={handleChange}
                    />
                    <label>Country / City</label>
                    <input
                        type='text'
                        name='city'
                        value={texts.city}
                        onChange={handleChange}
                    />
                    <label>Website</label>
                    <input
                        type='text'
                        name='website'
                        value={texts.website}
                        onChange={handleChange}
                    />
                    <button onClick={handleClick}>Update</button>
                </form>
                <button className='close' onClick={() => setOpenUpdate(false)}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default Update;
