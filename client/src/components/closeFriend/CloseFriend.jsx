import { Link } from "react-router-dom";

const CloseFriend = ({ username, profilePicture }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <Link to={"/profile/" + username}>
            <li className="slidebarFriend">
                <img src={profilePicture ? PF + profilePicture : 'https://c.tenor.com/0mDkWfheFJIAAAAM/skateboarding.gif'} alt="friend" />
                <span className='slidebarFriendName'>{username}</span>
            </li>
        </Link>
    )
}

export default CloseFriend