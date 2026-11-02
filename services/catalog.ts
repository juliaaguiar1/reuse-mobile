import AsyncStorage from '@react-native-async-storage/async-storage';
import { products as localProducts, Product } from '../data/products';

const KEY='@reuse:catalog:v3';
const TTL=1000*60*60*6;
const ENDPOINT='https://dummyjson.com/products?limit=30&select=id,title,description,category,thumbnail,price,availabilityStatus';
type RawProduct={id:number;title:string;description:string;category:string;thumbnail?:string;price?:number;availabilityStatus?:string};
type Response={products:RawProduct[]};
type Cached={savedAt:number;products:Product[]};
export type CatalogSource='api'|'cache'|'local';
export type CatalogResult={products:Product[];source:CatalogSource;savedAt?:number;warning?:string};
const icons:Record<string,string>={beauty:'sparkles-outline',fragrances:'flower-outline',furniture:'bed-outline',groceries:'basket-outline',homeDecoration:'home-outline',laptops:'laptop-outline',smartphones:'phone-portrait-outline',mensShirts:'shirt-outline',womensDresses:'shirt-outline'};
function mapProduct(x:RawProduct):Product{return {id:`api-${x.id}`,title:x.title,category:x.category.replace(/-/g,' '),condition:'Produto do catálogo demonstrativo',distance:'Catálogo online',description:x.description,icon:icons[x.category]||'cube-outline',image:x.thumbnail,price:x.price};}
async function cached():Promise<Cached|null>{try{const raw=await AsyncStorage.getItem(KEY);if(!raw)return null;const parsed=JSON.parse(raw) as Cached;return Array.isArray(parsed.products)?parsed:null;}catch{return null;}}
export async function getCatalog(force=false):Promise<CatalogResult>{
 const stored=await cached();
 if(!force&&stored&&Date.now()-stored.savedAt<TTL)return {products:stored.products,source:'cache',savedAt:stored.savedAt};
 try{
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),9000);
  let res:Response;
  try{const response=await fetch(ENDPOINT,{signal:controller.signal});if(!response.ok)throw new Error(`HTTP ${response.status}`);res=await response.json();}finally{clearTimeout(timer);}
  if(!Array.isArray(res.products)||!res.products.length)throw new Error('Resposta inválida da API');
  const result=res.products.map(mapProduct);const savedAt=Date.now();
  try{await AsyncStorage.setItem(KEY,JSON.stringify({products:result,savedAt} satisfies Cached));}catch{}
  return {products:result,source:'api',savedAt};
 }catch{
  if(stored)return {products:stored.products,source:'cache',savedAt:stored.savedAt,warning:'Sem conexão com a API. Exibindo catálogo salvo no dispositivo.'};
  return {products:localProducts,source:'local',warning:'API indisponível. Exibindo itens ilustrativos locais.'};
 }
}
export async function clearCatalogCache(){await AsyncStorage.removeItem(KEY);}
