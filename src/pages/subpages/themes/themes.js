import {useEffect, useState} from "react";
import useApi from "../../../hooks/useApi";
import {useToast} from "../../../hooks/useToast";
import CustomTitle from "../../../components/customTitle";
import {Link} from "react-router-dom";
import Row from "../../../components/row";
import '../../../css/themes.css'
export default function Themes() {

    const api = useApi();
    const toast = useToast();
    const [themes, setThemes] = useState(null);
    useEffect(() => {
        api("api/themes")
            .then(res => {
                setThemes(res);
            })
            .catch(err => {
                toast(" ", "Fetch error :" + err.message);
            })
    }, [])

    return (
        <>
            <CustomTitle backgroundWord={"Top"} mainWord={"Themes"}></CustomTitle>
          <div>
              {themes && themes.map((item, i) => (
                  <Link key={i} to={`/private/theme/${item.id}`}>
                      <Row type={"themes"} name={item.name} number1={item.contributor_count}
                           number2={item.questions_count}></Row> </Link>

              ))}
          </div>

        </>

    )
}