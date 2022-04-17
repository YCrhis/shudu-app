import './post.css'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Post = ({ comment, date, _id, likes, img, userId, description }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [newlike, setNewLike] = useState(likes?.length);
    const [isLike, setIsLike] = useState(false);
    const [user, setUser] = useState({})
    const { user: currentUser } = useContext(AuthContext)


    const fetchUser = async () => {
        const response = await axios.get(`/user?userId=${userId}`);
        setUser(response.data)
    }

    useEffect(() => {
        fetchUser()
    }, [userId])

    useEffect(() => {
        setIsLike(likes.includes(currentUser._id))
    }, [currentUser._id, likes])

    const likeHandle = () => {
        try {
            axios.put('/posts/' + _id + '/like', { userId: currentUser._id })
        } catch (error) {
            console.log(error)
        }
        setNewLike(!isLike ? newlike + 1 : newlike - 1)
        setIsLike(!isLike)
    }

    const handleDelete = async () => {
        try {
            await axios.delete('/posts/' + _id, {
                data: {
                    userId: currentUser._id
                }
            }
            )
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img className="profileImage" src={user.profilePicture || 'https://c.tenor.com/0mDkWfheFJIAAAAM/skateboarding.gif'} alt="profile" />
                        </Link>
                        <span className="postUsername">{user.username}</span>

                        <span className="postDate">{date}</span>
                    </div>
                    <div className="postTopRight">
                        {currentUser.username == user.username && <i className="fa-solid fa-trash" onClick={handleDelete}></i>}
                    </div>
                </div>
                <div className="postCenter">
                    {description && <span className="postText">{description}</span>}
                    <img src={PF + img} alt="post" className='postImage' />
                </div>
                <div className="postBottom">
                    <div className="postBottonLeft">
                        <i className="fa-solid fa-heart heart" onClick={likeHandle}></i>
                        <i className="fa-solid fa-thumbs-up finger" onClick={likeHandle}></i>
                        <span className='postLikeCounter'>{newlike}</span>
                    </div>
                    <div className="postButtonRight">
                        <span className="postCommentText">{comment} Comments</span>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Post

