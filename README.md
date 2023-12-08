## Getting Started

Create Clerk

- Go to https://dashboard.clerk.com/
- Create account & application 
- Create organizations
- Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY` & `CLERK_ORGANIZATION_ID` to `.env`
- Go to Sessions => Customize session token => Edit
- Add json below and save (https://clerk.com/docs/backend-requests/making/custom-session-token)

```json
{
	"organizations": "{{user.organizations}}",
	"email": "{{user.primary_email_address}}",
	"image": "{{user.image_url}}",
	"lastName": "{{user.last_name}}",
	"firstName": "{{user.first_name}}",
	"phoneNumber": "{{user.primary_phone_number}}"
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
