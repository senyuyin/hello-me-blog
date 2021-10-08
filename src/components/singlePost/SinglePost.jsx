import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './singlePost.css';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import { useContext } from 'react';

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({});
    // const PF = "data:image/png;base64,"

    const { user } = useContext(Context)

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false);


    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get('/posts/' + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };

        getPost();
    }, [path])

    const handleDelete = async () => {
        try {
            const res = await axios.delete('/posts/' + path, { data: { username: user?.username } });
            window.location.replace('/');
        } catch (err) {

        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put('/posts/'+path,{
                username:user.username,
                title,
                desc
            });

            // window.location.reload();
            setUpdateMode(false);
        } catch (err) {
            
        }
    }

    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo && (
                    <img src={post.photo} alt="" className="singlePostImg" />
                )}

                {updateMode ? (<input type="text" value={title} className='singlePostInput' autoFocus onChange={e => setTitle(e.target.value)} />) : (<h1 className="singlePostTitle">
                    {title}
                    {post.username === user?.username && (
                        <div className="singlePostEdit">
                            <i className="singlePostIcon far fa-edit" onClick={e => setUpdateMode(true)}></i>
                            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                        </div>
                    )}

                </h1>)}


                <div className="singlePostInfo">
                    <span className='singlePostAuthor'>Author: <Link to={`/?user=${post.username}`} className='link'><b>{post.username}</b></Link> </span>
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>

                {updateMode ? <textarea className='singlePostDescInput' value={desc} onChange={e=>setDesc(e.target.value)}></textarea> : <p className='singlePostDesc'>
                    {desc}
                </p>}

                {updateMode && <button className='singlePostButton' onClick={handleUpdate}>update</button>}

            </div>
        </div>
    )
}
