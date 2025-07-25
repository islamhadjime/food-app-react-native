

export enum SortProperty {
    RATING_DESC = 'desc',
    RATING_ASC = 'asc',
    RATING_NUll = '',
}


export type TagType ={
  id:number,
  title:string
}



export interface FilterSliceState {
    search: string;
    categoryId: number;
    currentPage: number;
    order: SortProperty;
    tag:string
}

export const TagsItems:TagType[] =[
    {id:1,title:"Все"},
    {id:21,title:"a"},
    {id:2,title:"мясное"},
    {id:3,title:"веган"},
    {id:4,title:"морепродукты"},
    {id:5,title:"сыр"},
    {id:6,title:"овощи"},
    {id:7,title:"курица"},
    {id:8,title:"фастфуд"},
    {id:9,title:"итальянская"},
    {id:10,title:"десерт"},
]