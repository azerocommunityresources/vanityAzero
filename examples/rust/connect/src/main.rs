use reqwest;
use std::collections::HashMap;
use serde::{Deserialize, Serialize};


#[derive(Debug, Serialize, Deserialize)]
struct Post {
    words: i32 
}

#[derive(Debug, Serialize, Deserialize)]
struct Response {
    mnemonic: String
}

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let payload = Post {
        words: 12
    };

    let resp: Response = reqwest::Client::new()
        .post("http://localhost:3001/generate_mnemonic")
        .json(&payload)
        .send()
        .await?
        .json()
        .await?;
    println!("{:#?}", resp);
    Ok(())
}