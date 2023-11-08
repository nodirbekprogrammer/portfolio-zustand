import Common from "../types/common";
import CRUD from "./crud";

const usePortfolio = CRUD<Common>("portfolios");

export default usePortfolio;
