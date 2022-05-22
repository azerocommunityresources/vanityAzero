import fetch from 'node-fetch';

let headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
};

let host = "localhost";
let port = 3001;
let url = `http://${host}:${port}/`;

const ping_service = async (payload, method, endpoint) => {
    if (method == "post") {
        let requestOptions = {
            url: url + endpoint,
            method: 'POST',
            headers: {'accept': 'application/json', 'Content-Type': 'application/json'}, 
            body: JSON.stringify(payload)
        }
        const result = await fetch(url + endpoint, requestOptions);
        return result;
    } else {
        let requestOptions = {
            url: url + endpoint,
            method: 'GET',
            headers: {'accept': 'application/json', 'Content-Type': 'application/json'}, 
            body: JSON.stringify(payload)
        }
        const result = await fetch(url + endpoint, requestOptions);
        return result;
    }

};

// 1. Method to generate mnemonic
let payload = {
    "words" : 12
}

// add await since fetch is a network operation
let res = await ping_service(payload, "post", "generate_mnemonic");
console.log(await res.json());