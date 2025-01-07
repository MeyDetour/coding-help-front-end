import React from "react"
import "../App.css"

export default function CustomImage({link}){
    return (
        <img src={link ? process.env.REACT_APP_API_URL +link : "/defaultImage.png"} alt=""/>
    )
}