# Full Stack Twitter Clone
![twitter-clone](https://github.com/mmd-moradi/twitter-clone/assets/110211422/565f387f-6dbe-4469-87a6-68c0b598780f)
------------
This project is a full stack Twitter clone that allows users to create accounts, post tweets, follow other users, like tweets, comment on tweets, and edit their profile. It is built using a combination of modern web technologies and provides a seamless user experience.This version of the Twitter clone features a **dark mode** interface.

## Technologies Used

- TypeScript: A statically-typed superset of JavaScript that enhances development productivity and code quality.
- React: A JavaScript library for building user interfaces.
- Next.js: A React framework for building server-side rendered and statically generated applications.
- Prisma: An ORM (Object-Relational Mapping) tool that simplifies database interactions.
- MongoDB: A NoSQL document database for storing and retrieving data efficiently.
- NextAuth.js: A library for authentication in Next.js applications, providing features like authentication providers and session management.

## Features

- **User Registration and Authentication**: Users can create accounts and log in securely using NextAuth.js, ensuring secure access to their account and protected routes.
- **Tweet Creation**: Users can compose and post tweets, sharing their thoughts with their followers and the wider community.
- **User Interaction**: Users can like tweets, comment on tweets, and follow other users, fostering engagement and connection within the platform.
- **Unique User Profiles**: Each user has a unique profile page displaying their tweets, follower count, and following count.
- **Profile Customization**: Users can upload a profile picture and edit their profile information, allowing personalization and expression on their profiles.
- **Notifications**: Users receive notifications for new followers, likes, and comments, ensuring they stay updated with activity related to their account.


## Getting Started

### Setup .env file
You need to add the followings to your .env file.

```js
DATABASE_URL=
NEXTAUTH_JWT_SECRET=
NEXTAUTH_SECRET=
```
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
