import axios from 'axios'
import './shared.css'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Share = () => {

    const { user } = useContext(AuthContext);

    const description = useRef();
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            description: description.current.value
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            newPost.img = fileName;
            try {
                await axios.post('/upload', data)
                window.location.reload();
            } catch (error) {
                console.log(error)
            }
        }

        try {
            await axios.post('/posts', newPost)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture || 'https://c.tenor.com/0mDkWfheFJIAAAAM/skateboarding.gif'} alt="profile" />
                    <input type="text" placeholder={'What its new ' + user.username + '?'} className='shareInput' ref={description} />
                </div>
                <hr className='shareHr' />
                {file &&
                    <div className="shareImageContainer">
                        <img src={URL.createObjectURL(file)} alt="" className='shareImage' />
                        <i className="fa-solid fa-xmark shaedcancel" onClick={() => setFile(null)}></i>
                    </div>
                }
                <form className="shareBottom" onSubmit={handleSubmit}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <i className="fa-solid fa-camera camera"></i>
                            <span className='shareOptionText'>Picture</span>
                            <input type="file" id='file' accept='.png,.jpg,.jpeg' onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </label>
                        <div className="shareOption">
                            <i className="fa-solid fa-tag tag"></i>
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className="shareOption">
                            <i className="fa-solid fa-location-pin pin"></i>
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className="shareOption last">
                            <i className="fa-solid fa-face-smile"></i>
                            <span className='shareOptionText'>Emotion</span>
                        </div>
                    </div>
                    <button className="shareButton" type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share