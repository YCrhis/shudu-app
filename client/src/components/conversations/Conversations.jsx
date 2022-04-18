import axios from 'axios'
import { useEffect, useState } from 'react'
import './conversation.css'

const Conversations = ({ members, currentUser }) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const friendId = members.find((m) => m !== currentUser);

        const getUser = async () => {
            try {
                const res = await axios('/user?userId=' + friendId);
                setUser(res.data)
            } catch (error) {
                console.log(error)
            }

        }
        getUser()
    }, [currentUser, members])

    return (
        <div className='conversation'>
            <img className='conversationImg' src={user?.profilePicture ? user?.profilePicture : "https://c.tenor.com/0mDkWfheFJIAAAAM/skateboarding.gif"} alt="" />
            <span className='conversationName'>{user?.username}</span>
        </div>
    )
}

export default Conversations