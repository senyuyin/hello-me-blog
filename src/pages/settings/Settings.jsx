import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context'
import {useContext, useState, useEffect} from 'react'
import './settings.css'
import axios from 'axios'


export default function Setting() {

    const [file, setFile] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const {user, dispatch} = useContext(Context)
    // const PF = 'https://vast-plains-73739.herokuapp.com/images/'

    function image2Base64(img) {  
        var reader = new FileReader();
        reader.readAsDataURL(img);

        var res='';
        reader.onload = function () {
            res = reader.result;//base64encoded string
            setFile(res);
            console.log(res);
        };

   }  

    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch({type:'UPDATE_START'})
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        }
        if(file){
            // const data =new FormData();
            // const filename = Date.now() + file.name;
            // data.append('name', filename);
            // data.append('file', file);
            // updatedUser.profilePic = filename;
            // try{
            //     await axios.post('/upload', data);
            // }catch(err){

            // }
            updatedUser.profilePic = file;
        }

        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            setSuccess(true)
            dispatch({type:'UPDATE_SUCCESS', payload: res.data})
        } catch (error) {
            dispatch({type:'UPDATE_FAILURE'})
        }
    }

    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <div className="settingsUpdateTitle">Update Your Account</div>
                    <div className="settingsDeleteTitle">Delete Account</div>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={file?file:user?.profilePic} alt="" />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{display: "none"}}
                        onChange={e=>image2Base64(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user?.username} 
                     onChange={e=>setUsername(e.target.value)}/>
                    <label>Email</label>
                    <input type="email" placeholder={user?.email} 
                     onChange={e=>setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input type="password" 
                     onChange={e=>setPassword(e.target.value)}
                    />
                    <button className='settingsSubmit' type="submit">Update</button>
                    {success&&<span style={{color:'green',marginTop:'20px',textAlign:'center'}}>settings has been updated...</span>}
                </form>
            </div>
            <Sidebar/>
        </div>
    )
}
