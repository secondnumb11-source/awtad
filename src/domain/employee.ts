export type EmploymentStatus="candidate"|"pre_onboarding"|"onboarding"|"probation"|"active"|"suspended"|"terminated"|"alumni";

export interface Employee {
  id:string;
  organizationId:string;
  employeeNumber:string;
  firstName:string;
  lastName:string;
  status:EmploymentStatus;
  hireDate:string|null;
  terminationDate:string|null;
  departmentId:string|null;
  managerId:string|null;
  createdAt:string;
  updatedAt:string;
}
