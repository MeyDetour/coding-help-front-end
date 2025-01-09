import useApi from "../../hooks/useApi";
import CustomTitle from "../../components/customTitle";
import {useToast} from "../../hooks/useToast";
import "../../css/settings.css"
import {useEffect} from "react";
import SettingsSection from "./settingsSection";

export default function Settings() {

    const api = useApi();
    const toast = useToast();
    useEffect(() => {
        api("api/themes")
            .then(res => {

            })
            .catch(err => {
                toast(" ", "Fetch error :" + err.message);
            })
    },[])

    const deleteAccount = async function () {
        try {
            const res3 = await api("api/profile", null, null, "DELETE", true)
            console.log(res3)
        } catch (err) {
            toast(" ", "Error while fetching profile data : " + err.message);
        }
    }

    return (
        <> <CustomTitle backgroundWord={"Top"} mainWord={"Settings"}></CustomTitle>

<SettingsSection></SettingsSection>
        </>


    )
}