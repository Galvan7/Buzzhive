import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import './AddAmigo.css'

function AddAmigo({addchattoggler,addchattoggle}) {

    const [amigousername, setAmigoUsername] = useState()
    const [errorMessage, setErrorMessage] = useState("") // new state variable
    const { user } = useContext(AuthContext)

    const API_URL = "http://localhost:5000/"

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const response = await axios.get(`${API_URL}api/users/?username=${amigousername}`)
    //         setAmigoUsername("")
    //         const data = {
    //             senderId: user._id,
    //             receiverId: response.data._id
    //         }
    //         await axios.post(API_URL+'api/chatrooms', data)
    //         window.location.reload();
    //     }
    //     catch (err) {
    //         setErrorMessage("User does not exist") // set error message if user not found
    //         setTimeout(()=>{
    //             window.location.reload();
    //         },1000)
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.get(`${API_URL}api/users/?username=${amigousername}`);
          setAmigoUsername("");
          const data = {
            senderId: user._id,
            receiverId: response.data._id,
          };
          
          const existingChatroomResponse = await axios.get(`${API_URL}api/chatrooms/${user._id}`);
          const existingChatrooms = existingChatroomResponse.data;
          
          const isAmigoAlreadyAdded = existingChatrooms.some((chatroom) => {
            const members = chatroom.members;
            return members.includes(response.data._id);
          });
          
          if (isAmigoAlreadyAdded) {
            setErrorMessage("User already in Hive");
            setTimeout(() => {
              setErrorMessage("");
              window.location.reload();
            }, 1000);
          } else {
            await axios.post(`${API_URL}api/chatrooms`, data);
            window.location.reload();
          }
        } catch (err) {
          setErrorMessage("User does not exist");
          setTimeout(() => {
            setErrorMessage("");
            window.location.reload();
          }, 1000);
        }
    };
      
      

    return (
        <div className='add-amigo-background'>
            <div className={addchattoggle?"add-amigo-open":"add-amigo-close"}>
                <div className="close-div" ><span onClick={addchattoggler}><p className="close-symbol">x</p></span></div>
                <form>
                    <img className='add-amigo-img' src='assets/add-group.png' alt=''></img>
                    <input type="text" placeholder="Username to add to Hive" value={amigousername} onChange={(e) => { setAmigoUsername(e.target.value) }} required />
                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* render error message if it exists */}
                    <button onClick={handleSubmit}>ADD USER</button>
                </form>
            </div>
        </div>
    )
}

export default AddAmigo
