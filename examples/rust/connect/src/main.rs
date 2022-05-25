use reqwest;
use std::collections::HashMap;


#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let resp: serde_json::Value = reqwest::Client::new()
        .post("http://localhost:3001/generate_mnemonic")
        .json(&serde_json::json!({
            "words": 12,
        }))
        .send()
        .await?
        .json()
        .await?;
    println!("{:#?}", resp);
    Ok(())
}