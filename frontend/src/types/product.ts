export type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

export type ProductDetailsResponse = {
  success: true;
  data: Product;
};
