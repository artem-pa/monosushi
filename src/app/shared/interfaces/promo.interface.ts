export interface IPromoRequest {
  name: string;
  title: string;
  description: string;
  imagePath: string;
}

export interface IPromoResponse extends IPromoRequest {
  id: number;
}