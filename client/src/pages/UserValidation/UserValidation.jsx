import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './index.module.css'
import { useEffect, useState } from 'react';
import { patchFetch } from '../../functions/patchFetch';
import { apis } from '../../config';

function UserValidatino() {
    const [error, setError] = useState({ status: false, message: "" });
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");


    async function handleTokenPost() {


        const res = await patchFetch({ data: { token }, url: apis.user_validate, setError });

        if (res.status === 'ok') {
            navigate("/login");
        }

    }

    useEffect(() => {

        if (token === null) navigate("/register")

        handleTokenPost();

    }, [])

    useEffect(() => {

        if (error.status === true) navigate("/register")

    }, [error])

    if (!error.status)
        return (



            <div className={styles.container}>


                <p className={styles.title}>Your Account has been validated</p>


            </div>
        )
}

export default UserValidatino
