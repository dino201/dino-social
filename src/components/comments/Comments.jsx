import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

import './comments.scss';
import { makeRequest } from '../../httpRequest';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function Comments({ postId }) {
    const { t } = useTranslation()
    const user = useSelector((state) => state.user.currentUser);
    const [desc, setDesc] = useState('');
    const { isLoading, error, data } = useQuery({
        queryKey: ['comments'],
        queryFn: () =>
            makeRequest.get('/comments?postId=' + postId).then((res) => {
                return res.data;
            }),
    });

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post('/comments', newComment);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(['comments']);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId });
        setDesc('');
    };

    return (
        <div className='comments'>
            <div className='write'>
                <img
                    src={`/upload/${user && user.profilePic}`}
                    alt={user && user?.name}
                />
                <input
                    type='text'
                    placeholder={`${t('write a comment')}`}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button onClick={handleClick}>{t("send")}</button>
            </div>
            {data?.map((comment) => (
                <div className='comment' key={comment.id}>
                    <img
                        src={`/upload/${comment.profilePic}`}
                        alt={comment.name}
                    />
                    <div className='info'>
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className='date'>
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Comments;
