import { MethodFile } from "../entities/methodFile";
import apiClient from "../services/api-client";

export const getMethodFile = async (id: number): Promise<MethodFile> => {
    if (!id) {
        throw new Error("ID must be provided.");
    }

    const response = await apiClient.get<MethodFile>(`/practice/get-method-file-url/${id}`);
    return response.data;
};
