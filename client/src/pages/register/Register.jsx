import axios from 'axios';
import { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import './register.css'

const Register = () => {

    const { user } = useContext(AuthContext)

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const secondpassword = useRef();

    const history = useNavigate();


    console.log(user, ' thisis ')

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password.current.value != secondpassword.current.value) {
            alert('Passwords are not the same')
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post("/auth/register", user);
                history('/login')
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h1 className='loginLeftTitle'>Sing Up</h1>
                    <p className='loginLeftPresentation'>Create your new Account</p>
                    <form onSubmit={handleRegister}>
                        <div className="loginLabel">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" placeholder='E-mail' ref={email} />
                        </div>
                        <div className="loginLabel">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" placeholder='User Name' ref={username} />
                        </div>
                        <div className="loginLabel">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" placeholder='Password' ref={password} />
                        </div>
                        <div className="loginLabel">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" placeholder='Repeat Password' ref={secondpassword} />
                        </div>
                        <button onClick={handleRegister}>Sign In</button>
                        <p className='loginRightRegister'>I have account <Link to="/login"><span>Sign In</span></Link></p>
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

export default Register