import useApi from "../../../hooks/useApi";
import {useEffect, useState} from "react";
import {useToast} from "../../../hooks/useToast";

import "../../../css/profile.css"
import CustomImage from "../../../components/image";
import ListOfQuestions from "../questions/listOfQuestions";
import ListOfUsers from "../questions/listOfUsers";
import ProfileSections from "./profileSections";

export default function Profile() {

    const api = useApi();
    const toast = useToast();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await api("api/profile")
                setProfile(res)

            } catch (err) {
                toast(" ", "Error while fetching profile data : " + err.message);
            }
        };
        fetchData();
    }, []);



    return (
        <>
            {(profile) &&
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

                    </div>

                    <div className={"hr"}></div>
                    <ProfileSections profile={profile}   ></ProfileSections>
                </>
            }


        </>

    )
}