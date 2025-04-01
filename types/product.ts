type Currency = {
  NGN: number[];
};

export type Product = {
  name: string;
  description: string;
  unique_id: string;
  url_slug: string;
  is_available: boolean;
  is_service: boolean;
  previous_url_slugs: Record<string, any>;
  unavailable: boolean;
  unavailable_start: string | null;
  unavailable_end: string | null;
  status: string;
  id: string;
  parent_product_id: string | null;
  parent: string | null;
  organization_id: string;
  categories: string[];
  date_created: string;
  last_updated: string;
  user_id: string;
  current_price: Currency[];
  is_deleted: boolean;
  available_quantity: number;
  selling_price: number | null;
  discounted_price: number | null;
  buying_price: number | null;
  photos: string[];
  attributes: Record<string, any>;
};
