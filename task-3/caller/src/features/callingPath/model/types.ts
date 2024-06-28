export interface Path {
  id: number;
  company?: string;
  src: string;
  des: string;
  price: number;
}

interface Route {
  src: string;
  des: string;
  price: number;
}

export interface CompaniesResponse {
  [key: string]: Route[];
}

export interface fetchCallPathsResponse {
  company: CompaniesResponse;
  country: { [key: string]: string };
}
