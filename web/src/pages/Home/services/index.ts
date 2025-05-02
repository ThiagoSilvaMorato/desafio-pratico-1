import api from "@/services";

interface INewShortUrlRequest {
  fullUrl: string;
  shortUrl: string;
}

export const services = {
  postNewShortUrl: async (data: INewShortUrlRequest) => {
    return api.post("/short-url", data);
  },

  getAllShortUrls: async () => {
    return api.get("/short-url/get-all");
  },
};
