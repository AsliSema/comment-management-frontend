import { GetAllCommentsDto } from "../../comments/models/get-all-comments.dto";

export interface GetAllTasksDto{
    id: number;
    title: string;
    description: string;
    createdDate: string;
    comments: GetAllCommentsDto[];
}