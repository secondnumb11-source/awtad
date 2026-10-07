export type WorkflowTrigger="employee_created"|"leave_requested"|"expense_submitted"|"travel_requested"|"payroll_preflight"|"compliance_alert";
export type WorkflowAction="approval"|"notification"|"create_task"|"integration"|"record_audit";

export interface WorkflowDefinition {
  id:string;
  organizationId:string;
  name:string;
  trigger:WorkflowTrigger;
  actions:WorkflowAction[];
  enabled:boolean;
}
