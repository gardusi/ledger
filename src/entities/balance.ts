import Decimal from "decimal.js";

export interface Balance {
  total: Decimal;
  available: Decimal;
}