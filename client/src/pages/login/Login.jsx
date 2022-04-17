import './login.css'
import { useContext, useRef } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {

    const email = useRef();
    const password = useRef();

    const { state, user, isFetching, error, dispatch } = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
    }

    if (error) {
        alert('The user does not exist');
        dispatch({ type: "LOGIN_NORMAL" });
    }


    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h1 className='loginLeftTitle'>Hello!</h1>
                    <p className='loginLeftPresentation'>Sign into your Account</p>
                    <form onSubmit={handleLogin}>
                        <div className="loginLabel">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" placeholder='E-mail' ref={email} required />
                        </div>
                        <div className="loginLabel">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" placeholder='Password' ref={password} required minLength={4} />
                        </div>
                        <button disabled={isFetching}>{isFetching ? 'Loading ...' : 'Sign In'}</button>
                        <p className='loginRightRegister'>Don't have an account? <span>Create</span></p>
                    </form>
                </div>
                <div className="loginRight">
                    <h1 className='loginRightTitle'>Welcome to <span>Shudu</span></h1>
                    <p>Hello, this is Shudu a basic social application, where you can meet new people, do not forget, if you like it, recommend the application.</p>
                </div>
            </div>
        </div>
    )
}

export default Login