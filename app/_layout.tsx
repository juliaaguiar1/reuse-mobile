import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../context/AuthContext';
import { CatalogProvider } from '../context/CatalogContext';
export default function RootLayout(){return <AuthProvider><AppProvider><CatalogProvider><StatusBar style="dark"/><Stack screenOptions={{headerShown:false}}/></CatalogProvider></AppProvider></AuthProvider>}
