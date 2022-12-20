import { DapAxiosInstance, ParseAxiosInstance } from '../helpers/axiosInstance';
import { Project } from '../types/project';

export class UniService {
  static async getDataAll<T>(query: string): Promise<T[]> {
    const response = await DapAxiosInstance.get(query);
    return response.data.results;
  }

  static async getDataSingle(query: string) {
    const response = await DapAxiosInstance.get(query);
    return response.data.results[0];
  }

  static async postData(data: any) {
    const response = await DapAxiosInstance.post(data);
    return response;
  }

  static async getParseAll(query: string) {
    const response = await ParseAxiosInstance.get(query);
    return response.data.results;
  }
}

export class DapAPIService {
  static async updateProject({ id, title, description, url }: { title: string; description: string, url: string; id: string }) {
    return await DapAxiosInstance.post(`/classes/Update`, {
      title,
      description,
      url,
      project: id,
    });
  }

  static async updateParseProject({ id, title, url }: { title: string; url: string; id: string }) {
    return await ParseAxiosInstance.post(`/classes/Update`, {
      title,
      url,
      project: id,
    });
  }

  static async handleRewardNotification({ title, description, objectId, bookmark, long }) {
    return await DapAxiosInstance.post('/classes/Notification', {
      title: title,
      description: description,
      type: 'projectUpdate',
      project: objectId,
      user: bookmark,
      isRead: false,
      long: long
    });
  }

  static async sendMessage({ sender, recipient, message}){
    return await DapAxiosInstance.post('/classes/Message', {
      sender: sender,
      recipient: recipient,
      message: message
    });
  }

  static async updateReadNotifications(notificationId: string) {
    return await DapAxiosInstance.put(`/classes/Notification/${notificationId}`, { isRead: true });
  }

  static async getBatchProjectsById(ids: string[]) {
    return await Promise.all<Project>(
      ids.map((id) => {
        return UniService.getDataSingle(`/classes/Project?where={"objectId":"${id}"}`);
      })
    );
  }
}
