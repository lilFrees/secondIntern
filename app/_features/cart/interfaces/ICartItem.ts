import { IProduct } from "../../product/interfaces/IProduct";

export interface ICartItem {
  item: IProduct;
  quantity: number;
}
