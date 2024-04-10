import { v2 } from 'cloudinary';
const CLOUDINARY = 'Cloudinary';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: "dvrknxjkl",
      api_key: "167775297119728",
      api_secret: "V6vYiUp065KmDhnx3nWwT_PqP-c",
    });
  },
};