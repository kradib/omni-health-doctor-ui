import { useState } from "react";
import AppointmentsGridComponent from "../components/AppointmentGridComponent";
import { APPOINTMENT_MODE_OWN } from "../Constants";

const Appointments = () => {
    const [appointmentsChanged, setAppointmentsChanged] = useState(0);

    return (
        <>
            <AppointmentsGridComponent
                key={appointmentsChanged}
                mode={APPOINTMENT_MODE_OWN}
                title="My Appointments"
            />
        </>
    );
};

export default Appointments;
