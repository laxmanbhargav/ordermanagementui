import { useReducer, createContext, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "LOGIN_SUCCESS":
                return { ...state, user: action.payload?.user, isLoggedIn: action.payload.isLoggedIn }
            case "LOGIN_ERROR":
                return { ...state, error: action.payload }
        }
    },
        {
            user: null,
            error: null,
            isLoggedIn: false
        })

    return (
        <AuthContext.Provider
            value={{ state, dispatch }}
        >
            {children}
        </AuthContext.Provider>
    );
};
function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error(
            "useAuthContext must be used within a AuthProvider"
        );
    }
    return context;
}
export { AuthProvider, useAuthContext };