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
    # 1. Method to geneate mnemonic
    payload = {
        "words" : 12
    }
    res = ping_service(payload=payload, method="post", endpoint="generate_mnemonic")
    print(res.json())