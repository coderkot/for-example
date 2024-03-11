import React, {useImperativeHandle} from 'react';
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {PopUpTypeConstants} from "../../../constants/type-constants";

export const CustomPopUp = React.forwardRef((props: CustomPopUp, ref) => {
    const [open, setOpen] = React.useState(false);

    useImperativeHandle(ref, () => ({
        show: () => setOpen(true)
    }));

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={props.duration} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.type}>
                {props.message}
            </Alert>
        </Snackbar>
    );
})

interface CustomPopUp {
    message: string,
    type: PopUpTypeConstants,
    duration: number,
}
