export type ProductType = {
    id: number|string,
    title:string,
    price:number,
    is_active?: boolean,
    image?:string,
    count?: number,
    id_category?:number|string
}