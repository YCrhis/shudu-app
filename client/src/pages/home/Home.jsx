import Topbar from "../../components/topbar/Topbar"
import SlideBar from "../../components/slidebar/SlideBar"
import Feed from "../../components/feed/Feed"
import RightBar from '../../components/rightbar/RightBar'

import './home.css'

const Home = () => {
    return (
        <div>
            <Topbar />
            <div className="homeContainer">
                <SlideBar />
                <Feed />
                <RightBar />
            </div>
        </div>
    )
}
export default Home