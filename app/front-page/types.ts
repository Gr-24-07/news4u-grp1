export interface Articles {
  id: string;          
  headline: string;
  image: string;
  summary: string;
  createdAt: Date;
  views?: number;       
  paid?: boolean;   
}
