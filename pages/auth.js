import { useEffect } from 'react';
import LoginForm from '../components/loginform';
import styles from '../styles/Auth.module.css';
import { useAuthContext } from '../context/authcontext';
import { useRouter } from 'next/router';

export default function Auth() {
    const router = useRouter();
    const { state } = useAuthContext();
    useEffect(() => {
        if (state?.isLoggedIn) {
            router.push('/')
        }
    }, [state])
    return (
        <>
            <div classname={styles.container}>
                <h2 className={styles.title}>
                    Order Management App  Testing
                </h2>

                <LoginForm />
            </div>
        </>
    )
}