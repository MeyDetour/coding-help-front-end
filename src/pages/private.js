import "../css/private.css"
import {Link, Navigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import Dashboard from "./subpages/dashboard";
import Profile from "./subpages/profile";
import Settings from "./subpages/settings";
import NewQuestion from "./subpages/questions/newQuestion";
import Themes from "./subpages/themes/themes";
import OneTheme from "./subpages/themes/oneTheme";
import OneQuestion from "./subpages/questions/oneQuestion";
import Users from "./subpages/user/users";

export default function Private() {
    const { subpage, '*': wildcard } = useParams();
    const [redirectRoute, setRedirectRoute] = useState(null);

    console.log(subpage)

    const deconnexion = function (){
        sessionStorage.setItem("token", " ")
        setRedirectRoute("/login")
    }
    if (redirectRoute) {
        return <Navigate to={redirectRoute}/>;
    }
    return (
        <div className={"privatePage"}>
            <nav>
                <div>
                    <img src="/logo.svg" alt="" width={"56px"}/>
                    <span className={"titleSpan1"}>Coding</span>
                    <span className={"titleSpan2"}>Help</span>
                </div>
                <ul>
                    <li>
                        <Link to={"/private/ask"} className={subpage === "ask" ? "focus" : null}>Ask question</Link>
                    </li>
                    <li>
                        <Link to={"/private/dashboard"} className={subpage === "dashboard" ? "focus" : null}>Dashboard</Link>
                    </li>
                    <li>
                        <Link to={"/private/themes"} className={subpage === "themes" || subpage.startsWith("theme")|| subpage.startsWith("question") ? "focus" : null}>All
                            themes</Link>
                    </li>

                    <li>
                        <Link to={"/private/users"} className={subpage === "users" ? "focus" : null}>All users</Link>
                    </li><li>
                        <Link to={"/private/profile"} className={subpage === "profile" ? "focus" : null}>You
                            profile</Link>
                    </li>
                    <li>
                        <Link to={"/private/settings"}
                              className={subpage === "settings" ? "focus" : null}>Settings</Link>
                    </li>
                </ul>
                <span  onClick={deconnexion}>Deconnexion</span>


            </nav>
            <div className={`content
            ${subpage === 'dashboard' ? "dashboardPage" : " "}
            ${subpage === 'themes' ? "themesPage" : " "}
            ${subpage.startsWith("theme") ? "themePage" : " "}
            ${subpage.startsWith("question") ? "questionPage" : " "}
            ${subpage === 'profile' ? "profilePage" : " "}
            ${subpage === 'users' ? "usersPage" : " "}
            ${subpage === 'settings' ? "settingsPage" : " "}
            ${subpage === 'ask' ? "newQuestionPage" : " "}
            `}>
                {subpage === "dashboard" && <Dashboard/>}
                {subpage === "themes" && <Themes/>}
                {subpage === "users" && <Users/>}
                {subpage === "theme" && wildcard && <OneTheme themeId={wildcard} />}
                {subpage === "question" && wildcard && <OneQuestion questionId={wildcard}  />}
                {subpage === "profile" && <Profile/>}
                {subpage === "settings" && <Settings/>}
                {subpage === "ask" && <NewQuestion/>}
            </div>
        </div>
    )
}