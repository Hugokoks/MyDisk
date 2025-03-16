export async function postFetch({ data, setError, isLoading }) {
  try {
    const res = await fetch("http://127.0.0.1:8888/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    console.log(json);
  } catch (err) {
    console.log(err.message);
  }
}
