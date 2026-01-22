# System Design – Workforce & Task Management Platform

## 1. High-Level Architecture
- Frontend: React + TypeScript
- Backend: Node.js + Express
- Database: PostgreSQL
- Auth: JWT (Access + Refresh)
- Deployment: Vercel (FE), Render (BE)

Frontend → API (/api/v1) → Controllers → Services → Repositories → DB

---

## 2. Frontend Architecture
- pages/
  - auth/
  - dashboard/
  - tasks/
  - organization/
  - reports/
- components/
- services/api.ts
- hooks/
- store/

---

## 3. Backend Architecture
- routes/
- controllers/
- services/
- repositories/
- middlewares/
- validators/

Flow:
Route → Controller → Service → Repository → Database

---

## 4. Database ER Diagram (Text)

User
- id
- email
- password
- role (ADMIN | MANAGER | EMPLOYEE)
- location_id
- is_active

Organization
- id
- name
- is_active
- deleted_at

Location
- id
- organization_id
- manager_id
- is_active

Task
- id
- title
- description
- priority
- deadline
- status
- assignee_id

TaskComment
- id
- task_id
- user_id
- comment

TaskHistory
- id
- task_id
- from_status
- to_status
- changed_at

---

## 5. Auth Flow
- Login → accessToken (15 min)
- Refresh token (7 days)
- Role-based route protection

---

## 6. API Structure
Base URL: /api/v1

Modules:
- auth
- organization
- location
- employees
- tasks
- reports
