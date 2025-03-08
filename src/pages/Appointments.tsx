import AppointmentsGridComponent from "../components/AppointmentGridComponent";
import { APPOINTMENT_MODE_OWN } from "../Constants";

const Appointments = () => {
    return (
        <>
            <AppointmentsGridComponent
                mode={APPOINTMENT_MODE_OWN}
                title="My Appointments"
            />
        </>
    );
};

export default Appointments;
