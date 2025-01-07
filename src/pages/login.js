import {useForm} from "react-hook-form"
import "../css/login.css"
import {Link, Navigate} from "react-router-dom";
import useApi from "../hooks/useApi";
import {ToastContainer, toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {useToast} from "../hooks/useToast";
import React from "react";

export default function Login() {
    const api = useApi();
    const toast = useToast();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => {
        api("/login", null, data, "post", false)
            .then((res) => {
                toast("OK", "Login Successfully");
                sessionStorage.setItem("token", res.access);
                navigate("/private/dashboard");
            })
            .catch((err) => {
                toast(" ", "Error while login :" + err.message);

            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"loginPage basicForm"}>
            <h1>
                <img src="/logo.svg" alt=""/>
                <span className={"titleSpan1"}>Coding</span>
                <span className={"titleSpan2"}>Help</span>
            </h1>
            <p className={"md-text"}>Welcome to coding help - let’s log in your account !</p>
            {errors.email && (
                <span className={"error md-text"}>{errors.email.message}</span>
            )} {errors.password && (
            <span className={"error md-text"}>{errors.password.message}</span>
        )}

            <label>
                <input
                    placeholder="Your email"
                    defaultValue='mey@meydeeetour.com'
                    {...register("email", {
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address",
                        },
                    })}
                />
            </label>

            {/* Champ requis avec validation */}
            <label>
                <input
                    placeholder="Your password"
                    defaultValue={"meymey"}
                    type="password"
                    {...register("password", {required: "This field is required"})}
                />
            </label>


            {/* Bouton de soumission */}
            <button type="submit" className={"button1"} value="Submit">Login</button>
            <Link to={"/register"} className={"xsm-text"}>You don't have account ? Register</Link>

        </form>

    )
}