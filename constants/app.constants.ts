export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})+$/;
export const PASSWORD_REGEX = /^(?=\S)(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d_\W\s]{5,30}\S$/;
export const MAX_FILE_SIZE = 1024 * 1024 * 3;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
