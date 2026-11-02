export type Product={id:string;title:string;category:string;condition:string;distance:string;description:string;icon:string;image?:string;price?:number};
export const products:Product[]=[
{id:'1',title:'Luminária de mesa',category:'Casa',condition:'Ótimo estado',distance:'1,2 km',description:'Luminária funcional, pouco usada e pronta para ganhar um novo espaço.',icon:'bulb-outline'},
{id:'2',title:'Mochila urbana',category:'Acessórios',condition:'Bom estado',distance:'2,4 km',description:'Mochila resistente com compartimento interno e pequenos sinais de uso.',icon:'bag-handle-outline'},
{id:'3',title:'Livros de tecnologia',category:'Livros',condition:'Ótimo estado',distance:'3,1 km',description:'Conjunto de livros introdutórios para estudos de tecnologia e programação.',icon:'book-outline'},
{id:'4',title:'Vaso decorativo',category:'Decoração',condition:'Como novo',distance:'4,0 km',description:'Vaso decorativo em excelente conservação, ideal para ambientes internos.',icon:'leaf-outline'}];
