create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  legal_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists employees (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  employee_number text not null,
  first_name text not null,
  last_name text not null,
  status text not null check (status in ('candidate','pre_onboarding','onboarding','probation','active','suspended','terminated','alumni')),
  hire_date date,
  termination_date date,
  department_id uuid,
  manager_id uuid references employees(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, employee_number)
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  actor_id uuid,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table organizations enable row level security;
alter table employees enable row level security;
alter table audit_logs enable row level security;

create policy organizations_isolation on organizations
  using (id = nullif(current_setting('request.jwt.claims', true)::jsonb->>'organization_id','')::uuid);

create policy employees_isolation on employees
  using (organization_id = nullif(current_setting('request.jwt.claims', true)::jsonb->>'organization_id','')::uuid);

create policy audit_logs_isolation on audit_logs
  using (organization_id = nullif(current_setting('request.jwt.claims', true)::jsonb->>'organization_id','')::uuid);
