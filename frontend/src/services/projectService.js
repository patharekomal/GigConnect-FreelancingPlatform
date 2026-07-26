import * as projectApi from "../api/projectApi";

export const fetchProjectsByClient = async (clientId) => {
    const response = await projectApi.getProjectsByClient(clientId);
    return response.data;
};

export const fetchProjectById = async (projectId) => {
    const response = await projectApi.getProjectById(projectId);
    return response.data;
};

export const approveProject = async (projectId) => {

    const response =
        await projectApi.approveProject(projectId);

    return response.data;
};

