import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from "@mui/material";


type deleteprops = {
    openProp: boolean,
    handleClose: () => void,
    deleteContainer: () => void,
}

export default function ContainerDeleteDialog({openProp, handleClose, deleteContainer}: deleteprops) {

    

    return (
        <>
        <Dialog
            open={openProp}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"ARE YOU SURE?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                If this container is deleted, then it has to be manually set up again on the machine.
                Are you sure you want to delete it?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={deleteContainer} autoFocus>
                Agree
            </Button>
            </DialogActions>
        </Dialog>
        </>
    )

}