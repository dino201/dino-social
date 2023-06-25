import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { makeRequest } from '../../httpRequest';

import Post from '../post/Post';
import './posts.scss';

function Posts({ userId }) {
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     const getPosts = () => {
    //         makeRequest.get('/posts?userId=' + userId).then((res) => {
    //             setData(res.data);
    //         });
    //     };
    //     getPosts();
    // }, [userId]);
    // return (
    //     <div className='posts'>
    //         {data &&
    //             data.map((post, index) => <Post post={post} key={index} />)}
    //     </div>
    // );
    const { isLoading, error, data } = useQuery(['posts'], () =>
        makeRequest.get('/posts?userId=' + userId).then((res) => {
            return res.data;
        })
    );

    return (
        <div className='posts'>
            {error
                ? 'Something went wrong!'
                : isLoading
                ? 'loading'
                : data.map((post,index) => <Post post={post} key={index} />)}
        </div>
    );
}

export default Posts;
