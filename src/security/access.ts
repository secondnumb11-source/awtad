export type PermissionScope="self"|"team"|"department"|"entity"|"organization";
export interface Permission {resource:string;action:string;scope:PermissionScope;}
export interface AccessContext {userId:string;organizationId:string;permissions:Permission[];}
export function canAccess(context:AccessContext,resource:string,action:string){return context.permissions.some(p=>p.resource===resource&&p.action===action);}
export function requirePermission(context:AccessContext,resource:string,action:string){if(!canAccess(context,resource,action)) throw new Error("FORBIDDEN");}
