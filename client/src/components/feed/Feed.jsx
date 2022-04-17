import axios from 'axios'
import Post from '../post/Post'
import Share from '../shared/Shared'
import './feed.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext'

const Feed = ({ username }) => {

    const [posts, setPosts] = useState([]);

    const { user } = useContext(AuthContext);

    const fetchPosts = async () => {
        const response = username
            ? await axios.get(`/posts/profile/${username}`)
            : await axios.get(`posts/timeline/` + user._id);
        setPosts(
            response.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            })
        )
    }

    useEffect(() => {
        fetchPosts()
    }, [username, user._id])

    return (
        <div className='feed'>
            <div className="feedWrapper">
                {!username || username == user.username ? <Share /> : ''}
                {posts.map(post => (
                    <Post {...post} key={post._id} />
                ))}
            </div>
        </div>
    )
}
export default Feed