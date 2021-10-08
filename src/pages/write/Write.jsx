import './write.css'
import { useState,useContext } from 'react'
import axios from 'axios'
import { Context } from '../../context/Context'

export default function Write() {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState('')
    const {user} = useContext(Context)

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
        const newPost = {
            username: user.username,
            title,
            desc
        }
        if(file){
            newPost.photo=file;
        }

        try {
           const res = await axios.post("/posts", newPost);
           console.log(res.data)
           window.location.replace('/post/'+ res.data._id);
        } catch (error) {
            
        }
    }

    return (
        <div className='write'>
            {file&&<img src={file} alt="" className="writeImg" />}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput"><i className="writeIcon fas fa-plus"></i></label>
                    <input type="file" id='fileInput' style={{display:'none'}} onChange={(e)=>{image2Base64(e.target.files[0])}}/>
                    <input type="text" placeholder='Title' className='writeInput' autoFocus={true} onChange={e=>setTitle(e.target.value)}/>
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder='Tell your story...' type='text' className='writeInput writeText' onChange={e=>setDesc(e.target.value)}></textarea>
                </div>
                <button className="writeSubmit" type='submit'>Publish</button>
            </form>
        </div>
    )
}