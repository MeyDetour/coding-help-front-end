import {useEffect, useState} from "react";
import useApi from "../../../hooks/useApi";
import {useToast} from "../../../hooks/useToast";
import CustomTitle from "../../../components/customTitle";
import {Link} from "react-router-dom";
import '../../../css/themes.css'
export default function Users() {

    const api = useApi();
    const toast = useToast();
    const [users, setUsers] = useState(null);
    useEffect(() => {
        api("api/users/")
            .then(res => {
                setUsers(res);
            })
            .catch(err => {
                toast(" ", "Fetch error :" + err.message);
            })
    }, [])

    return (
        <>
            <CustomTitle backgroundWord={"Top"} mainWord={"Themes"}></CustomTitle>
          <div>
              {users && users.map((item, i) => (
                  <Link key={i} to={`/private/user/${item.id}`}>
                 <span>{item.username}</span>
                  </Link>

              ))}
          </div>

        </>

    )
}