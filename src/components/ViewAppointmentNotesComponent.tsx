import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import React from "react";
import dayjs from "dayjs";
import ModalComponent from "./ModalComponent";
import Box from "@mui/material/Box";
interface ViewAppointmentNotesComponentProps {
    show: boolean;
    appointmentNotes: any;
    onClose: any;
}

const ViewAppointmentNotesComponent: React.FC<
    ViewAppointmentNotesComponentProps
> = ({ show, appointmentNotes, onClose }) => {
    return (
        <>
            <ModalComponent
                open={show}
                onClose={onClose}
                title="Appointment Notes"
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        width: "100%",
                        maxHeight: 500,
                        overflow: "auto",
                        borderRadius: 2,
                        p: 1,
                    }}
                >
                    {appointmentNotes.map((msg: any, index: number) => (
                        <>
                            <Stack spacing={1}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        alignSelf:
                                            msg.role === "doctor" ? "flex-start" : "flex-end",
                                    }}
                                >{`${msg.name} ${dayjs(msg.createdAt).format(
                                    "DD-MM-YYYY hh:mm"
                                )}`}</Typography>
                                <Paper
                                    key={index}
                                    sx={{
                                        p: 1.5,
                                        maxWidth: "75%",
                                        alignSelf:
                                            msg.role === "doctor" ? "flex-start" : "flex-end",
                                        bgcolor:
                                            msg.role === "doctor" ? "grey.300" : "primary.main",
                                        color: msg.role === "doctor" ? "black" : "white",
                                        borderRadius: 2,
                                    }}
                                >
                                    <Typography variant="body2">{msg.note}</Typography>
                                </Paper>
                            </Stack>
                        </>
                    ))}
                </Box>
            </ModalComponent>
        </>
    );
};

export default ViewAppointmentNotesComponent;
