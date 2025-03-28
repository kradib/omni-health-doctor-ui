import React, { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import LoadingComponent from "./LoadingComponent";
import { getAppointment } from "../api/appointment";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import HeightOutlinedIcon from "@mui/icons-material/HeightOutlined";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";
import {
    CANCELLED_APPOINTMENT_STATUS,
    COMPLETED_APPOINTMENT_STATUS,
    PAST_DUE_APPOINTMENT_STATUS,
} from "../Constants";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddAppointmentNotesComponent from "./AddAppointmentNotesComponent";
import Toast from "./Toast";
import ViewAppointmentNotesComponent from "./ViewAppointmentNotesComponent";
import UploadDocumentModal from "./UploadDocumentModal";
import ViewDocumentsModal from "./ViewDocumentsModal";
import { getAppointmentStatus } from "../utils/Utils";

interface ViewAppointmentModalProps {
    show: boolean;
    appointmentId: number;
    handleClose: any;
}

const prescriptionStyle = {
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

    const [showAddNoteModal, setShowAddNoteModal] = useState(false);
    const [showViewNoteModal, setShowViewNoteModal] = useState(false);

    const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
    const [showViewDocumentsModal, setShowViewDocumentsModal] = useState(false);

    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
        "success"
    );

    const appointmentStatus = getAppointmentStatus(appointment);
    const isAppointmentCancelled =
        appointmentStatus == CANCELLED_APPOINTMENT_STATUS;
    const isAppointmentPastDue = appointmentStatus == PAST_DUE_APPOINTMENT_STATUS;
    const isAppointmentCompleted =
        appointmentStatus == COMPLETED_APPOINTMENT_STATUS;

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

    const handleCloseSnackbar = () => {
        setOpenToast(false);
    };

    const handleEntityAdded = (
        message: string,
        severity: "success" | "error"
    ) => {
        setToastMessage(message);
        setToastSeverity(severity);
        setOpenToast(true);
        setShowAddNoteModal(false);
        setShowAddDocumentModal(false);
        getAppointmentDetails();
    };

    const addNotes = () => {
        return (
            <>
                <Button
                    variant="outlined"
                    onClick={() => setShowAddNoteModal(true)}
                    size="large"
                    fullWidth
                >
                    Add Notes
                </Button>
                {showAddNoteModal && (
                    <AddAppointmentNotesComponent
                        show={showAddNoteModal}
                        appointmentId={appointmentId}
                        onNoteAdded={handleEntityAdded}
                        onClose={() => setShowAddNoteModal(false)}
                    />
                )}
            </>
        );
    };

    const viewNotes = () => {
        return (
            !!appointment.notes?.length && (
                <>
                    <Button
                        variant="contained"
                        onClick={() => setShowViewNoteModal(true)}
                        size="large"
                        fullWidth
                    >
                        View Notes
                    </Button>
                    {showViewNoteModal && (
                        <ViewAppointmentNotesComponent
                            show={showViewNoteModal}
                            appointmentNotes={appointment.notes}
                            onClose={() => setShowViewNoteModal(false)}
                        />
                    )}
                </>
            )
        );
    };

    const addDocuments = () => {
        return (
            <>
                <Button
                    variant="outlined"
                    onClick={() => setShowAddDocumentModal(true)}
                    size="large"
                    fullWidth
                >
                    Add Report
                </Button>{" "}
                {showAddDocumentModal && (
                    <UploadDocumentModal
                        show={showAddDocumentModal}
                        onClose={() => setShowAddDocumentModal(false)}
                        onUploaded={handleEntityAdded}
                        appointmentId={appointmentId}
                    />
                )}
            </>
        );
    };

    const viewDocuments = () => {
        return (
            <>
                {!!appointment.documents?.length && (
                    <Button
                        variant="contained"
                        onClick={() => setShowViewDocumentsModal(true)}
                        size="large"
                        fullWidth
                    >
                        View Reports
                    </Button>
                )}
                {showViewDocumentsModal && (
                    <ViewDocumentsModal
                        show={showViewDocumentsModal}
                        appointmentId={appointmentId}
                        appointmentDocuments={appointment.documents}
                        onClose={() => setShowViewDocumentsModal(false)}
                    />
                )}
            </>
        );
    };

    const viewPrescription = () => (
        <Stack spacing={1}>
            <Stack
                sx={{ justifyContent: "left", alignItems: "center" }}
                direction="row"
                spacing={2}
            >
                <SpeakerNotesOutlinedIcon />
                <Typography variant="body1">Prescription</Typography>
            </Stack>

            <TextField
                // disabled
                multiline
                maxRows={10}
                slotProps={{
                    input: {
                        readOnly: true,
                    },
                }}
                value={
                    appointment.prescription ||
                    "There is no prescription added by the doctor"
                }
                sx={prescriptionStyle}
            />
        </Stack>
    );

    useEffect(() => {
        getAppointmentDetails();
    }, []);

    const title = `Patient Appointment Details`;

    return (
        <>
            <ModalComponent open={show} onClose={handleClose} title={title}>
                {loading && <LoadingComponent isLoading={loading} />}
                {errorMessage && (
                    <Typography variant="h4" sx={{ color: "red" }}>
                        {errorMessage}
                    </Typography>
                )}
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
                    <FemaleOutlinedIcon />
                    <Typography variant="body1">{`${appointment.userDetail?.gender}`}</Typography>
                </Stack>

                <Stack
                    sx={{ justifyContent: "left", alignItems: "center" }}
                    direction="row"
                    spacing={2}
                >
                    <TodayOutlinedIcon />
                    <Typography variant="body1">{`${dayjs().diff(
                        dayjs(appointment.userDetail?.dateOfBirth),
                        "year"
                    )} year(s)`}</Typography>
                </Stack>

                {appointment.userDetail?.bloodGroup && (
                    <Stack
                        sx={{ justifyContent: "left", alignItems: "center" }}
                        direction="row"
                        spacing={2}
                    >
                        <BloodtypeOutlinedIcon />
                        <Typography variant="body1">{`${appointment.userDetail?.bloodGroup}`}</Typography>
                    </Stack>
                )}

                {appointment.userDetail?.height && (
                    <Stack
                        sx={{ justifyContent: "left", alignItems: "center" }}
                        direction="row"
                        spacing={2}
                    >
                        <HeightOutlinedIcon />
                        <Typography variant="body1">{`${appointment.userDetail?.height} cm`}</Typography>
                    </Stack>
                )}

                {appointment.userDetail?.weight && (
                    <Stack
                        sx={{ justifyContent: "left", alignItems: "center" }}
                        direction="row"
                        spacing={2}
                    >
                        <ScaleOutlinedIcon />
                        <Typography variant="body1">{`${appointment.userDetail?.weight} kg`}</Typography>
                    </Stack>
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
                    <LocationOnOutlinedIcon />
                    <Typography variant="body1">
                        {appointment.doctorDetail?.location}
                    </Typography>
                </Stack>

                {isAppointmentCompleted && viewPrescription()}

                <Stack direction="row" spacing={2}>
                    {!isAppointmentCancelled && viewNotes()}
                    {!isAppointmentCancelled && addNotes()}
                </Stack>

                <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                    {!isAppointmentCancelled && viewDocuments()}
                    {!isAppointmentCancelled && isAppointmentPastDue && addDocuments()}
                </Stack>

                <Toast
                    open={openToast}
                    severity={toastSeverity}
                    message={toastMessage}
                    onClose={handleCloseSnackbar}
                />
            </ModalComponent>
        </>
    );
};

export default ViewAppointmentModal;
