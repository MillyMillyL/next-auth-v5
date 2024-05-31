## Introduction

A practice project demonstrating the implementation of authentication and user management using NextAuth.js.


## Technologies Used
```
Next JS
Next Auth
Prisma
PostgreSQL Database
Resend
Tailwind CSS
Shadcn
```

## Key features

**NextJS NextAuth**
```
Next-auth v5 (Auth.js)
Next.js 14 with server actions
Next.js middleware
Extending & Exploring next-auth session
Next-auth callbacks
```

**Next-auth Providers:**
```
Credentials Provider
OAuth Provider (Social login with Google & GitHub)
```

**Functions & components:**
```
Forgot password functionality
Email verification
Two factor verification (2FA)
User roles (Admin & User)
Login component (Opens in redirect or modal)
Register component
Forgot password component
Verification component
Error component
Login button
Logout button
```

**Role-based access Control:**
```
Role Gate
Render content for admins using RoleGate component
Protect API Routes for admins only
Protect Server Actions for admins only
```

**Server side VS Client side:**
```
Server component
Client component
useCurrentUser hook(client side use)
useRole hook(client side use)
currentUser utility(server side)
currentRole utility(server side)
```

**Upate settings:**
```
Change email with new verification in Settings page
Change password with old password confirmation in Settings page
Enable/disable two-factor auth in Settings page
Change user role in Settings page (for development purposes only)
```

