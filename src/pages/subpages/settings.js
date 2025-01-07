import useApi from "../../hooks/useApi";
import CustomTitle from "../../components/customTitle";
import {useToast} from "../../hooks/useToast";
import "../../css/settings.css"

export default function Settings() {

    const api = useApi();
    const toast = useToast();
    api("api/themes")
        .then(res => {

        })
        .catch(err => {
            toast(" ", "Fetch error :" + err.message);
        })

    return (
        <CustomTitle backgroundWord={"Top"} mainWord={"Settings"}></CustomTitle>


    )
}