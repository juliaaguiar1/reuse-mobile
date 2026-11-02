import { createContext,useContext,useEffect,useState } from 'react';
import { Product } from '../data/products';
import { CatalogSource,getCatalog } from '../services/catalog';
type CatalogState={products:Product[];loading:boolean;refreshing:boolean;source:CatalogSource|null;warning:string|null;updatedAt:number|null;refresh:()=>Promise<void>};
const CatalogContext=createContext<CatalogState|null>(null);
export function CatalogProvider({children}:{children:React.ReactNode}){
 const [products,setProducts]=useState<Product[]>([]);const [loading,setLoading]=useState(true);const [refreshing,setRefreshing]=useState(false);const [source,setSource]=useState<CatalogSource|null>(null);const [warning,setWarning]=useState<string|null>(null);const [updatedAt,setUpdatedAt]=useState<number|null>(null);
 const load=async(force=false)=>{if(force)setRefreshing(true);else setLoading(true);try{const result=await getCatalog(force);setProducts(result.products);setSource(result.source);setWarning(result.warning||null);setUpdatedAt(result.savedAt||null);}finally{setLoading(false);setRefreshing(false);}};
 useEffect(()=>{load();},[]);
 return <CatalogContext.Provider value={{products,loading,refreshing,source,warning,updatedAt,refresh:()=>load(true)}}>{children}</CatalogContext.Provider>;
}
export function useCatalog(){const context=useContext(CatalogContext);if(!context)throw new Error('useCatalog fora do provider');return context;}
