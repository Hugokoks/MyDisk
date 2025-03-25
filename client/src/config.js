

const port = 8888;
const url = `http://127.0.0.1:${port}`;


const apis = {

    user_create: `${url}/api/create/user`,
    user_validate: `${url}/api/patch/user_validate`,
    user_login: `${url}/api/post/user_login`,

}


export { apis }