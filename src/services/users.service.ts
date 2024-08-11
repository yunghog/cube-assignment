import { APIEndPoints, HTTPMETHODS } from "../core/constants";
import { NetworkManager } from "./network";

export class Users {
  static getUsers = (page: number, limit: number) => {
    return NetworkManager.getInstance().appRequest({
      method: HTTPMETHODS.GET,
      url: APIEndPoints.users,
      params: { results: limit, page: page },
    });
  };
}
