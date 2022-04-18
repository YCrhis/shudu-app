import './mess.css'
import { format } from 'timeago.js'

const Mess = ({ own, text, createdAt }) => {
    return (
        <div className={own ? "mess own" : "mess"}>
            <div className="messTop">
                <img className="messImg" src="https://c.tenor.com/0mDkWfheFJIAAAAM/skateboarding.gif" alt="" />
                <p className='messText'>{text}</p>
            </div>
            <div className="messBottom">
                {format(createdAt)}
            </div>
        </div>
    )
}

export default Mess