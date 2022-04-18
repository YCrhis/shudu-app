import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './chatonline.css'

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {

    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])

    const { user } = useContext(AuthContext)

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get('/user/friends/' + currentId)
            setFriends(res.data)
        }
        getFriends();
    }, [currentId])

    useEffect(() => {
        setOnlineFriends(friends.filter(user => onlineUsers.includes(user._id)))
    }, [friends, onlineFriends])

    const handleClick = async (i) => {
        try {
            const res = await axios.get(`/conversation/find/${currentId}/${user._id}`)
            setCurrentChat(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='chatOnline'>
            {onlineFriends?.map(i => (
                <div className="chatOnlineFriend" onClick={() => handleClick(i)}>
                    <div className="chatOnlineImgContainer">
                        <img className='chatOnlineImage' src="https://c.tenor.com/0mDkWfheFJIAAAAM/skateboarding.gif" alt="" />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">
                        {i.username}
                    </span>
                </div>
            ))}

        </div>
    )
}

export default ChatOnline