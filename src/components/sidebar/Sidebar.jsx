import './sidebar.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [cats,setCats] = useState([]);
    useEffect(()=>{
        const getCats = async ()=>{
            const res = await axios.get('/categories');
            setCats(res.data);
            console.log(cats)
        }
        getCats()
    },[])
    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg" alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptatum tenetur fugit neque consequuntur laudantium in totam nemo omnis placeat.</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map(c=>(
                        <Link to={`\?cat=${c.name}`} className='link'>
                            <li key={c._id} className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FLLOW ME</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}
