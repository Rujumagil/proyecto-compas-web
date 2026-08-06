begin;

create extension if not exists pgcrypto;

create table if not exists public.web_chat_configs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null unique
    references public.workspaces(id) on delete cascade,
  public_key text not null unique
    default ('wc_' || encode(gen_random_bytes(18), 'hex')),
  enabled boolean not null default false,
  allowed_origins text[] not null default '{}'::text[],
  widget_title text not null default 'Compás One',
  widget_subtitle text not null default 'Estamos para orientarte',
  welcome_message text not null default
    'Hola. Cuéntanos qué proyecto deseas crear y te ayudaremos a encontrar el siguiente paso.',
  offline_message text not null default
    'Gracias por escribirnos. Registramos tu mensaje y un integrante del equipo continuará la conversación.',
  primary_color text not null default '#0f766e',
  position text not null default 'right'
    check (position in ('left', 'right')),
  require_contact_method boolean not null default true,
  privacy_url text,
  max_messages_per_minute integer not null default 8
    check (max_messages_per_minute between 1 and 30),
  session_timeout_minutes integer not null default 1440
    check (session_timeout_minutes between 15 and 43200),
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint web_chat_configs_public_key_format
    check (public_key ~ '^wc_[a-f0-9]{36}$'),
  constraint web_chat_configs_primary_color_format
    check (primary_color ~ '^#[0-9A-Fa-f]{6}$')
);

comment on table public.web_chat_configs is
  'Configuración pública y segura del widget de chat web por workspace.';

create table if not exists public.web_chat_sessions (
  id uuid primary key default gen_random_uuid(),
  config_id uuid not null
    references public.web_chat_configs(id) on delete cascade,
  workspace_id uuid not null
    references public.workspaces(id) on delete cascade,
  contact_id uuid not null
    references public.contacts(id) on delete cascade,
  conversation_id uuid not null unique
    references public.conversations(id) on delete cascade,
  session_token_hash text not null unique,
  origin text not null,
  page_url text,
  ip_hash text,
  user_agent text,
  status text not null default 'open'
    check (status in ('open', 'closed', 'blocked', 'expired')),
  message_count integer not null default 0
    check (message_count >= 0),
  last_activity_at timestamptz not null default now(),
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint web_chat_sessions_token_hash_format
    check (session_token_hash ~ '^[a-f0-9]{64}$')
);

comment on table public.web_chat_sessions is
  'Sesiones anónimas controladas que enlazan el chat del sitio con CRM y Conversaciones.';

create index if not exists web_chat_sessions_workspace_activity_idx
  on public.web_chat_sessions(workspace_id, last_activity_at desc);

create index if not exists web_chat_sessions_contact_idx
  on public.web_chat_sessions(contact_id, created_at desc);

create index if not exists web_chat_sessions_ip_idx
  on public.web_chat_sessions(ip_hash, created_at desc)
  where ip_hash is not null;

create or replace function public.touch_web_chat_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists web_chat_configs_touch_updated_at
  on public.web_chat_configs;

create trigger web_chat_configs_touch_updated_at
before update on public.web_chat_configs
for each row execute function public.touch_web_chat_updated_at();

drop trigger if exists web_chat_sessions_touch_updated_at
  on public.web_chat_sessions;

create trigger web_chat_sessions_touch_updated_at
before update on public.web_chat_sessions
for each row execute function public.touch_web_chat_updated_at();

alter table public.web_chat_configs enable row level security;
alter table public.web_chat_sessions enable row level security;

revoke all on public.web_chat_configs from anon;
revoke all on public.web_chat_sessions from anon;

grant select, insert, update on public.web_chat_configs to authenticated;
grant select on public.web_chat_sessions to authenticated;

drop policy if exists web_chat_configs_member_select
  on public.web_chat_configs;

create policy web_chat_configs_member_select
on public.web_chat_configs for select
to authenticated
using (
  public.is_super_admin()
  or public.is_workspace_member(workspace_id)
);

drop policy if exists web_chat_configs_admin_insert
  on public.web_chat_configs;

create policy web_chat_configs_admin_insert
on public.web_chat_configs for insert
to authenticated
with check (
  public.is_super_admin()
  or exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = web_chat_configs.workspace_id
      and wm.user_id = auth.uid()
      and wm.status = 'active'
      and wm.role in ('owner', 'admin')
  )
);

drop policy if exists web_chat_configs_admin_update
  on public.web_chat_configs;

create policy web_chat_configs_admin_update
on public.web_chat_configs for update
to authenticated
using (
  public.is_super_admin()
  or exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = web_chat_configs.workspace_id
      and wm.user_id = auth.uid()
      and wm.status = 'active'
      and wm.role in ('owner', 'admin')
  )
)
with check (
  public.is_super_admin()
  or exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = web_chat_configs.workspace_id
      and wm.user_id = auth.uid()
      and wm.status = 'active'
      and wm.role in ('owner', 'admin')
  )
);

drop policy if exists web_chat_sessions_member_select
  on public.web_chat_sessions;

create policy web_chat_sessions_member_select
on public.web_chat_sessions for select
to authenticated
using (
  public.is_super_admin()
  or public.is_workspace_member(workspace_id)
);

-- Configuración inicial para el sitio oficial de Proyecto Compás.
insert into public.web_chat_configs (
  workspace_id,
  enabled,
  allowed_origins,
  widget_title,
  widget_subtitle,
  welcome_message,
  offline_message,
  primary_color,
  position,
  require_contact_method,
  privacy_url
)
select
  w.id,
  true,
  array[
    'https://proyectocompas.com',
    'https://www.proyectocompas.com'
  ]::text[],
  'Proyecto Compás',
  'Dirección para transformar tus ideas',
  'Hola. Cuéntanos qué deseas crear: un libro, curso, marca, página o plataforma. El Super Agente te ayudará a dar el siguiente paso.',
  'Gracias por escribirnos. Tu contacto quedó registrado y un integrante de Proyecto Compás continuará la conversación.',
  '#0F766E',
  'right',
  true,
  'https://www.proyectocompas.com/aviso-de-privacidad.html'
from public.workspaces w
where lower(btrim(w.name)) = lower('Proyecto Compás')
on conflict (workspace_id) do update set
  enabled = true,
  allowed_origins = excluded.allowed_origins,
  widget_title = excluded.widget_title,
  widget_subtitle = excluded.widget_subtitle,
  welcome_message = excluded.welcome_message,
  offline_message = excluded.offline_message,
  primary_color = excluded.primary_color,
  position = excluded.position,
  require_contact_method = excluded.require_contact_method,
  privacy_url = excluded.privacy_url,
  updated_at = now();

notify pgrst, 'reload schema';

commit;
