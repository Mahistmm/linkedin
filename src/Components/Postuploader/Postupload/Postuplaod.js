import React, { useState } from "react";
import "./Postupload.css";
import { Avatar,LinearProgress } from "@mui/material";
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {storage,dp, timestamp} from '../../../firebase'
import { addDoc,collection } from "firebase/firestore";

const Postuplaod = ({ user }) => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0)


  const handleclick = (event)=>{
       event.preventDefault();
       console.log("submitted",input,image);
       const storageRef = ref(storage,`images/${image.name}`)
       const uplaodtask = uploadBytesResumable(storageRef,image);

       uplaodtask.on("state_changed",(snapshot)=>{
        const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes) * 100
        setProgress(progress)
       },(err)=>{
        console.log(err);
       },()=>{
        getDownloadURL(uplaodtask.snapshot.ref).then(async(downloadURL)=>{
          await addDoc(collection(dp,"posts"),{
            message:input,
            timestamp:timestamp,
            profilepic:user.photoURL,
            username:user.displayName,
            image:downloadURL
          });
           setImage("");
           setInput("");
           setProgress(0)
        });
       })
  }

  return (
    <div className="postupload">
      <div className="upload_input">
        <Avatar src={user.photoURL} />{" "}
      </div>
      <form>
        <input
          type="text"
          placeholder="Start a post"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <div className="uploads">
          <input
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
          />
          <button type="submit" onClick={handleclick}>
            random
          </button>
        </div>
      </form>
      {progress > 0 && (
        <LinearProgress variant="determinate" value={progress} />
      )}
    </div>
  );
};

export default Postuplaod;
