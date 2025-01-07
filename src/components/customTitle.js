import React from "react"
import "../App.css"

export default function CustomTitle({backgroundWord,mainWord}){
    return (
        <div className={"customTitle"}>
            <h1>{backgroundWord}</h1>
            <h2>{mainWord}</h2>
        </div>
    )
}