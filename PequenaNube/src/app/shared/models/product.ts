export type ProductLine = 'amigurumi' | 'jewelry' | 'Amigurumi' | 'Joyería';

export interface AmigurumiAttrs {
  yarnType: string;
  size: string;
}

export interface JewelryAttrs {
  material: string;
  color: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  images: string[];
  productLine: ProductLine;
  category: string;
  description: string;
  stock: number;
  isNew?: boolean;
  isSale?: boolean;
  material?: string;
  color?: string;
  yarnType?: string;
  size?: string;
}
