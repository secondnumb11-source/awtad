export interface Money {amount:number;currency:"SAR";}
export interface PayrollInput {
  employeeId:string;
  periodStart:string;
  periodEnd:string;
  baseSalary:Money;
  allowances:Money[];
  deductions:Money[];
  overtime:Money;
}
export interface PayrollResult {gross:Money;deductions:Money;net:Money;}

export function calculatePayroll(input:PayrollInput):PayrollResult {
  const grossAmount=input.baseSalary.amount+input.allowances.reduce((s,x)=>s+x.amount,0)+input.overtime.amount;
  const deductionAmount=input.deductions.reduce((s,x)=>s+x.amount,0);
  return {gross:{amount:grossAmount,currency:"SAR"},deductions:{amount:deductionAmount,currency:"SAR"},net:{amount:grossAmount-deductionAmount,currency:"SAR"}};
}
