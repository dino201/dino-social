import './welcome.scss';
import { useSelector } from 'react-redux';
import Robot from '../../../../assets/robot.gif';

function Welcome() {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <div className='welcome'>
            <img src={Robot} alt='' />
            <h1>
                Welcome, <span>{user.name}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </div>
    );
}

export default Welcome;
