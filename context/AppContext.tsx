import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext,useContext,useEffect,useMemo,useState } from 'react';
import { products,Product } from '../data/products';

type Ad={id:string;title:string;category:string;description:string;photoUri?:string};
type Ctx={favorites:string[];toggleFavorite:(id:string)=>void;isFavorite:(id:string)=>boolean;ads:Ad[];addAd:(ad:Omit<Ad,'id'>)=>Promise<void>;lastPhoto:string|null;setLastPhoto:(uri:string|null)=>Promise<void>};
const AppContext=createContext<Ctx|null>(null);
const FAV='@reuse:favorites', ADS='@reuse:ads', PHOTO='@reuse:lastPhoto';
export function AppProvider({children}:{children:React.ReactNode}){
 const [favorites,setFavorites]=useState<string[]>([]); const [ads,setAds]=useState<Ad[]>([]); const [lastPhoto,setPhoto]=useState<string|null>(null);
 useEffect(()=>{(async()=>{try{const [f,a,p]=await Promise.all([AsyncStorage.getItem(FAV),AsyncStorage.getItem(ADS),AsyncStorage.getItem(PHOTO)]);if(f)setFavorites(JSON.parse(f));if(a)setAds(JSON.parse(a));if(p)setPhoto(p);}catch{}})()},[]);
 const toggleFavorite=(id:string)=>setFavorites(prev=>{const next=prev.includes(id)?prev.filter(x=>x!==id):[...prev,id];AsyncStorage.setItem(FAV,JSON.stringify(next));return next});
 const addAd=async(ad:Omit<Ad,'id'>)=>{const next=[{...ad,id:Date.now().toString()},...ads];setAds(next);await AsyncStorage.setItem(ADS,JSON.stringify(next));};
 const setLastPhoto=async(uri:string|null)=>{setPhoto(uri); if(uri) await AsyncStorage.setItem(PHOTO,uri); else await AsyncStorage.removeItem(PHOTO)};
 const value=useMemo(()=>({favorites,toggleFavorite,isFavorite:(id:string)=>favorites.includes(id),ads,addAd,lastPhoto,setLastPhoto}),[favorites,ads,lastPhoto]);
 return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp(){const c=useContext(AppContext);if(!c)throw new Error('useApp fora do provider');return c}
export const allProducts=products;
