import axios from 'axios'
export async function GetOrdersByUserService(id) {

    const url = `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/Order/getorders/${id}`;
    try {
        return axios.get(url).then((response) => {
            return response.data;
        })
    }
    catch (err) {
        throw err;
    }

}

export async function CreateOrder(data) {

    const url = `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/Order`;

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


export async function UpdateOrder(data) {

    const url = `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/Order/${data.id}`;

    const options = {
        method: 'PUT',
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

export async function DeleteOrder(id, userId) {

    const url = `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/Order/${id}/${userId}`;

    try {
        return axios.delete(url).then((response) => {
            return response.data;
        })
    }
    catch (err) {
        throw err;
    }

}   