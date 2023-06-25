import ReactPlayer from 'react-player';

import './stories.scss';
import { useSelector } from 'react-redux';
//TEMPORARY
const stories = [
    {
        id: 1,
        name: 'John Doe',
        img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
        id: 2,
        name: 'John Doe',
        img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
        id: 3,
        name: 'John Doe',
        img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
        id: 4,
        name: 'John Doe',
        img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
];
function Stories() {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <div className='stories'>
            <div className='story'>
                <img src={`/upload/${user.profilePic}`} alt={user.name} />
                <span>{user.name}</span>
                <button>+</button>
            </div>
            {stories.map((story) => (
                <div className='story' key={story.id}>
                    <img src={story.img} alt={story.name} />
                    <span>{story.name}</span>
                    {/* <ReactPlayer
                        className='video'
                        url='https://www.youtube.com/watch?v=KKc_RMln5UY'
                        width='100%'
                        height='100%'
                        playing={true}
                        controls={false}
                    /> */}
                </div>
            ))}
        </div>
    );
}

export default Stories;
