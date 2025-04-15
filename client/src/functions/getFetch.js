
export async function getFetch({ setError = () => { }, setIsLoading = () => { }, url, token = "" }) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        setIsLoading(true)
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },
            signal
        });

        const json = await res.json();

        console.log(json);
        if (json.status === "error") throw json

        return json;

    } catch (err) {

        setError(prev => ({ ...prev, status: true, message: err.message }));
    }
    finally {
        setIsLoading(false)
    }
    return () => {
        controller.abort();

    }

}
