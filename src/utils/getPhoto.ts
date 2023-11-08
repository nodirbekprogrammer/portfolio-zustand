import { IMGURL } from "../constants";
import PhotoData from "../types/photo";

export const getPhoto = (photo: PhotoData) => {
  const photoId = photo?._id;
  const photoType = photo?.name?.split(".")[1];
  const realPhoto = `${photoId}.${photoType}`;

  return `${IMGURL}${realPhoto}`;
};

export const getUserPhoto = (photo: string) => {
  return `${IMGURL}${photo}`;
};
