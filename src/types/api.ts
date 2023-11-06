import Common from "./common";

interface ApiData {
  pagination: {
    total: number;
  };
  data: Common[];
}

export default ApiData;
