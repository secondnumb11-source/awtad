create table if not exists organization_memberships (
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid not null references organizations(id) on delete cascade,
  role text not null default 'member',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  primary key(user_id,organization_id)
);
create index if not exists organization_memberships_org_idx on organization_memberships(organization_id,user_id);

create table if not exists entities (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete restrict,
  name text not null, code text not null, currency text not null default 'SAR',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(organization_id,code)
);
create table if not exists departments (
  id uuid primary key default gen_random_uuid(), entity_id uuid not null references entities(id) on delete restrict,
  parent_id uuid references departments(id) on delete set null, name text not null, code text not null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(entity_id,code)
);
create table if not exists locations (
  id uuid primary key default gen_random_uuid(), entity_id uuid not null references entities(id) on delete restrict,
  name text not null, latitude numeric(10,7), longitude numeric(10,7), radius_meters integer,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check(radius_meters is null or radius_meters > 0)
);
create table if not exists positions (
  id uuid primary key default gen_random_uuid(), entity_id uuid not null references entities(id) on delete restrict,
  department_id uuid references departments(id) on delete set null, title text not null, code text not null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(entity_id,code)
);
create table if not exists employee_assignments (
  id uuid primary key default gen_random_uuid(), employee_id uuid not null references employees(id) on delete cascade,
  entity_id uuid not null references entities(id) on delete restrict, department_id uuid references departments(id) on delete set null,
  position_id uuid references positions(id) on delete set null, manager_id uuid references employees(id) on delete set null,
  location_id uuid references locations(id) on delete set null, effective_from date not null, effective_to date,
  created_at timestamptz not null default now(), check(effective_to is null or effective_to >= effective_from)
);
alter table employees add column if not exists entity_id uuid references entities(id) on delete restrict;
alter table employees add column if not exists email text;
alter table employees add column if not exists phone text;
alter table employees add column if not exists position_id uuid references positions(id) on delete set null;
alter table employees add column if not exists location_id uuid references locations(id) on delete set null;
create table if not exists manager_users (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete restrict,
  user_id uuid not null, employee_id uuid references employees(id) on delete set null,
  scope text not null check(scope in ('employee','department','entity','organization')),
  active boolean not null default true, created_at timestamptz not null default now(),
  unique(organization_id,user_id)
);
create table if not exists roles (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade,
  name text not null, description text, created_at timestamptz not null default now(), unique(organization_id,name)
);
create table if not exists permissions (
  id uuid primary key default gen_random_uuid(), resource text not null, action text not null,
  scope text not null check(scope in ('self','team','department','entity','organization')), unique(resource,action,scope)
);
create table if not exists role_permissions (
  role_id uuid not null references roles(id) on delete cascade, permission_id uuid not null references permissions(id) on delete cascade,
  primary key(role_id,permission_id)
);
create table if not exists user_roles (
  user_id uuid not null, role_id uuid not null references roles(id) on delete cascade,
  primary key(user_id,role_id)
);
create table if not exists manager_groups (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade,
  name text not null, code text, manager_user_id uuid references manager_users(id) on delete set null,
  created_at timestamptz not null default now()
);
create table if not exists manager_group_members (
  group_id uuid not null references manager_groups(id) on delete cascade, employee_id uuid not null references employees(id) on delete cascade,
  primary key(group_id,employee_id)
);
create table if not exists employee_change_requests (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete restrict,
  employee_id uuid not null references employees(id) on delete cascade, requested_by uuid not null,
  changes jsonb not null, status text not null check(status in ('pending','approved','rejected','cancelled')),
  reviewed_by uuid, reviewed_at timestamptz, created_at timestamptz not null default now()
);

alter table organization_memberships enable row level security;
alter table entities enable row level security;
alter table departments enable row level security;
alter table locations enable row level security;
alter table positions enable row level security;
alter table employee_assignments enable row level security;
alter table manager_users enable row level security;
alter table roles enable row level security;
alter table role_permissions enable row level security;
alter table user_roles enable row level security;
alter table manager_groups enable row level security;
alter table manager_group_members enable row level security;
alter table employee_change_requests enable row level security;

create policy organization_memberships_self on organization_memberships for select to authenticated using ((select auth.uid()) = user_id);
create policy organization_memberships_admin on organization_memberships for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy entities_org on entities for all to authenticated using (organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active)) with check (organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active));
create policy departments_org on departments for all to authenticated using (entity_id in (select id from entities where entities.id=departments.entity_id)) with check (entity_id in (select id from entities where entities.id=departments.entity_id));
create policy locations_org on locations for all to authenticated using (entity_id in (select id from entities where entities.id=locations.entity_id)) with check (entity_id in (select id from entities where entities.id=locations.entity_id));
create policy positions_org on positions for all to authenticated using (entity_id in (select id from entities where entities.id=positions.entity_id)) with check (entity_id in (select id from entities where entities.id=positions.entity_id));
create policy employee_assignments_org on employee_assignments for all to authenticated using (employee_id in (select id from employees where employees.id=employee_assignments.employee_id)) with check (employee_id in (select id from employees where employees.id=employee_assignments.employee_id));
create policy manager_users_org on manager_users for all to authenticated using (organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active)) with check (organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active));
create policy roles_org on roles for all to authenticated using (organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active)) with check (organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active));
create policy role_permissions_access on role_permissions for all to authenticated using (role_id in (select id from roles where organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active))) with check (role_id in (select id from roles where organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active)));
create policy user_roles_access on user_roles for all to authenticated using (role_id in (select id from roles where organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active))) with check (role_id in (select id from roles where organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active)));
create policy manager_groups_org on manager_groups for all to authenticated using (organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active)) with check (organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active));
create policy manager_group_members_access on manager_group_members for all to authenticated using (group_id in (select id from manager_groups where organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active))) with check (group_id in (select id from manager_groups where organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active)));
create policy employee_change_requests_org on employee_change_requests for all to authenticated using (organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active)) with check (organization_id in (select organization_id from organization_memberships where user_id=(select auth.uid()) and active));
