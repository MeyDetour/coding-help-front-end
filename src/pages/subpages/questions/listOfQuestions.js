import {Link} from "react-router-dom";
import Row from "../../../components/row";

export default function ListOfQuestions({listOfQuestions}) {

    return (
        <>

            <div className={"questionsList"}>
                {listOfQuestions && listOfQuestions.map((question, index) => (

                            <Link to={`/private/question/${question.id}`} key={index}>
                                <Row name={question.title} type={"question"} number1={question.contributor_count}
                                     number2={question.responses_count} isQuestionValidate={question.isValidate}></Row>

                            </Link>

                    )
                )
                }

            </div>
        </>

    )
}