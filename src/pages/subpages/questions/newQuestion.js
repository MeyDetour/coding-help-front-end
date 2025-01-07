import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import useApi from "../../../hooks/useApi";
import {useToast} from "../../../hooks/useToast";
import {Navigate} from "react-router-dom";

import "../../../css/questions.css"
export default function NewQuestion() {

    const api = useApi();
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();


    const [themes, setThemes] = useState(null);
    const [themeId, setThemeId] = useState(null);
    const [redirectRoute, setRedirectRoute] = useState(null);


    useEffect(() => {
        api("api/themes")
            .then(res => {
                setThemes(res);
            })
            .catch(err => {
                toast(" ", "Fetch error :" + err.message);
            })
    }, [])


    const onSubmit = async (data) => {

        let newThemeName = data["newThemeName"].replace(/\s+/g, '');
        delete data["newThemeName"];


        /* if no theme provided */
        if (!newThemeName && !data["themes"]) {
            toast("warning", "You must associate to the theme");
            return;
        }

        /* get theme id as int not string*/
        if (data.themes) {

            let themes = []
            for (let themeId of data.themes) {
                themes.push(parseInt(themeId));
            }
            data["themes"] = themes;
        } else {
            data["themes"] = [];
        }


        /* TO CREATE ONE THEME - IF NEEDED*/
        if (newThemeName !== '') {
            try {
                const res = await api("api/theme/new", null, {"name": newThemeName}, 'POST', true)
                setThemeId(res.id)
            } catch (err) {
                toast(" ", "Error while creating theme : " + err.message);
            }
        }

        /* if theme is found add it to themes list */
        if (themeId !== null) {
            data["themes"].push(themeId);
        }


        /* TO CREATE QUESTION */
        try {
            const res = await api("api/question/new", null, data, 'POST', true)
            setRedirectRoute('/private/question/' + res.id)
        } catch (err) {
            toast(" ", "Error while creating theme : " + err.message);
        }


        console.log("===========================================================")
    };

    if (redirectRoute) {
        return <Navigate to={redirectRoute}/>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"basicForm"}>
            {errors.title && (
                <span className={"error"}>{errors.title.message}</span>
            )}
            {errors.content && (
                <span className={"error"}>{errors.content.message}</span>
            )} {errors.themes && (
            <span className={"error"}>{errors.themes.message}</span>
        )}

            <label>
                Title
                <input
                    placeholder='how do chickens lay eggs? '
                    {...register("title", {
                        required: "You must provide title",
                    })}
                />
            </label>

            {/* Champ requis avec validation */}
            <label>
                Content
                <textarea
                    placeholder="Your question content"
                    {...register("content", {required: "Content field is required"})}
                />
            </label>

            <fieldset>
                <legend>Choose themes's corresponding</legend>
                {themes && themes.map((theme, index) => (
                    <div className={"oneChoice"} key={index}>
                        <input type="checkbox" id={theme.id} name={"themes"} value={theme.id}
                               {...register("themes"
                               )}

                        />
                        <span htmlFor={theme.id}>{theme.name}</span>
                    </div>
                ))}

            </fieldset>
            <label>
                Other theme
                <input
                    placeholder='Another theme not created '
                    {...register("newThemeName")}
                />
            </label>
            {/* Bouton de soumission */
            }
            <button type="submit" className={"button1"} value="Submit">Create</button>

        </form>

    )
}