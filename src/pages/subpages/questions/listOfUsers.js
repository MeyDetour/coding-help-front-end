import {Link} from "react-router-dom";
import CustomImage from "../../../components/image";
import useApi from "../../../hooks/useApi";
import {useToast} from "../../../hooks/useToast";
import {useEffect, useState} from "react";

export default function ListOfUsers({listOfUsers}) {


    /* variable you can change*/
    const hideOwnProfile = true;


    /* instanciate */

    const api = useApi();
    const toast = useToast();
    const [followingsId, setFollowings] = useState(null);
    const [listOfUsers, setListOfUsers] = useState(listOfUsers);
    const [ownId, setOwnId] = useState(null);


    /* requests */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api("api/profile/followings")
                let followingsid = []
                for (let following of res) {
                    followingsid.push(following.id)
                }
                setFollowings(followingsid)
                const res2 = await api("api/profile")
                setOwnId(res2.id)
            } catch (err) {
                toast(" ", "Error while fetching profile data : " + err.message);
            }
        };
        fetchData();
    }, []);

    const follow = async function (id) {
        try {
            const res3 = await api("api/follow/user/" + id, null, null, "PATCH", true)

           /* for dynamic render */
            setFollowings(prevFollowings => [...prevFollowings, id]);

        } catch (err) {
            toast(" ", "Error while following user : " + err.message);
        }
    }
    const unfollow = async function (id) {
        try {
            const res3 = await api("api/unfollow/user/" + id, null, null, "PATCH", true)
            setFollowings(prevFollowings => prevFollowings.filter(followingId => followingId !== id));

        } catch (err) {
            toast(" ", "Error while unfollowing user : " + err.message);
        }
    }

    /* template */
    return (<>

            <div className={"usersList"}>
                {listOfUsers && listOfUsers.map((user, index) => {
                    if (hideOwnProfile && user.id === ownId) {
                        return
                    }
                    let userInFollowing = followingsId.includes(user.id);
                    return (
                        <div key={index}>

                            <Link to={`/private/user/${user.id}`} >
                                <div className={"name"}>
                                    <CustomImage link={user.image}></CustomImage>
                                    <span className={"md-text"}>{user.username}</span>
                                </div>
                                <span className={"createdAt"}>{user.created_at}</span>
                                <div className={"counters"}>
                                    <span className={"md-text"}>Followings</span>
                                    <span className={"lg-text"}>{user.followings_count}</span>

                                </div>
                                <div className={"counters"}>
                                    <span className={"md-text"}>Followers</span>
                                    <span className={"lg-text"}>{user.followers_count}</span>
                                </div>
                                <div className={"counters"}>
                                    <img src="/icon/question.svg" alt="question icon"/>
                                    <span className={"md-text"}>{user.questions_count}</span>
                                </div>
                                <div className={"counters"}>
                                    <img src="/icon/clue.svg" alt="clue icon"/>
                                    <span className={"md-text"}>{user.responses_count}</span>
                                </div>


                            </Link> {userInFollowing ?
                            <button className={"button2 xsm-text"} onClick={() => {
                                unfollow(user.id)
                            }}>Unfollow</button> :
                            <button className={"button2 xsm-text"} onClick={() => {
                                follow(user.id)
                            }}>Follow</button>}

                        </div>

                    )


                })}

            </div>
        </>

    )
}