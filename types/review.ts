export interface Review {
    id: number;
    itemName: string;
    stars: number;
    description?: string;
    date: string;
    type: string;
    createdAt: string;
  }
  
  export interface ReviewCreateInput {
    itemName: string;
    stars: number;
    description?: string;
    type: string;
  }
  
  export interface ReviewUpdateInput {
    itemName?: string;
    stars?: number;
    description?: string;
    type?: string;
  }