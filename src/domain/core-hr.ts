export type EmployeeStatus="candidate"|"pre_onboarding"|"onboarding"|"probation"|"active"|"suspended"|"terminated"|"alumni";

export interface Organization {id:string;name:string;legalName:string|null;}
export interface Entity {id:string;organizationId:string;name:string;code:string;currency:string;}
export interface Department {id:string;entityId:string;parentId:string|null;name:string;code:string;}
export interface Location {id:string;entityId:string;name:string;latitude:number|null;longitude:number|null;radiusMeters:number|null;}
export interface Position {id:string;entityId:string;departmentId:string|null;title:string;code:string;}
export interface Employee {
  id:string;organizationId:string;entityId:string;employeeNumber:string;
  firstName:string;lastName:string;email:string|null;phone:string|null;
  status:EmployeeStatus;positionId:string|null;departmentId:string|null;
  managerId:string|null;locationId:string|null;hireDate:string|null;terminationDate:string|null;
}

const transitions:Record<EmployeeStatus,EmployeeStatus[]>={
  candidate:["pre_onboarding","terminated"],pre_onboarding:["onboarding","terminated"],
  onboarding:["probation","active","terminated"],probation:["active","terminated"],
  active:["suspended","terminated"],suspended:["active","terminated"],terminated:["alumni"],alumni:[]
};
export function canTransition(from:EmployeeStatus,to:EmployeeStatus){return transitions[from].includes(to);}
export function assertTransition(from:EmployeeStatus,to:EmployeeStatus){if(!canTransition(from,to)) throw new Error("INVALID_EMPLOYEE_LIFECYCLE_TRANSITION");}
