export const enum RouteConstants {
  LOGIN_ROUTE = "login",
  FORGOT_PASSWORD_ROUTE = "forgot-password",
  APPOINTMENT_ROUTE = "appointments",
  DEPENDENT_APPOINTMENT_ROUTE = "dependent-appointments",
  DOCUMENT_ROUTE = "documents",
  HELP_CENTER_ROUTE = "support",
}

export class ApiRoutes {
  public static BASE_ROUTE = "/api/v1";

  public static USER_BASE_ROUTE = `${this.BASE_ROUTE}/user`;
  public static APPOINTMENT_BASE_ROUTE = `${this.BASE_ROUTE}/appointment`;
  public static DOCTOR_BASE_ROUTE = `${this.BASE_ROUTE}/doctor`;
  public static DOCUMENT_BASE_ROUTE = `${this.BASE_ROUTE}/documents`;

  public static REGISTER_USER_ROUTE = `${this.USER_BASE_ROUTE}/signup`;
  public static LOGIN_USER_ROUTE = `${this.USER_BASE_ROUTE}/signin`;
  public static FORGOT_PASSWORD_ROUTE = `${this.USER_BASE_ROUTE}/forget-password`;
  public static RESET_PASSWORD_ROUTE = `${this.USER_BASE_ROUTE}/reset-password`;

  public static APPOINTMENT_NOTES_ROUTE = `note`;
  public static APPOINTMENT_DOCUMENT_ROUTE = `document`;
  public static DOCTOR_APPOINTMENT_ROUTE = `${this.BASE_ROUTE}/doctor/appointments`

  public static UPLOAD_FILE_ROUTE = `${this.DOCUMENT_BASE_ROUTE}/upload`;
}

export const REDIRECT_TIMEOUT = 3000;
export const RESEND_ATTEMPTS = 3;
export const RESEND_TIME_INTERVAL = 60;
export const SNACKBAR_TIMEOUT = 3000;
export const AUTH_TOKEN_KEY = "bearerToken";
export const USER_DETAILS_KEY = "userDetails";
export const DATE_FORMAT = "YYYY-MM-DD";
export const TIME_INPUT_FORMAT = "hh:mm A";
export const DATE_TIME_FORMAT = "YYYY-MM-DDTHH:mm:ss";

export const SUPPORTED_FILE_TYPES_FOR_UPLOAD = [
  "application/pdf",
  "image/jpeg",
];

export const GENDER_OPTIONS = [
  "MALE",
  "FEMALE",
  "OTHERS"
]

export const APPOINTMENT_MODE_OWN = 'own';
export const APPOINTMENT_MODE_DEPENDENT = 'dependent'

export const MAX_PERMISSIBLE_UPLOAD_FILE_SIZE_MB = 5;

export const PENDING_APPOINTMENT_STATUS = "Pending";
export const PAST_DUE_APPOINTMENT_STATUS = "Past due";
export const COMPLETED_APPOINTMENT_STATUS = "Completed";
export const CONFIRMED_APPOINTMENT_STATUS = "Confirmed";
export const CANCELLED_APPOINTMENT_STATUS = "Cancelled";
