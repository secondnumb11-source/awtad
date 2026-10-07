import {createServerClient} from "@supabase/ssr";
import {cookies} from "next/headers";

export async function createSupabaseServerClient(){
  const cookieStore=await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {cookies:{
      getAll(){return cookieStore.getAll();},
      setAll(cookiesToSet:unknown[]){
        for(const item of cookiesToSet as Array<{name:string;value:string;options?:Record<string,unknown>}>){
          try{cookieStore.set(item.name,item.value,item.options as never);}catch{}
        }
      }
    }}
  );
}
