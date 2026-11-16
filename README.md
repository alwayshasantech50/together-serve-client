# TogetherServe

TogetherServe is a community-service event platform where users can
discover local causes, organize events, and participate in activities
that support their communities.


## Live Website

https://together-serve-client.vercel.app/

## Features

- Email/password registration and login, plus Google authentication.
- Public upcoming events with title/location search and event-type filtering.
- A homepage displaying six upcoming events retrieved from MongoDB.
- Protected event creation with future-date validation.
- Event joining with duplicate-registration prevention.
- A private Joined Events page with participation cancellation.
- Event management with ownership-protected updates and deletion.
- Profile viewing and editing for names and profile photos.
- Persistent light and dark themes.
- Responsive layouts, loading feedback, and toast notifications.



## Technology use

### Client
- Next.js App Router
- JavaScript
- Tailwind CSS
- DaisyUI
- BetterAuth client
- React Hot Toast
- Lucide React

### Server
- Express.js
- MongoDB
- BetterAuth with MongoDB adapter
- JWT verification using jose




