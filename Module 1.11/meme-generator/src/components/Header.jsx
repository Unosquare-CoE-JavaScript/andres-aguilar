import React from "react";

export default function Header() {
    return(
        <header className={"header"}>
            <img className={"header--image"} src={"img/troll-face.png"} alt="logo" />
            <h2 className={"header--title"}>Meme Generator</h2>
            <h2 className={"header--project"}>React Course - Project 3</h2>
        </header>
    )
}