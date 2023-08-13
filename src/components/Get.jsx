import React, { useEffect, useState } from"react";
import "./Get.css";
import Posts from "./Posts"

const Get=()=>{
    const [username,setUsername]=useState('');
    const Getdata=async()=>{
    let response=await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data=await response.json();
        setUsername(data.name);        
    }
        useEffect(()=>{
            Getdata();
        },[]);

    return(
        <div className="container"> 
            <div className="center">
                <h3>🙏 Welcome, {username}</h3>
            </div>
            <div>
            <Posts/>
            </div>
            </div>
    )
}
export default Get;