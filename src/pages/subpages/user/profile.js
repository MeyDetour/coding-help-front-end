import useApi from "../../../hooks/useApi";
import {useEffect, useState} from "react";
import {useToast} from "../../../hooks/useToast";

import "../../../css/profile.css"
import CustomImage from "../../../components/image";
import ListOfQuestions from "../questions/listOfQuestions";

export default function Profile() {

    const api = useApi();
    const toast = useToast();
    const [profile, setProfile] = useState(null);
    const [data, setData] = useState(null);
    const [subpage, setSubpage] = useState("questions");
    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await api("api/profile")
                setProfile(res)
                const res2 = await api("api/profile/questions")
                setData(res2)
            } catch (err) {
                toast(" ", "Error while fetching profile data : " + err.message);
            }
        };
        fetchData();
    }, []);


    const deleteAccount = async function () {
        try {
            const res3 = await api("api/profile",null,null,"DELETE",true)
            console.log(res3)
        } catch (err) {
            toast(" ", "Error while fetching profile data : " + err.message);
        }
    }


    const changeSubpage = async function (subpage) {

        try {
            const res= await api("api/profile/" + subpage)
            setData(res)
            setSubpage(subpage)
        } catch (err) {
            toast(" ", "Error while fetching profile data : " + err.message);
        }
    }
    console.log(subpage)

    return (
        <>
            {(profile && data) &&
                <>
                    {/* row section 1 */}
                    <div className={"section1"}>
                        {/* col */}
                        <CustomImage link={profile.image}></CustomImage>
                        {/* col */}
                        <div>
                            <span className={"lg-bold-text"}>{profile.username}</span>
                            <span className={"md-text"}>{profile.email}</span>
                            <span className={"md-text"}>{profile.created_at}</span>
                        </div>
                        <button onClick={deleteAccount}>Supprimer</button>

                    </div>

                    <div className={"hr"}></div>
                    {/* row section2 */}
                    <div className={"section2"}>
                        <ul>

                            <li onClick={()=>{changeSubpage("questions")}}>
                                <span className={`md-text ${subpage === "questions" ? "focus" : " "}`}>Questions</span>
                                <span className={"lg-text"}>{profile.questions_count}</span>
                            </li>
                            <li onClick={()=>{changeSubpage("followings")}}>
                                <span
                                    className={`md-text ${subpage === "followings" ? "focus" : " "}`}>Followings</span>
                                <span className={"lg-text"}>{profile.followings_count}</span>
                            </li>
                            <li onClick={()=>{changeSubpage("followers")}}>
                                <span className={`md-text ${subpage === "followers" ? "focus" : " "}`}>Followers</span>
                                <span className={"lg-text"}>{profile.followers_count}</span>
                            </li>
                            <li onClick={()=>{changeSubpage("responses")}}>
                                <span className={`md-text ${subpage === "responses" ? "focus" : " "}`}>Responses</span>
                                <span className={"lg-text"}>{profile.responses_count}</span>
                            </li>


                        </ul>

                        {subpage === "questions" ? <ListOfQuestions listOfQuestions={data}></ListOfQuestions> :
                            subpage === "followings" ? <span>Follownigs</span> :
                                subpage === "followers" ? <span>followers</span> :
                                    subpage === "responses" ? <span>responses</span> :
                                        subpage === "themes" ? <span>themes</span> :
                                            subpage === "votes" ? <span>votes</span> :
                                                null

                        }

                    </div>
                </>
            }


        </>

    )
}