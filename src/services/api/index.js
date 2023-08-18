import userModule from "./modules/user";
import categoryModule from "./modules/category";
import productModule from "./modules/product";
import purchase from './modules/purchase'
import receiptModule from "./modules/receipt"
import newProductModule from "./modules/newProduct";
export default {
  users: userModule,
  categories: categoryModule,
  products: productModule,
  purchase,
  receipt: receiptModule,
  newProduct: newProductModule
};
