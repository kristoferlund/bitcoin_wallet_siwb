dfx deploy ic_siwb_provider --argument $'(
    record {
        domain = "127.0.0.1";
        uri = "http://127.0.0.1:5173";
        salt = "123456";
        network = opt "regtest";
        scheme = opt "http";
        statement = opt "Login to the app";
        sign_in_expires_in = opt 1500000000000; 
        session_expires_in = opt 604800000000000; 
        targets = null;
    }
)'

dfx generate ic_siwb_provider
