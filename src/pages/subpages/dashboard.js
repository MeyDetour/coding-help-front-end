
import useApi from "../../hooks/useApi";
import CustomTitle from "../../components/customTitle";
import {useState} from "react";
import {useToast} from "../../hooks/useToast";
import "../../css/dashboard.css"

export default function Dashboard() {

    const api = useApi();
    const toast = useToast();
    const [themes, setThemes] = useState({});
    api("api/themes")
        .then(res=>{
            setThemes(res.data);
        })
        .catch(err=>{
            toast(" ","Fetch error :" + err.message);
        })


    return (
<CustomTitle backgroundWord={"Top"} mainWord={"Dashboard"}></CustomTitle>


    )
}