import React, { useState } from 'react'
import "./UsersProfile.css";
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../actions/users';

const EditProfile = ({currentUser, setSwitch}) => {

    const [name, setName]=useState(currentUser?.result?.name);
    const [about, setAbout]=useState(currentUser?.result?.about);
    const [tags, setTags]=useState([]);
    const dispatch=useDispatch();

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(tags.length===0 || tags[0]===''){
            // dispatch(updateProfile(currentUser?.result?._id, {name, about, tags:currentUser?.result?.tags}));
            alert("Please update tags field");
        }
        else{
            dispatch(updateProfile(currentUser?.result?._id, {name, about, tags}));
        }
        setSwitch(false);
    }

  return (
    <div>
      <h1 className='edit-profile-title'>
        Edit Your Profile
      </h1>
      <h2 className="edit-profile-title-2">
        Public information
      </h2>
      <form action="" className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
            <h3>Display name</h3>
            <input type='text' value={name} onChange={(event)=>setName(event.target.value)}/>
        </label>
        <label htmlFor="about">
            <h3>About</h3>
            <textarea name='about' cols={"30"} rows={"10"} value={about} onChange={(event)=>setAbout(event.target.value)}></textarea>
        </label>
        <label htmlFor="tags">
            <h3>Watched Tags</h3>
            <p>Add tags separated by 1 space</p>
            <input type='text' id='tags' onChange={(event)=>setTags(event.target.value.split(' '))}/>
        </label><br/>
        <input type='submit' value={'Save Profile'} className='user-submit-btn'/>
        <button type='button' className='user-cancel-btn' onClick={()=>setSwitch(false)}>Cancel</button>
      </form>
    </div>
  )
}

export default EditProfile
