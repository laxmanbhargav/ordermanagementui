import { LoginwithCredentialService } from '../services/authservice';

export async function LoginwithCredentialAction(data, dispatch) {
    await LoginwithCredentialService(data).then((response) => {
        var userObject = { user: response, isLoggedIn: true }
        dispatch({ type: "LOGIN_SUCCESS", payload: userObject });
    })
        .catch((error) => {
            dispatch({ type: "LOGIN_ERROR", payload: "Unable to Login" });
            throw error;
        })
}