# Lion Tutoring

A first-version static website prototype for a high school tutoring club.

The site helps parents and students request tutoring sessions, lets tutors accept and complete sessions, and gives admins a simple dashboard for viewing records and exporting tutoring hours.

## Files

- `index.html` - main website page
- `styles.css` - visual design and responsive layout
- `app.js` - front-end demo logic
- `design.md` - product design document

## Current MVP Features

- Parent/student booking flow
- Sign-in-first flow for Parent/Student, Tutor, and Admin
- Email/password and Google sign-in placeholders
- Subject categories for Math, Science, ACT, and English
- Specific tutor or any qualified tutor option
- Tutor dashboard with pending requests and accepted schedule
- Basic tutor conflict detection
- Mark session as completed and enter tutoring hours
- Admin dashboard with session table and CSV export

## Open Locally

Open `index.html` in a browser.

Because this first version is fully static, it does not require a backend server.

## Deploy With GitHub Pages

1. Push this repository to GitHub.
2. Go to the repository settings.
3. Open the Pages section.
4. Set the source to the main branch.
5. Choose the root folder.
6. Save and wait for GitHub Pages to publish the site.

## Notes

This version stores demo data in the browser session only. A future production version should connect the app to a real backend such as Firebase or Supabase for accounts, saved requests, email reminders, and admin permissions.
