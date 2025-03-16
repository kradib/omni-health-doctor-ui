import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { completeAppointment } from "../api/appointment";
interface AddPrescriptionModalProps {
    show: boolean;
    onUpdated: any;
    onClose: any;
    appointmentId: number;
}

const AddPrescriptionModal: React.FC<AddPrescriptionModalProps> = ({
    show,
    onUpdated,
    onClose,
    appointmentId,
}) => {
    const [prescription, setPrescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        const response = await completeAppointment(appointmentId, {
            prescription: prescription,
            appointmentStatus: "completed",
        });
        setLoading(false);
        onUpdated(response.data, response.success ? "success" : "error");
    };

    return (
        <>
            <ModalComponent
                open={show}
                onClose={onClose}
                title={"Add Prescription"}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <TextField
                    multiline
                    minRows={5}
                    maxRows={10}
                    onChange={(e) => setPrescription(e.target.value)}
                    value={prescription}
                />
                <Button
                    variant="contained"
                    disabled={prescription?.length == 0}
                    onClick={handleSubmit}
                    size="large"
                    loading={loading}
                >
                    Add Prescription and Mark as Complete
                </Button>
            </ModalComponent>
        </>
    );
};

export default AddPrescriptionModal;
