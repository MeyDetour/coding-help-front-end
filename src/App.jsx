import './css/home.css'
import './App.css';
import {Link} from "react-router-dom";

function App() {



    return (
        <>
            <div className="homePage">

                <div className="header">
                    <img src="/logo.svg" alt="logo coding help"/>
                    <div>

                        <Link className={"button0"}  to={"/login"}>Login</Link>
                        <Link className={"button1"} to={"/register"}>Register</Link>
                    </div>
                </div>


                <p>
                    <span className={"titleSpan1 fs-60"}>Coding</span>
                    <span className={"titleSpan2 fs-60"}>Help</span>
                    is a collaborative platform where developers ask, share, and solve coding challenges
                    <span className={"greyText"}>—like Stack Overflow, but tailored for an even more engaging community experience.</span>
                </p>


                <div className="descriptionContainer">
                    <div className="oneTechno" id={"reactSection"}>
                        <div className="logoBackground">
                            <img src="/icon/react.svg" alt="ractIcon"/>
                        </div>
                        <span>React</span>
                        <p>React.js is used for the frontend, ensuring modularity and seamless interaction with the
                            Django backend via APIs. Read the documentation</p>
                    </div>
                    <div className="oneTechno" id={"djangoSection"}>
                        <div className="logoBackground">
                            <img src="/icon/django.svg" alt="djangoIcon"/>
                        </div>
                        <span>Django</span>
                        <p>Django with PostgreSQL creates a reliable, scalable backend, while Django REST builds
                            flexible APIs for seamless communication in modern web applications.</p>
                    </div>
                    <div className="oneTechno" id={"postgresqlSection"}>
                        <div className="logoBackground">
                            <img src="/icon/postgresql.svg" alt="postgresqlIcon"/>
                        </div>
                        <span>PostgreSQL</span>
                        <p>PostgreSQL powers the database, providing a robust and reliable foundation for managing data
                            with Django backend support.</p>
                    </div>

                </div>

            </div>
        </>


    );
}

export default App;
