import {createSupabaseServerClient} from "@/lib/supabase/server";

export interface AuthContext {userId:string;email:string|null;}

export async function requireAuth():Promise<AuthContext>{
  const supabase=await createSupabaseServerClient();
  const {data,error}=await supabase.auth.getClaims();
  if(error||!data?.claims?.sub) throw new Error("UNAUTHENTICATED");
  return {userId:String(data.claims.sub),email:typeof data.claims.email==="string"?data.claims.email:null};
}
