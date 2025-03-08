import React, { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import LoadingComponent from "./LoadingComponent";
import { getAppointment, updateAppointment } from "../api/appointment";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { COMPLETED_APPOINTMENT_STATUS } from "../Constants";

interface ViewAppointmentModalProps {
    show: boolean;
    appointmentId: number;
    handleClose: any;
}

const appointmentNotesStyle = {
    color: "black",
    WebkitTextFillColor: "black",
    backgroundColor: "#ebeced",
    borderRadius: "5px",
    border: "none",
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none", // Remove the border completely
    },
};

const ViewAppointmentModal: React.FC<ViewAppointmentModalProps> = ({
    show,
    appointmentId,
    handleClose,
}) => {
    const [appointment, setAppointment] = useState<any>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const getAppointmentDetails = async () => {
        setLoading(true);
        const response = await getAppointment(appointmentId);
        setLoading(false);

        if (response.success) {
            setErrorMessage(null);
            setAppointment(response.data?.data.appointmentSchedule);
        } else {
            setErrorMessage("Error fetching appointment details");
        }
    };

    const handleUpdateNotes = async () => {
        setLoading(true);
        const response = await updateAppointment(appointmentId, appointment);
        setLoading(false);

        if (response.success) {
            setErrorMessage(null);
            setAppointment(response.data?.data.appointmentSchedule);
        } else {
            setErrorMessage("Error fetching appointment details");
        }
    };

    useEffect(() => {
        getAppointmentDetails();
    }, []);

    const title = `Patient Appointment Details`;

    return (
        <>
            <ModalComponent open={show} onClose={handleClose} title={title}>
                {errorMessage && (
                    <Typography variant="h4" sx={{ color: "red" }}>
                        {errorMessage}
                    </Typography>
                )}

                <Stack
                    sx={{ justifyContent: "left", alignItems: "center", mb: 1 }}
                    direction="row"
                    spacing={2}
                >
                    <CalendarMonthIcon />
                    <Typography variant="body1">
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
                    <Typography variant="body1">
                        {dayjs(appointment.appointmentDateTime).format("h:mm A")}
                    </Typography>
                </Stack>

                <Stack
                    sx={{ justifyContent: "left", alignItems: "center" }}
                    direction="row"
                    spacing={2}
                >
                    <PersonOutlineOutlinedIcon />
                    <Typography variant="body1">{`${appointment.userDetail?.firstName} ${appointment.userDetail?.lastName}`}</Typography>
                </Stack>

                <Stack
                    sx={{ justifyContent: "left", alignItems: "center" }}
                    direction="row"
                    spacing={2}
                >
                    <LocationOnOutlinedIcon />
                    <Typography variant="body1">
                        {appointment.doctorDetail?.location}
                    </Typography>
                </Stack>

                <Stack spacing={1}>
                    {appointment.appointmentStatus?.toLocaleLowerCase() ==
                        COMPLETED_APPOINTMENT_STATUS.toLocaleLowerCase() && (
                            <>
                                <Stack
                                    sx={{ justifyContent: "left", alignItems: "center" }}
                                    direction="row"
                                    spacing={2}
                                >
                                    <SpeakerNotesOutlinedIcon />
                                    <Typography variant="body1">Appointment Notes</Typography>
                                </Stack>
                                <TextField
                                    multiline
                                    maxRows={10}
                                    onChange={(e) =>
                                        setAppointment({
                                            ...appointment,
                                            prescription: e.target.value,
                                        })
                                    }
                                    value={appointment.prescription || ""}
                                    sx={appointmentNotesStyle}
                                />
                                <Button
                                    variant="contained"
                                    loading={loading}
                                    onClick={handleUpdateNotes}
                                >
                                    Update Notes
                                </Button>
                            </>
                        )}
                </Stack>
                {loading && <LoadingComponent isLoading={loading} />}
            </ModalComponent>
        </>
    );
};

export default ViewAppointmentModal;
