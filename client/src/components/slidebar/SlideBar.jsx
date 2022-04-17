import './slidebar.css'
import CloseFriend from '../closeFriend/CloseFriend'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const SlideBar = () => {

    const [otherUsers, setOtherUsers] = useState([]);
    const search = useRef(null);


    const loadUsers = async () => {
        const response = await axios.get('user/all');
        setOtherUsers(response.data)
    }

    useEffect(() => {
        loadUsers()
    }, [])



    const handleLookingUser = async (e) => {
        e.preventDefault();
        if (search === null) {
            loadUsers();
        } else {
            const response = await axios.get('/user/search/' + search.current.value)
            setOtherUsers(response.data)
        }
    }

    return (
        <div className='slidebar'>
            <div className="slidebarWrapper">
                <ul className="slidebarList">
                    <li className="slidebarListItem">
                        <i className="fa-brands fa-rocketchat"></i>
                        <span className="slidebarListItemText">Chat</span>
                    </li>
                    <li className="slidebarListItem">
                        <i className="fa-solid fa-user-group"></i>
                        <span className="slidebarListItemText">Friends</span>
                    </li>
                    <li className="slidebarListItem">
                        <i className="fa-brands fa-rocketchat"></i>
                        <span className="slidebarListItemText">Chat</span>
                    </li>
                </ul>
                <hr className='slidebarHr' />
                <ul className="slidebarFriendList">
                    <h2>Look For a Friends</h2>
                    <form className="slidebarSearh" onSubmit={handleLookingUser}>
                        <input type="text" ref={search} />
                        <i className="fa-solid fa-magnifying-glass" onClick={handleLookingUser}></i>
                    </form>
                    {otherUsers?.map(otherUser => (
                        <CloseFriend
                            {...otherUser}
                            key={otherUser._id}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default SlideBar