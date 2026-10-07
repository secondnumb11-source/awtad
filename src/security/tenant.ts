export interface TenantContext {organizationId:string;actorId:string;roles:string[];}

export function assertTenantOwnership(context:TenantContext,organizationId:string):void {
  if(context.organizationId!==organizationId) throw new Error("TENANT_BOUNDARY_VIOLATION");
}
