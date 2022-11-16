import { DapAxiosInstance } from '../helpers/axiosInstance';

export class UniService {
  static async getDataAll(query: string) {
    const response = await DapAxiosInstance.get(query);
    return response.data.results;
  }

  static async getDataSingle(query: string) {
    const response = await DapAxiosInstance.get(query);
    return response.data.results[0];
  }
}

export class DapAPIService {
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

}
