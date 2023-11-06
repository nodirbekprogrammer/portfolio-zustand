import PhotoData from "./photo";
import { UserInfo } from "./userInfo";

interface Common {
  _id: string;
  percent: number;
  name: string;
  user: UserInfo;
  level: string;
  description: string;
  photo: PhotoData;
  startDate: string;
  endDate: string;
  workName: string;
  companyName: string;
  url: string;
}

export default Common;