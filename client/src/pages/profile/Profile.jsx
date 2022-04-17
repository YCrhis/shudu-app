import axios from 'axios'
import { useEffect, useState } from 'react'
import Feed from '../../components/feed/Feed'
import ProfileInfo from '../../components/profileInfo/ProfileInfo'
import SlideBar from '../../components/slidebar/SlideBar'
import Topbar from '../../components/topbar/Topbar'
import { useParams } from 'react-router'
import './profile.css'

const Profile = () => {

    const username = useParams().username;
    const [user, setUser] = useState({});

    const fetchUser = async () => {
        const response = await axios.get(`/user?username=${username}`);
        setUser(response.data)
    }

    useEffect(() => {
        fetchUser()
    }, [username])


    return (
        <div>
            <Topbar />
            <div className="profile">
                <SlideBar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture || 'https://wallpaperaccess.com/full/1719718.gif'} alt="profile" className='profileCoverImage' />
                            <img src={user.profilePicture || 'https://c.tenor.com/0mDkWfheFJIAAAAM/skateboarding.gif'} alt="profile" className='profileUserImage' />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <p className='profileInfoDesc'>{user.description}</p>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <ProfileInfo user={user} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile