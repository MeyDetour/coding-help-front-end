import {Navigate, useNavigate} from "react-router-dom";

export default function useApi() {
    const navigate = useNavigate();


    const apiCall = async (link, headers = {}, body = null, method = "GET", needAuthorization = true) => {
        try {
            console.log(`${process.env.REACT_APP_API_URL}${link}`)
            const response = await fetch(`${process.env.REACT_APP_API_URL}${link}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...(needAuthorization && {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }),
                    ...headers,
                },
                body: body ? JSON.stringify(body) : null,
            });
            if (!response.ok) {
                // Gérer les erreurs HTTP
                const errorData = await response.json();
                throw { status: response.status, data: errorData };
            }

            const data = await response.json();
            console.log(response.status,data);
            return data; // Retourne les données
        } catch (error) {
            console.log(error)
             if (error.status === 401) {
                sessionStorage.removeItem("token");
                navigate("/login");
                throw new Error("Your session has expired. Please log in again.");
            }
            throw new Error(error.data?.message || "An unexpected error occurred.");
        }
    };

    return apiCall;
}
