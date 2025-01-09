import {useForm} from "react-hook-form";
import React from "react";
import "../../../css/response.css"
import useApi from "../../../hooks/useApi";
import {useToast} from "../../../hooks/useToast";
import ContentTextAreaMarkdown from "../../../components/contentTextAreaMarkdown";

export default function NewResponse({classname,questionId}) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
const api = useApi();
const toast = useToast();

    const onSubmit = async (values) => {
        values["question"] = questionId;
        alert(JSON.stringify(values));
        try {
            const res3 = await api("api/response/new", null,  values , "POST", true)
            console.log(res3)
        } catch (err) {
            toast(" ", "Error while fetching profile data : " + err.message);
        }
    }

    return <div
    className={classname}
    >
        <form action="" onSubmit={handleSubmit(onSubmit)} className="basicForm">
            {errors.content && (
                <span className={"error"}>{errors.content.message}</span>
            )}
            <label>
                Your response
                <ContentTextAreaMarkdown register={register}></ContentTextAreaMarkdown>
                <button type="submit" className={"button1"} value="Submit">Create</button>

            </label>
        </form>


    </div>
}