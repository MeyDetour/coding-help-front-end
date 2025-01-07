import React from "react"
import "../App.css"

export default function CustomImage({link}){
    return (
        <img src={link ? link : "/defaultImage.png"} alt=""/>
    )
}