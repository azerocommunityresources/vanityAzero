import requests
import json

def ping_service(payload, method: str, endpoint: str):
    host: str = "localhost"
    port: int = 3001
    url = f"http://{host}:{port}/"
    headers = {
        'accept': 'application/json'
    }
    # bunch of conditions to check the type of method
    if method == "post":
        res = requests.post(url=url + endpoint, headers=headers, json=payload)
    elif method == "get":
        res = requests.get(url=url + endpoint)
    else:
        res = None
    
    return res

if __name__=="__main__":
    # 1. Method to generate mnemonic
    payload = {
        "words" : 12
    }
    res = ping_service(payload=payload, method="post", endpoint="generate_mnemonic")
    print(res.json())

    # 2. Method to generate address with mnemonic
    payload = {
        "userName" : "sampleUser",
        "password": "myStrongP@ssword",
        "mnemonic": res.json()["mnemonic"]
    }
    res = ping_service(payload=payload, method="post", endpoint="generate_address")
    print(f"generated address (w/ mnemonic) : {res.json()['keystore']['address']}")

    # 3. Method to generate address (without mnemonic)
    payload = {
        "userName" : "sampleUser",
        "password": "myStrongP@ssword"
    }
    res = ping_service(payload=payload, method="post", endpoint="generate_address_mnemonic")
    print(f"generated address (automated) : {res.json()['keystore']['address']}")

    # 4. Method to generate address with hex (not preferred)
    payload = {
        "userName" : "sampleUser",
        "password": "myStrongP@ssword"
    }
    res = ping_service(payload=payload, method="post", endpoint="generate_address_hex")
    print(f"generated address (automated hex) : {res.json()['keystore']['address']}")