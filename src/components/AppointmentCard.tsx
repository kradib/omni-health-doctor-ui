import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { cancelAppointment } from "../api/appointment";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import ViewAppointmentModal from "./ViewAppointmentModal";
import {
    APPOINTMENT_MODE_DEPENDENT,
    CANCELLED_APPOINTMENT_STATUS,
    COMPLETED_APPOINTMENT_STATUS,
    CONFIRMED_APPOINTMENT_STATUS,
    PAST_DUE_APPOINTMENT_STATUS,
    PENDING_APPOINTMENT_STATUS,
} from "../Constants";
import Chip from "@mui/material/Chip";
import { getAppointmentStatus, stringToColour } from "../utils/Utils";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddPrescriptionModal from "./AddPrescriptionModal";

interface IAppointmentCardProps {
    appointment: any;
    mode: string;
    onStatusChanged?: any;
}

const cardStyle = {
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 2,
    p: 2,
};

const statusStyle = {
    bgcolor: "background.paper",
    borderRadius: "5px",
    border: "1px solid",
    p: 0.5,
};

const EDITABLE_APPOINT_STATUS = [
    PENDING_APPOINTMENT_STATUS,
    CONFIRMED_APPOINTMENT_STATUS,
];

const getAppointmentStatusWithColor: any = (appointment: any) => {
    const appointmentStatus = getAppointmentStatus(appointment);
    let statusColor = "#c2800e";
    switch (appointmentStatus) {
        case CANCELLED_APPOINTMENT_STATUS:
            statusColor = "#cf2b2b";
            break;
        case COMPLETED_APPOINTMENT_STATUS:
            statusColor = "1f97ed";
            break;
        case PAST_DUE_APPOINTMENT_STATUS:
            statusColor = "#eb345b";
            break;
        default:
            statusColor = "#c2800e";
    }

    return {
        appointmentStatus: appointmentStatus,
        statusColor: statusColor,
    };
};

const AppointmentCard: React.FC<IAppointmentCardProps> = ({
    appointment,
    mode,
    onStatusChanged,
}) => {
    const { appointmentStatus, statusColor } =
        getAppointmentStatusWithColor(appointment);
    const [cancellationConfirmation, setCancellationConfirmation] =
        useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showAddPrescriptionModal, setShowAddPrescriptionModal] =
        useState(false);

    const handleCancel = async () => {
        const response = await cancelAppointment(appointment.id);
        onStatusChanged(response.data, response.success ? "success" : "error");
        setCancellationConfirmation(false);
    };

    const handleCompleted = (message: any, severity: any) => {
        onStatusChanged(message, severity);
        setShowAddPrescriptionModal(false);
    };

    const isAppointmentPastDue = appointmentStatus == PAST_DUE_APPOINTMENT_STATUS;

    const handleCancellationClose = () => {
        setCancellationConfirmation(false);
    };

    const cancellationConfirmationDialog = () => {
        return (
            <Dialog
                open={cancellationConfirmation}
                onClose={handleCancellationClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to reject this appointment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancellationClose}>No</Button>
                    <Button onClick={handleCancel} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const viewModal = () => {
        return (
            <ViewAppointmentModal
                show={showViewModal}
                handleClose={() => setShowViewModal(false)}
                appointmentId={appointment.id}
            />
        );
    };

    const addPrescription = () => (
        <>
            <Button
                variant="contained"
                onClick={() => setShowAddPrescriptionModal(true)}
            >
                Mark as Completed
            </Button>
            {showAddPrescriptionModal && (
                <AddPrescriptionModal
                    show={showAddPrescriptionModal}
                    onUpdated={handleCompleted}
                    onClose={() => setShowAddPrescriptionModal(false)}
                    appointmentId={appointment.id}
                />
            )}
        </>
    );

    const appointmentUserName = `${appointment.userDetail?.firstName} ${appointment.userDetail?.lastName}`;
    const username = appointment.username;

    return (
        <>
            <Box sx={cardStyle}>
                <Stack spacing={2}>
                    <Stack
                        sx={{ justifyContent: "space-between", alignItems: "center" }}
                        direction="row"
                    >
                        <Typography variant="h2">{`${appointment.userDetail.firstName} ${appointment.userDetail.lastName}`}</Typography>
                        <Stack direction="row" spacing={2}>
                            {mode == APPOINTMENT_MODE_DEPENDENT && (
                                <Chip
                                    label={appointmentUserName}
                                    sx={{
                                        backgroundColor: stringToColour(username),
                                        color: "#fff", // White text for contrast
                                    }}
                                />
                            )}
                            <Box
                                sx={{
                                    ...statusStyle,
                                    color: statusColor,
                                    borderColor: statusColor,
                                }}
                            >
                                <Typography variant="body2">{appointmentStatus}</Typography>
                            </Box>
                        </Stack>
                    </Stack>
                    <Box
                        sx={{
                            bgcolor: "#e1e7eb",
                            borderRadius: "5px",
                            p: 2,
                        }}
                    >
                        <Stack spacing={0.5}>
                            <Stack
                                sx={{ justifyContent: "left", alignItems: "center" }}
                                direction="row"
                                spacing={2}
                            >
                                <CalendarMonthIcon />
                                <Typography variant="body2">
                                    {dayjs(appointment.appointmentDateTime).format(
                                        "dddd, D MMMM, YYYY"
                                    )}
                                </Typography>
                            </Stack>
                            <Stack
                                sx={{ justifyContent: "left", alignItems: "center" }}
                                direction="row"
                                spacing={2}
                            >
                                <AccessTimeIcon />
                                <Typography variant="body2">
                                    {dayjs(appointment.appointmentDateTime).format("h:mm A")}
                                </Typography>
                            </Stack>
                            <Stack
                                sx={{ justifyContent: "left", alignItems: "center" }}
                                direction="row"
                                spacing={2}
                            >
                                <LocationOnOutlinedIcon />
                                <Typography variant="body2">
                                    {appointment.doctorDetail?.location}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>

                    <Stack
                        sx={{ justifyContent: "left", alignItems: "center" }}
                        direction="row"
                        spacing={2}
                    >
                        {EDITABLE_APPOINT_STATUS.includes(appointmentStatus) && (
                            <>
                                <Button
                                    variant="outlined"
                                    onClick={() => setCancellationConfirmation(true)}
                                    color="error"
                                >
                                    Reject
                                </Button>
                            </>
                        )}
                        {isAppointmentPastDue && addPrescription()}
                        <Button variant="contained" onClick={() => setShowViewModal(true)}>
                            View Details
                        </Button>
                    </Stack>
                </Stack>
            </Box>
            {cancellationConfirmationDialog()}
            {showViewModal && viewModal()}
        </>
    );
};

export default AppointmentCard;
