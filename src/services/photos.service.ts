import { APIEndPoints, HTTPMETHODS } from "../core/constants";
import { NetworkManager } from "./network";

export class Photos {
  static getPhotos = (page: number, limit: number) => {
    return NetworkManager.getInstance().appRequest({
      method: HTTPMETHODS.GET,
      url: APIEndPoints.photos,
      headers: {
        Authorization:
          "563492ad6f917000010000018f972bd71626472e9a3a6c0ed132bfc8",
      },
      params: { per_page: limit, page: page, orientation: "potrait" },
    });
  };
}
