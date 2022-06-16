import { useState } from 'react';
import { TextField, Stack, Box, Paper, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import styles from '../styles/LoginForm.module.css';
import { useAuthContext } from '../context/authcontext';
import { LoginwithCredentialAction } from '../action/authaction';

export default function LoginForm() {

    const [loading, setLoading] = useState(false);
    const { register, formState: { errors: loginErrors }, handleSubmit } = useForm();
    const { state, dispatch } = useAuthContext()

    const onLoginSubmit = async (data) => {
        setLoading(true);
        try {
            await LoginwithCredentialAction(data, dispatch);
        }
        catch (error) { setLoading(false) };
    }

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className={styles.container}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 500,
                                height: 400
                            },
                        }}
                    >
                        <Paper elevation={3} >
                            <Stack spacing={3} sx={{ p: 2 }}>
                                <Typography variant="h5">Enter the Login Details</Typography>
                                <TextField
                                    autoComplete="email"
                                    type="email"
                                    label="Email address"
                                    {...register('email', {
                                        required: true,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                        }
                                    })}
                                    error={loginErrors.email && "Please enter a valid email"}
                                    helperText={loginErrors.email && "Please enter a valid email"}
                                >
                                </TextField>
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="Password"
                                    {...register('password', {
                                        required: true,
                                        minLength: 8
                                    })
                                    }
                                    error={loginErrors.email && "Please enter a valid password"}
                                    helperText={loginErrors.email && "Please enter a valid password"}
                                >
                                </TextField>
                                <LoadingButton type="submit" sx={{ p: 2 }} variant='contained' loading={loading} onClick={handleSubmit(onLoginSubmit)} >{"Login"}</LoadingButton>
                            </Stack>

                        </Paper>
                    </Box>
                </div>

            </form>
        </>
    )
}