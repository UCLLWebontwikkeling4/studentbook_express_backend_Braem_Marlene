export interface Lecturer {
    id: number;
    name: string;
    courses: Array<Course> | null;
}

export interface Course {
    id: number;
    name: string;
    description: string;
    phase: number;
}

export interface User {
    name: string;
    status: string;
    friends: User[];
    messages: Message[];
    chats: Chat[];
    loggedIn: boolean;
}

export interface Message {
    id: number;
    text: string;
    dateSent: Date;
    author: User;
    type: string;
}

export interface Chat {
    Users: User[];
    Messages: Message[];
}
