import { useEffect, useState } from 'react';
import { Paper, Box, TextField, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../context/authcontext';
import { LoadingButton } from '@mui/lab';
import { CreateOrder, UpdateOrder } from '../services/orderservice';


export default function OrderForm({ record, isEdit, setOrders, setIsEdit, setRecord }) {

    const [loading, setLoading] = useState(false);
    const { register, formState: { errors: OrderErrors }, handleSubmit, reset } = useForm();
    const { state, dispatch } = useAuthContext();

    const onOrderSubmit = async (data) => {
        setLoading(true);
        if (isEdit) {
            var body = {
                id: record.id,
                name: data.name,
                description: data.description,
                userId: state?.user?.id
            }
            var response = await UpdateOrder(body);
            setOrders(response);
            setIsEdit(false);
            setRecord(null);
            reset(
                {
                    name: "",
                    description: ""
                });

        }
        else {
            var body = {
                name: data.name,
                description: data.description,
                userId: state?.user?.id
            }
            var res = await CreateOrder(body)
            setOrders(res);
            reset(
                {
                    name: "",
                    description: ""
                });
        }
        setLoading(false);
    }
    useEffect(() => {
        if (record) {
            reset({
                name: record.name,
                description: record.description
            })
        }
    }, [record])
    return (

        <form onSubmit={(e) => e.preventDefault()}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Box
                    sx={{
                        display: 'flex',
                        '& > :not(style)': {
                            m: 1,
                            width: 500,
                            height: 270
                        },
                    }}
                >
                    <Stack spacing={3} sx={{ p: 2 }}>
                        <TextField
                            autoComplete="Order Name"
                            label="Order Name"
                            {...register('name', {
                                required: true,
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={OrderErrors.name && "Please enter a valid name"}
                            helperText={OrderErrors.name && "Please enter a valid name"}
                            defaultValue={isEdit ? record.name : ""}
                        >
                        </TextField>
                        <TextField
                            fullWidth
                            multiline
                            maxRows={3}
                            label="Description"
                            {...register('description', {
                                required: true,
                            })
                            }
                            InputLabelProps={{ shrink: true }}
                            defaultValue={isEdit ? record.description : ""}
                            error={OrderErrors.description && "Please enter a valid description"}
                            helperText={OrderErrors.description && "Please enter a valid description"}

                        >
                        </TextField>
                        <LoadingButton type="submit" sx={{ p: 1 }} variant='contained' loading={loading} onClick={handleSubmit(onOrderSubmit)} >{"Add/Update Order"}</LoadingButton>
                    </Stack>


                </Box>
            </Paper>
        </form >
    );
}
