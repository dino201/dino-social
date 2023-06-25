import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Comments from '../comments/Comments';
import './post.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../httpRequest';
function Post({ post }) {
    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const user = useSelector((state) => state.user.currentUser);
    const { t } = useTranslation();

    const { isLoading, error, data } = useQuery({
        queryKey: ['likes', post.id],
        queryFn: () =>
            makeRequest.get('/likes?postId=' + post.id).then((res) => {
                return res.data;
            }),
    });
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (liked) => {
            if (liked) return makeRequest.delete('/likes?postId=' + post.id);
            return makeRequest.post('/likes', { postId: post.id });
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(['likes']);
            },
        }
    );
    const deleteMutation = useMutation(
        (postId) => {
            return makeRequest.delete('/posts/' + postId);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(['posts']);
            },
        }
    );

    const handleLike = async (e) => {
        mutation.mutate(data?.includes(user.id));
    };
    const handleDelete = async (e) => {
        deleteMutation.mutate(post.id);
    };

    return (
        <div className='post'>
            <div className='container'>
                <div className='user'>
                    <div className='userInfo'>
                        <img
                            src={`/upload/${post.profilePic}`}
                            alt={post.name}
                        />
                        <div className='details'>
                            <Link
                                to={`/profile/${post.userId}`}
                                className='link'
                            >
                                <span className='name'>{post.name}</span>
                            </Link>
                            <span className='date'>
                                {moment(post.createdAt).fromNow()}
                            </span>
                        </div>
                    </div>
                    <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
                    {menuOpen && post.userId === user.id && (
                        <button onClick={handleDelete}>{t('delete')}</button>
                    )}
                </div>
                <div className='content'>
                    <p>{post.desc}</p>
                    {post.img?.split('.')[1] === 'mp4' ? (
                        <video
                            src={`/upload/${post.img}`}
                            playsInline
                            muted
                            autoPlay
                            controls
                        />
                    ) : (
                        <img src={`/upload/${post.img}`} alt='' />
                    )}
                </div>
                <div className='info'>
                    <div className='item'>
                        {isLoading ? (
                            'Loading'
                        ) : data?.includes(user.id) ? (
                            <FavoriteOutlinedIcon
                                style={{ color: 'red' }}
                                onClick={handleLike}
                            />
                        ) : (
                            <FavoriteBorderOutlinedIcon onClick={handleLike} />
                        )}
                        {data?.length} {t('like')}
                    </div>
                    <div
                        className='item'
                        onClick={() => setCommentOpen(!commentOpen)}
                    >
                        <TextsmsOutlinedIcon />
                        {t('see comments')}
                    </div>
                    <div className='item'>
                        <ShareOutlinedIcon />
                        {t('share')}
                    </div>
                </div>
                {commentOpen && <Comments postId={post.id} />}
            </div>
        </div>
    );
}

export default Post;
