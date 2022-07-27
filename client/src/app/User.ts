import { Project } from "./Project";

interface Info{
    'userCreated': Date,
    'lastLogin': Date,
    'logins': [Date]
}

export interface User{
    id?: Number
    username: String,
    password: String,
    email?: String,
    info?: Info
}