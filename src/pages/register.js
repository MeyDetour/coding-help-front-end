import {useForm, SubmitHandler} from "react-hook-form"
import "../css/login.css"
import {Link, useNavigate} from "react-router-dom";
import useApi from "../hooks/useApi";
import {useToast} from "../hooks/useToast";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const api = useApi();
    const toast = useToast();
    const navigate = useNavigate();

    console.log(process.env.REACT_APP_API_URL);
    const onSubmit = (data) => {
        console.log(data);
        alert(`Form submitted: ${JSON.stringify(data)}`);
        api("/register", null, data, "post", false)
            .then((res) => {
                console.log(res);
                toast("OK", "Register Successfully. You can log in");
                navigate("/login");
            })
            .catch((err) => {
                toast(" ", "Error while login :" + err.message);

            });
    }
    return (
            <form onSubmit={handleSubmit(onSubmit)} className={"loginPage basicForm"}>
                <h1>
                    <img src="/logo.svg" alt=""/>
                    <span className={"titleSpan1"}>Coding</span>
                    <span className={"titleSpan2"}>Help</span>
                </h1>
                <p className={"md-text"}>Welcome to coding help - let’s create your account !</p>
                {errors.email && (
                    <span className={"error md-text"}>{errors.email.message}</span>
                )}  {errors.username && (
                    <span className={"error md-text"}>{errors.username.message}</span>
                )} {errors.password && (
                <span className={"error md-text"}>{errors.password.message}</span>
            )}

                <label>
                    <input
                        placeholder="Create username"
                        {...register("username",{
                            required: "Username is required",
                        })}
                    />
                </label>

                <label>
                    <input
                        placeholder="Your email"
                        {...register("email", {
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email address",
                            },
                            required: "Email is required",
                        })}
                    />
                </label>

                {/* Champ requis avec validation */}
                <label>
                    <input
                        placeholder="Your password"
                        type="password"
                        {...register("password", {required: "This field is required"})}
                    />
                </label>


                {/* Bouton de soumission */}
                <button type="submit" className={"button1"} value="Submit">Register</button>
                <Link to={"/login"} className={"xsm-text"}>You already have an account ? Login</Link>

            </form>

    )
}