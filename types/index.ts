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
    username: string;
    status: string;
    friends: Friend[];
    messages: Message[];
    chats: Chat[];
    loggedIn: boolean;
}

export interface Friend{
    username: string;
    friendname: string;
    status: string;
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
