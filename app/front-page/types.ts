export interface Articles {
  id: string;
  headline: string;
  image: string;
  summary: string;
  views?: number;
  paid?: boolean;
  createdAt: Date;
  updatedAt: Date; 
}
