import {useEffect, useState} from "react";

import "../../../css/questions.css"
import useApi from "../../../hooks/useApi";
import {useToast} from "../../../hooks/useToast";
import CustomTitle from "../../../components/customTitle";
import {Navigate} from "react-router-dom";
import CustomImage from "../../../components/image";
import {useForm} from "react-hook-form";
import NewResponse from "../response/newResponse";

export default function OneQuestion({questionId}) {

    const api = useApi();
    const toast = useToast();
    const [question, setQuestion] = useState(null);
    const [navigateTo, setNavigateTo] = useState(null);
    const [addResponse, setAddResponse] = useState(false);

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
    console.log(addResponse);
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

                    <div className={"row"}>

                        <div className={`left ${addResponse ? "left-open" : " "}`}>

                            <div className={"authorSection"}>

                                <CustomImage link={question.author.image}> </CustomImage>

                                <span className={"md-text"}>{question.author.username}</span>

                            </div>
                            <div className={"questionContent"}>

                                {/* content of question */}
                                <p>{question.content}</p>

                                {/* responses of question */}
                                {
                                    question.responses && question.responses.map(response => (
                                        <>
                                            <div className="hr"></div>

                                            <details className={"oneResponse"} id={response.id}>
                                                <summary>

                                                    <div>
                                                        <CustomImage
                                                            link={response.author_data.image}></CustomImage>
                                                        <span>{response.author_data.username}</span>
                                                    </div>


                                                    <div>
                                                        <span className={"xsm-text"}>{response.created_at}</span>

                                                        <div>
                                                            <span className={"sm-text"}>{response.upvote_count}</span>
                                                            <img src="/icon/good.svg" alt="icon true"/>
                                                        </div>
                                                        <div>
                                                            <span className={"sm-text"}>{response.downvote_count}</span>
                                                            <img src="/icon/bad.svg" alt="icon false"/>
                                                        </div>
                                                    </div>


                                                </summary>
                                                <div className="responseContent">
                                                    {response.content}
                                                </div>
                                            </details>


                                        </>

                                    ))
                                }

                                {/* add new question */}
                                <button onClick={() => {
                                    setAddResponse(true)
                                }} className={"button2"}>New response
                                </button>

                            </div>


                        </div>
                        <NewResponse classname={`right ${addResponse ? "d-flex" : "d-none"}`}
                                     questionId={question.id}></NewResponse>
                    </div>
                </>
            }
        </>

    )
}