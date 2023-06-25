import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { makeRequest } from '../../httpRequest';
import { loginFailed, loginStart, loginSuccess } from '../../store/userSlice';
import './login.scss';

export default function Login() {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });
    const [err, setErr] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            dispatch(loginStart());

            const res = await makeRequest.post('/auth/login', inputs, {
                withCredentials: true,
            });
            if (res.status === 200) {
                dispatch(
                    loginSuccess({
                        currentUser: res.data,
                        token: res.data.token,
                    })
                );
            }
            setInputs({
                username: '',
                password: '',
            });
            navigate('/');
        } catch (err) {
            dispatch(loginFailed());
            setErr(err.response.data);
        }
    };

    return (
        <div className='login'>
            <div className='cart'>
                <div className='left'>
                    <h1>Hello World!</h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Vero minus veniam dolorem eveniet explicabo
                        adipisci molestiae sapiente possimus distinctio nobis,
                        quam repellendus fuga necessitatibus corporis provident
                        ut libero eum. Aliquam?
                    </p>
                    <span>Don't you have an account ?</span>
                    <Link to='/register'>
                        <button>Register</button>
                    </Link>
                </div>
                <div className='right'>
                    <h1>Login</h1>
                    <form>
                        <input
                            type='text'
                            placeholder='Username'
                            name='username'
                            onChange={handleChange}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                        />
                        {err && <span>{err}</span>}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
