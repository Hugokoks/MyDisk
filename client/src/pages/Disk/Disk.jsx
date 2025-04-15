import { useEffect, useState } from "react"
import { getFetch } from "../../functions/getFetch";
import { apis } from "../../config";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";

function Disk() {

    const [error, setError] = useState({ status: false, message: "" });
    const navigate = useNavigate();

    ////validate jswtoken and getting data
    async function gettingData() {
        const token = localStorage.getItem("token");
        await getFetch({ token, url: apis.user_disk_data, setError });

    }

    /////validate JWT 
    useEffect(() => {
        gettingData();
    }, [])

    /////handle error
    useEffect(() => {

        if (error.status && error.message === "rejected") {
            navigate('/login');
        }
    }, [error, navigate])

    //////load data

    return (
        <div>
            <Logo />

        </div>
    )
}

export default Disk
