export interface Project{
    id?: Number;
    user_id?: Number,
    title: string;
    start_date: string;
    end_date: string;
    description: string;
    cover: string;
    status: boolean;
    budget: Number;
    github: string;
    tags: string[];
}