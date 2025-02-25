import { IHttpException } from "../interfaces/global/IHttpsExeption";

const buildException = (status: number, message: string, code: string): IHttpException => ({ status, message, code })

export default class Errors {
  // global
  static DEFAULT_ERROR = buildException(400, 'default controled error', 'ATB001')
  static VALIDATION_ERROR = buildException(400, 'validation data error', 'ATB001')
  static FILE_IS_REQUIRED = buildException(400, 'file is required', 'ATB001')
  static SMTP_SERVICE_ERROR = buildException(400, 'smtp service error', 'ATB001')
  static TOKEN_VALIDATION_ERROR = buildException(400, 'token validation error', 'ATB001')
  // auth
  static AUTH_TOKEN_MISSING = buildException(401, 'authentication token failure', 'ATB001')
  static INCORRECT_EMAIL_OR_PASSWORD = buildException(401, 'Incorrect email or password', 'ATB002')
  static USER_BLOCKED = buildException(400, 'user blocked', 'ATB003')
  static USER_DISABLED = buildException(400, 'user disabled', 'ATB004')
  static TO_MANY_ATTEMPTS = buildException(400, 'you have made many attempts', 'ATB005')
  static EMAIL_NOT_EXISTS = buildException(400, 'mail does not exist on the platform', 'ATB006')
  static EMAIL_ALREADY_EXISTS = buildException(400, 'mail already exists on the platform', 'ATB007')
  static RECOVERY_CODE_ERROR = buildException(400, 'Incorrect recovery code', 'ATB008')
  static RECOVERY_CODE_ALREADY_USED = buildException(400, 'recovery code has already been used', 'ATB009')
  static EMAIL_IS_REQUIRED = buildException(400, 'email is required', 'ATB010')
  static PASSWORD_IS_REQUIRED = buildException(400, 'password is required', 'ATB011')
  static FIRST_NAME_IS_REQUIRED = buildException(400, 'first_name is required', 'ATB012')
  static LAST_NAME_IS_REQUIRED = buildException(400, 'last_name is required', 'ATB013')
  static ROLE_IS_REQUIRED = buildException(400, 'role is required', 'ATB014')
  static EMAIL_INVALID = buildException(400, 'email is invalid', 'ATB015')
  // PROJECT
  static NAME_IS_REQUIRED = buildException(400, 'name is required', 'ATB016')
  static START_DATE_IS_REQUIRED = buildException(400, 'start_date is required', 'ATB017')
  static STATE_IS_REQUIRED = buildException(400, 'state_id is required', 'ATB018')
  static TYPE_IS_REQUIRED = buildException(400, 'type_id is required', 'ATB019')
  static DESCRIPTION_IS_REQUIRED = buildException(400, 'description is required', 'ATB019')
  static PROJECT_NOT_FOUND = buildException(400, 'project not found', 'ATB020')

  // TYPES PROJECT
  static TYPE_PROJECT_NOT_FOUND = buildException(400, 'type project not found', 'ATB021')
  
  // STATES PROJECT
  static STATE_PROJECT_NOT_FOUND = buildException(400, 'state project not found', 'ATB022')

}
