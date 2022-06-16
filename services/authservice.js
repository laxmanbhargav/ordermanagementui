
export async function LoginwithCredentialService(data) {

    const url = `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/User`;

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data)
    };

    try {
        return fetch(url, options)
            .then(response => response.json())
            .then(data => { return data });
    }
    catch (err) {
        throw err;
    }

}   