
export interface SweetItem {
  id: string;
  name: string;
  kannadaName?: string;
  description: string;
  imageUrl: string;
  gallery?: string[]; // Supporting multiple photos for specific items
  category: 'sweet' | 'nut' | 'traditional';
  availableQuantities: string[]; // e.g., ['250g', '500g', '1kg']
  unitPrice?: string; // Optional price per unit if needed
}

export interface UserPhoto {
  id: string;
  url: string;
  caption: string;
  timestamp: number;
}
