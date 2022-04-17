import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './profileinfo.css'

const ProfileInfo = ({ user }) => {

    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [follow, setFollow] = useState(currentUser.followings.includes(user?.id))

    const [friends, setFriends] = useState([]);


    useEffect(() => {
        const getFriends = async () => {
            const friendsList = await axios.get('/user/friends/' + user._id)
            setFriends(friendsList.data)
        }
        getFriends();
    }, [user])

    useEffect(() => {
        setFollow(currentUser.followings.includes(user?.id))
    }, [currentUser, user.id])

    const handleFollow = async () => {
        try {
            if (follow) {
                await axios.put("/user/" + user._id + "/unfollow", { userId: currentUser._id })
                dispatch({ type: 'UNFOLLOW', payload: user._id })
            } else {
                await axios.put("/user/" + user._id + "/follow", { userId: currentUser._id })
                dispatch({ type: 'FOLLOW', payload: user._id })
            }
        } catch (error) {
            console.log(error)
        }
        setFollow(!follow)
    }

    return (
        <>
            <div className='rightbar'>
                <div className="rightBarWrapper">
                    {user.username !== currentUser.username && <button className='rightbarButton' onClick={handleFollow}>
                        {follow ? '' : <i className="fa-solid fa-plus"></i>}
                        {follow ? ' Unfollow' : ' Follow'}
                    </button>}
                    <h4 className='rightbarTitle'>User Information</h4>
                    <div className="rightBarInfo">
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">City: </span>
                            <span className="rightbarInfoValue">{user.city || '---'}</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">From: </span>
                            <span className="rightbarInfoValue">{user.from || '---'}</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">RelationShip: </span>
                            <span className="rightbarInfoValue">{user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'Married' : '---'}</span>
                        </div>
                    </div>
                    <h4 className="rightbarTitle">User Followings</h4>
                    <div className="rightbarFollowings">
                        {friends.map(friend => (
                            <div className="rightbarFollwing">
                                <img src={friend.profilePicture || 'https://c.tenor.com/0mDkWfheFJIAAAAM/skateboarding.gif'} alt="" className='rightbarFollowingImg' />
                                <span className='rightbarFollowingName'>{friend.username}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileInfo