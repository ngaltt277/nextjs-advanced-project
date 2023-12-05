## Getting Started

Create Clerk

- Go to https://dashboard.clerk.com/
- Create account & application
- Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY` to `.env`
- Go to Sessions => Customize session token => Edit
- Add json below and save (https://clerk.com/docs/backend-requests/making/custom-session-token)

```json
{
  "id": "{{user.id}}",
  "email": "{{user.primary_email_address}}",
  "lastName": "{{user.last_name}}",
  "firstName": "{{user.first_name}}",
  "created_at": "{{user.created_at}}",
  "image": "{{user.image_url}}"
}
```

Generate Database

```bash
pnpm prisma generate
```

Access to Database

```bash
npx prisma studio
```

First, run the development server:

```bash
pnpm dev
```

Develop to server:

```bash
pnpm build
```

```bash
pnpm start
```
