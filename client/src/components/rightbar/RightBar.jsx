import './rightbar.css'
import Online from '../online/Online'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

const RightBar = () => {

    const { user } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);


    useEffect(() => {
        const getFriends = async () => {
            const friendsList = await axios.get('/user/friends/' + user._id)
            setFriends(friendsList.data)
        }
        getFriends();
    }, [user])

    return (
        <div className='rightbar'>
            <div className="rightBarWrapper">
                <div className="birthdayContainer">
                    <img src="https://d33wubrfki0l68.cloudfront.net/874dde41bca3a1105fe54a7563a2ade5acf0da12/85e83/_nuxt/img/gift360x360.135e5fe.gif" alt="gift" className='birthdatImg' />
                    <span className="birthdayText">
                        <span><b>Holiday</b> and <b>3 others friends</b> have a birthday today.</span>
                    </span>
                </div>
                {/* if thjere is an advcertisement */}
                <div className="rightBarAd"></div>
                <div className="rightBarFriends">
                    <h4 className="rightBarTitle">Friends Online</h4>
                    <ul className="rightBarFriendList">
                        {friends.map(friend => (
                            <Online
                                {...friend}
                                key={friend._id}
                            />
                        ))}

                    </ul>
                </div>
            </div>
        </div>
    )
}
export default RightBar