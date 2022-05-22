#[macro_use]
extern crate fstrings;
use reqwest;

// define structs for data types to be use
struct message {
    words: u8
}

fn ping_service(payload: message, method: , endpoint) {
    // define the host, port and url
    let host = "localhost";
    let port = 3001;
    let url = f!("http://{host}:{port}/");
}


fn main() {
    
    println!("{}", url);
}
