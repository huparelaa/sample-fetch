import axios from "axios";

const api = axios.create({
    baseURL: "https://api.unticketparabernabeu.com/usuario/"
});

const options = ["1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"]

const login = async (email, clave) => {
    try {
        const response = await api.post("login", { email, clave });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//run main
const getToken = async () => {
    const email = "jelax19327@huleos.com"
    const clave = "1RUX6V*4j?s&"
    const response = await login(email, clave);
    const token = response.token;
    return token;
}

const putApi = async ( url, token ) => {
    try {
        const response = await api.put(url, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        return false;
    }
}


const main = async () => {
    const token = await getToken();
    const url = "1078/2018"
    for (let i = 0; i < options.length; i++) {
        for (let j = 0; j < options.length; j++) {
            for (let k = 0; k < options.length; k++) {
                const url = `1078/2018/${options[i]}${options[j]}${options[k]}`;
                const response = await putApi(url, token);
                if (!response) {
                    console.log(response);
                }
            }
        }
    }
}

main();