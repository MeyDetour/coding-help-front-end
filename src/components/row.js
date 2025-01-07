export default function Row({name, type, number1, number2,isQuestionValidate=null}) {
    return (
        <div className={"rowForList"}>
            <span>{name}</span>
            <div className={"icons"}>
                <div>
                   <img src="/icon/people.svg" alt="contributor icon"/>
                    <span>{number1}</span>
                </div>

                <div>
                    {type === "themes" && <img src="/icon/question.svg" alt="question icon"/>}
                    {type === "question" && <img src="/icon/clue.svg" alt="question responses"/>}
                    <span>{number2}</span>
                </div>

                {isQuestionValidate ?
                    <img src="/icon/good.svg" alt="icon true"/>
                    :
                    <img src="/icon/bad.svg" alt="icon false"/>
                }

            </div>

        </div>

    )
}