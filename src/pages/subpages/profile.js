import useApi from "../../hooks/useApi";
import {useEffect, useState} from "react";
import {useToast} from "../../hooks/useToast";

import "../../css/profile.css"
import CustomImage from "../../components/image";
export default function Profile() {

    const api = useApi();
    const toast = useToast();
    const [profile, setProfile] = useState({});
    useEffect(() => {
        api("api/profile")
            .then(res => {
                setProfile(res);
            })
            .catch(err => {
                toast(" ", "Fetch error :" + err.message);
            })
    }, [])


    return (
        <>
            {/* row section 1 */}
            <div className={"section1"}>
                {/* col */}
                <CustomImage link={process.env.REACT_APP_API_URL + profile.image}></CustomImage>
                {/* col */}
                <div>
                    <span>{profile.username}</span>
                    <span>{profile.first_name} {profile.last_name}</span>
                    <span>{profile.email}</span>
                </div>

            </div>


            {/* row section2 */}
            <div>
                <span>{profile.followers_count}</span>
                <span>{profile.followings_count}</span>
                <span>{profile.question_count}</span>
                <span>{profile.responses_count}</span>
                <span>{profile.themes_count}</span>
                <span>{profile.vote_count}</span>
            </div>


        </>

    )
}