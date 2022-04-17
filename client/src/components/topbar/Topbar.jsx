import './topbar.css'

import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Topbar = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <img src="https://pa1.narvii.com/6503/73a5f69746c04475ce3d91890ae4e8c0a62e0e6c_hq.gif" alt="logo" className='logoImage' />
                <span className='logo'>
                    <Link to="/"> Shudu</Link>
                </span>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <input type="text" className='searchInput' />
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarlink">Home</span>
                    <span className="topbarlink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <i className="fa-solid fa-user"></i>
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className="topbarIconItem">
                        <i className="fa-brands fa-rocketchat"></i>
                        <span className='topbarIconBadge'>2</span>
                    </div>
                    <div className="topbarIconItem">
                        <i className="fa-solid fa-bell"></i>
                        <span className='topbarIconBadge'>1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture || 'https://c.tenor.com/0mDkWfheFJIAAAAM/skateboarding.gif'} alt="profile" className='topbarImg' />
                </Link>
            </div>
        </div >
    )
}
export default Topbar