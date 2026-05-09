export interface User {
    id: number;
    name: string;
    email: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}