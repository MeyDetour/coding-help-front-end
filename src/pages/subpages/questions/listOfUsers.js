import {Link} from "react-router-dom";
import Row from "../../../components/row";
import CustomImage from "../../../components/image";

export default function ListOfUsers({listOfUsers}) {


    return (<>

            <div className={"usersList"}>
                {listOfUsers && listOfUsers.map((user, index) => (
                    <Link to={`/private/user/${user.id}`} key={index}>
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
                    </Link>

              ))}

            </div>
        </>

    )
}