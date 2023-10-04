import React from "react";

export default function AuthConfig(){
    const authToken = localStorage.getItem('token');
    const config = {
        headers: {
        Authorization: `Bearer ${authToken}`,
        },
    };

    return {config}
}
