import {useEffect, useState} from "react";

import "../../../css/questions.css"
import useApi from "../../../hooks/useApi";
import {useToast} from "../../../hooks/useToast";
import CustomTitle from "../../../components/customTitle";
import {Navigate} from "react-router-dom";
import CustomImage from "../../../components/image";

export default function OneQuestion({questionId}) {

    const api = useApi();
    const toast = useToast();
    const [question, setQuestion] = useState(null);
    const [navigateTo, setNavigateTo] = useState(null);

    useEffect(() => {
        api(`api/question/${questionId}`)
            .then(res => {
                setQuestion(res);

            })
            .catch(err => {
                toast(" ", "Fetch error :" + err.message);
            })
    }, [])


    if (!questionId) {
        setNavigateTo('/private/themes')
    }
    if (navigateTo) {
        return <Navigate to={navigateTo}/>
    }
    return (
        <>
            {question &&
                <>

                    <div className={"titleHeader"}>
                        <span className={"md-bold-text"}>{question.title}</span>
                        <div>
                            <span className={"xsm-text"}>{question.created_at}</span>
                            <div>
                                <img src="/icon/people.svg" alt="icon contributor"/>
                                <span className={"sm-text"}>{question.contributor_count}</span>
                            </div>
                            <div>
                                <img src="/icon/clue.svg" alt="icon contributor"/>
                                <span className={"sm-text"}>{question.responses.length}</span>
                            </div>
                            {question.isValidate ?
                                <img src="/icon/good.svg" alt="icon true"/>
                                :
                                <img src="/icon/bad.svg" alt="icon false"/>
                            }
                        </div>
                    </div>
                    <div className={"authorSection"}>

                            <CustomImage link={question.author.image}> </CustomImage>

                            <span className={"md-text"}>{question.author.username}</span>

                    </div>
                    <div className={"questionContent"}>
                        <p>{question.content}</p>

                        {
                            question.responses && question.responses.map(response => (
                                <>
                                    <div className="hr"></div>
                                    <div id={response.id}>
                                        <div><CustomImage
                                            link={response.author.image}></CustomImage>

                                            <span>{response.author.username}</span>

                                        </div>
                                        <div>
                                            <span>{response.created_at}</span>

                                            <div>
                                                <span>{response.upvote_count}</span>
                                                <img src="/icon/good.svg" alt="icon true"/>
                                            </div>
                                            <div>
                                                <span>{response.downvote_count}</span>
                                                <img src="/icon/bad.svg" alt="icon false"/>
                                            </div>
                                        </div>

                                    </div>
                                </>
                            ))
                        }
                    </div>


                </>
            }
        </>

    )
}