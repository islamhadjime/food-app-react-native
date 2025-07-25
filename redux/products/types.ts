export type Product ={
  image:string,
  title:string,
  description:string,
  price:string,
  id:number,
  tags:[]
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type SearchProductParams = {
    order?: 'asc' | 'desc' | '';
    tag: string;
    search: string;
}

export interface ProductState {
  items: Product[],
  status: Status
}