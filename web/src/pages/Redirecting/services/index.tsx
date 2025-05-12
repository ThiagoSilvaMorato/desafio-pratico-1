import api from "@/services";

export const services = {
  getShortUrlByShortUrl: async (shortUrl: string) => {
    return api.get(`/short-url/${shortUrl}`);
  },

  increaseShortUrlAccessCount: async (shortUrl: string) => {
    return api.patch(`/short-url/${shortUrl}`);
  },
};
