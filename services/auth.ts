const BASE='https://dummyjson.com/auth';
export type AuthUser={id:number;username:string;firstName:string;lastName:string;email?:string;image?:string};
export type Session={accessToken:string;refreshToken?:string;user:AuthUser};
async function json(response:Response){const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.message||`Erro HTTP ${response.status}`);return data;}
export async function signIn(username:string,password:string):Promise<Session>{
 const data=await json(await fetch(`${BASE}/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password,expiresInMins:60})}));
 if(!data.accessToken)throw new Error('A API não retornou um token de acesso.');
 return {accessToken:data.accessToken,refreshToken:data.refreshToken,user:{id:data.id,username:data.username,firstName:data.firstName,lastName:data.lastName,email:data.email,image:data.image}};
}
export async function verifySession(token:string):Promise<AuthUser>{
 const data=await json(await fetch(`${BASE}/me`,{headers:{Authorization:`Bearer ${token}`}}));
 return {id:data.id,username:data.username,firstName:data.firstName,lastName:data.lastName,email:data.email,image:data.image};
}
