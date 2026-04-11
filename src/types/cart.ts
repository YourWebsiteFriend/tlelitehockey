export interface CartItem {
  productId: string;
  name: string;
  price: number;
  salePrice: number | null;
  image: string;
  quantity: number;
  stripeProductId: string;
  stripePriceId: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}
