import useApi from "../../hooks/useApi";
import CustomTitle from "../../components/customTitle";
import {useToast} from "../../hooks/useToast";
import "../../css/settings.css"
import {useEffect, useState} from "react";

export default function SettingsSection() {

    const api = useApi();
    const toast = useToast();
    const [subpage, setSubpage] = useState(null);
    useEffect(() => {
        api("api/themes")
            .then(res => {

            })
            .catch(err => {
                toast(" ", "Fetch error :" + err.message);
            })
    }, [])

    const deleteAccount = async function () {
        try {
            const res3 = await api("api/profile", null, null, "DELETE", true)
            console.log(res3)
        } catch (err) {
            toast(" ", "Error while fetching profile data : " + err.message);
        }
    }
    const changeSettings = async function (sub) {
        setSubpage(sub);
    }

    return (
        <>
            <ul>
                <li onClick={() => changeSettings("appearance")} className={subpage === "appearance" ? "focus" : ""}>
                    <span>Appearance</span>
                </li>
                <li onClick={() => changeSettings("account")} className={subpage === "account" ? "focus" : ""}>
                    <span>Account</span>
                </li>
            </ul>
            <div className={"hr"}></div>

            {subpage === "appearance" ?  <div className="appearance"></div> :

                subpage === "account" ? <button onClick={deleteAccount}>Supprimer</button> :

                    null

            }


        </>


    )
}