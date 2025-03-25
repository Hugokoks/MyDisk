
export async function patchFetch({ data, setError = () => { }, setIsLoading = () => { }, url }) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        setIsLoading(true)
        const res = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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
