import {Link} from "react-router-dom";

export default function ListOfResponseInfProfile({listOfUserResponse}) {
    return (
        <div className="listOfResponsesInProfile">
            {
                listOfUserResponse.map((item, index) => (
                    <Link to={"/private/question/" + item.question}>
                        <div>
                            <div className="decoration"></div>
                            <span>{item.question_data.title}</span>
                        </div>
                        <div>
                            <span className={"xsm-text"}>{item.created_at}</span>

                            <div>
                                <span className={"sm-text"}>{item.upvote_count}</span>
                                <img src="/icon/good.svg" alt="icon true"/>
                            </div>
                            <div>
                                <span className={"sm-text"}>{item.downvote_count}</span>
                                <img src="/icon/bad.svg" alt="icon false"/>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>


    )
}