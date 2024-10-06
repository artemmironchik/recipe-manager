export type Message = { success: string } | { error: string } | { message: string };

export type ValidationErrors = {
  [name: string]: string[] | string;
};
