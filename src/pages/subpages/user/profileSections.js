
import "../../../css/profile.css"
import ListOfQuestions from "../questions/listOfQuestions";
import ListOfUsers from "../questions/listOfUsers";
import {useEffect, useState} from "react";
import useApi from "../../../hooks/useApi";
import {useToast} from "../../../hooks/useToast";
import ListOfResponseInfProfile from "../response/listOfResponseInfProfile";

export default function ProfileSections({profile}) {

    const [subpage, setSubpage] = useState("questions");
    const api = useApi();
    const toast = useToast();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api("api/profile/questions")
                setData(res)

            } catch (err) {
                toast(" ", "Error while fetching profile data : " + err.message);
            }
        };
        fetchData();
    }, []);
    const changeSubpage = async function (subpage) {

        try {
            setData(null);
            const res = await api("api/profile/" + subpage)
            setData(res)
            setSubpage(subpage)
        } catch (err) {
            toast(" ", "Error while fetching profile data : " + err.message);
        }
    }

    return (
        <>
            {(data && profile)&&
                <>
                    <div className={"section2"}>
                        <ul>

                            <li onClick={() => {
                                changeSubpage("questions")
                            }}>
                                <span className={`md-text ${subpage === "questions" ? "focus" : " "}`}>Questions</span>
                                <span className={"lg-text"}>{profile.questions_count}</span>
                            </li>
                            <li onClick={() => {
                                changeSubpage("followings")
                            }}>
                                <span
                                    className={`md-text ${subpage === "followings" ? "focus" : " "}`}>Followings</span>
                                <span className={"lg-text"}>{profile.followings_count}</span>
                            </li>
                            <li onClick={() => {
                                changeSubpage("followers")
                            }}>
                                <span className={`md-text ${subpage === "followers" ? "focus" : " "}`}>Followers</span>
                                <span className={"lg-text"}>{profile.followers_count}</span>
                            </li>
                            <li onClick={() => {
                                changeSubpage("responses")
                            }}>
                                <span className={`md-text ${subpage === "responses" ? "focus" : " "}`}>Responses</span>
                                <span className={"lg-text"}>{profile.responses_count}</span>
                            </li>


                        </ul>

                        {subpage === "questions" ? <ListOfQuestions listOfQuestions={data}></ListOfQuestions> :
                            subpage === "followings" ? <ListOfUsers listOfUsersData={data}></ListOfUsers> :
                                subpage === "followers" ? <ListOfUsers listOfUsersData={data}></ListOfUsers> :
                                    subpage === "responses" ? <ListOfResponseInfProfile listOfUserResponse={data} ></ListOfResponseInfProfile> :
                                                null

                        }

                    </div>
                </>

            }


        </>

    )
}