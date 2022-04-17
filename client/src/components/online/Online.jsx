import { Link } from 'react-router-dom'

const Online = ({ username, profilePicture }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <Link to={"/profile/" + username} >
            <li className="rightBarFriend">
                <div className="rightBarProfileImgContainer">
                    <img src={profilePicture ? PF + profilePicture : 'https://c.tenor.com/VXUmKfZtFkQAAAAd/nodding-happy.gif'} alt="gift" className='rightBarProfileImg' />
                    <div className="rightBarOnline"></div>
                </div>
                <span className="rightBarUsename">{username}</span>
            </li>
        </Link >
    )
}
export default Online