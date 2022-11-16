import { DapAxiosInstance } from '../helpers/axiosInstance';

export class DapAPIService {
  static async getActiveStreams() {
    const response = await DapAxiosInstance.get('/classes/Stream?where={"isActive": true}');
    return response.data.results;
  }

  static async getProject(projectId: string) {
    const response = await DapAxiosInstance.get(`/classes/Project?where={"objectId": ${projectId}}`);
    return response.data.results[0];
  }

  static async getRewards(oid: string) {
    const response = await DapAxiosInstance.get(`/classes/Reward?where={"project":"${oid}"}`);

    return response.data.results;
  }

  static async getActiveProject(address: string) {
    const response = await DapAxiosInstance.get(`/classes/Project?where={"owner":"${address}", "state": 1}`);
    return response.data.results[0] || null;
  }

  static async getProjectDetail(objectId: string | string[]) {
    const response = await DapAxiosInstance.get(`/classes/Project?where={"objectId":"${objectId}"}`);
    return response.data.results[0];
  }

  static async getNotificationData(address: string) {
    const response = await DapAxiosInstance.get(`/classes/Notification?where={"user":"${address}"}`);
    return response.data.results;
  }

  static async updateProject({ id, title, url }: { title: string; url: string; id: string }) {
    return await DapAxiosInstance.post(`/classes/Update`, {
      title,
      url,
      project: id,
    });
  }

  static async handleRewardNotification({ title, oldTitle, objectId, bookmark }) {
    return await DapAxiosInstance.post('/classes/Notification', {
      title,
      description: `Project ${oldTitle} has been updated!`,
      type: 'projectUpdate',
      project: objectId,
      user: bookmark,
    });
  }

  static async getProjectsByCategory(category: string) {
    const response = await DapAxiosInstance.get(`/classes/Project?where={"category":"${category}", "state": 1}`);
  }

  static async getAllProjects() {
    const response = await DapAxiosInstance.get('/classes/Project?where={"state":1}');
    return response.data.results;
  }

  static async getMyProjects(address: string) {
    const response = await DapAxiosInstance.get(`/classes/Project?where={"owner":"${address}"}`);
    return response.data.results;
  }

  static async getStreamState(id: string) {
    const response = await DapAxiosInstance.get(`/classes/Stream?where={"projectId":"${id}", "isActive": true }`);
    console.log('response', response);
    return response.data.results;
  }

  static async getProjectUpdates(id: string) {
    const response = await DapAxiosInstance.get(`/classes/Update?where={"project":"${id}"}`);
    return response.data.results;
  }
}
