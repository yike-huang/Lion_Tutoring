# Lion Tutoring Website Design

## 1. Project Goal

The website is a scheduling and management system for a high school tutoring club. It should help parents and students request tutoring sessions, help tutors accept and manage sessions, and help admins track schedules and tutoring hours.

The system should be simple enough for families and students to use easily, but structured enough for the club to manage tutor availability, session status, and volunteer hour records.

## 2. User Roles

### Parent

Parents can create an account, request tutoring sessions for a student, check the status of requests, and receive confirmations or reminders.

### Student

Students can also create an account and request tutoring sessions for themselves. The student-facing experience should be very similar to the parent-facing experience.

Parent and student users should both be treated as booking users. They can submit requests, view request status, cancel sessions, and receive updates.

### Tutor

Tutors can create or access tutor accounts, manage their teachable subjects, view incoming requests, accept or decline sessions, see their schedule, and record completed tutoring hours.

### Admin

Admins or club officers can manage tutors, view all requests, manually assign tutors, monitor pending sessions, review completed sessions, and export tutoring hour records.

## 3. Subject Structure

### Math

- Algebra 1
- Geometry
- Algebra 2
- Pre-Calculus
- Calculus

### Science

- Biology
- Chemistry
- Anatomy and Physiology
- Physics

### ACT

- ACT English
- ACT Math
- ACT Reading
- ACT Science

### English

- English

English should remain a broad category for now and should not be split into subcategories in the first version.

SAT should not be included yet because the club currently does not have SAT tutors.

## 4. Account Registration and Login

When users register, they should select one role:

- Parent
- Student
- Tutor
- Admin

The login page should support all four user types:

- Parent
- Student
- Tutor
- Admin

There may be multiple admins, so admin login should be part of the normal login system instead of being limited to one hidden account.

Users should be able to register and log in using either:

- Email and password
- Google sign-in

For email registration, users should provide their name, email address, password, and role.

For Google registration, users should sign in with Google first, then select their role if the account is new.

Admin accounts should be protected more carefully than normal accounts. A user should not be able to freely choose Admin during public registration unless the club wants open admin creation. Recommended options:

- Existing admins invite new admins by email.
- A developer or owner creates the first admin account.
- Admin role requests require approval from an existing admin.

Parent and student accounts should have almost the same interface. The main difference is wording:

- Parent account: requests tutoring for a student.
- Student account: requests tutoring for themselves.

## 5. Booking User Flow

This flow applies to both parent and student users.

1. Select a subject category, such as Math, Science, ACT, or English.
2. Select a specific subject when applicable.
3. Choose whether to request a specific tutor or any available qualified tutor.
4. Select a date and time.
5. Fill in session information:
   - Student name
   - Grade level
   - Contact email
   - Subject
   - Preferred tutor, if any
   - Description of what the student needs help with
6. Submit the tutoring request.
7. View request status.

Possible request statuses:

- Pending: waiting for a tutor to accept.
- Accepted: a tutor has accepted the session.
- Declined: the request was declined.
- Reschedule Requested: a different time has been suggested.
- Cancelled: the request was cancelled.
- Completed: the tutoring session has been completed.

## 6. Tutor Flow

Tutors should have a dashboard with these main areas:

- Pending requests
- Accepted sessions
- Calendar view
- Teachable subjects
- Tutoring hour statistics
- Completed session history

For each request, a tutor can:

- Accept
- Decline
- Suggest another time
- Mark as completed after the session happens

If a booking user requests a specific tutor, only that tutor should receive the request.

If a booking user does not request a specific tutor, the request should be visible to all tutors who are qualified to teach that subject. The first qualified tutor to accept the request gets the session, and the request should no longer be available for other tutors to accept.

## 7. Scheduling and Conflict Rules

The system should treat tutor availability as the main scheduling constraint. Location is not the primary constraint because the club has enough tutoring space.

Rules:

- The same tutor cannot accept two sessions at the same date and time.
- Different tutors can have sessions at the same date and time.
- Multiple unassigned requests can exist for the same date and time.
- An unassigned request only creates a conflict when a specific tutor tries to accept it.
- If a tutor already has an accepted session at that time, the system should prevent them from accepting another session at the same time.

For specific tutor requests, the website should ideally hide or disable times when that tutor is already booked.

For any-tutor requests, the website can allow the request as long as at least one qualified tutor may be available.

## 8. Tutoring Hours Tracking

After a tutoring session is completed, the tutor should click "Mark as Completed" and confirm or enter the actual session details.

The completion form should include:

- Tutoring date
- Start time
- End time
- Actual duration
- Subject
- Student name
- Optional session notes

Once submitted, the session duration should automatically count toward the tutor's tutoring hours.

Each tutor should be able to view:

- Tutoring hours for the current month
- Tutoring hours for the current school year
- Lifetime tutoring hours since becoming a tutor
- List of completed sessions

## 9. Admin Dashboard

Admins should be able to view and manage the whole club system.

Admin features:

- View all tutoring requests
- Filter requests by status, tutor, student, subject, date, or month
- Manually assign a tutor to a request
- Add, remove, or edit tutors
- Set tutor teachable subjects
- View pending requests that have not been accepted
- Review completed sessions
- View tutoring hour totals
- Export tutoring records as a CSV spreadsheet

The admin spreadsheet view should include:

- Tutor name
- Student name
- Requesting user type, parent or student
- Subject
- Date
- Start time
- End time
- Duration
- Status
- Notes

## 10. Email Reminder System

Email reminders can be included in a later version, but the data model should be designed with reminders in mind from the beginning.

Recommended emails:

- Request submitted: sent to the parent or student who submitted the request.
- Request accepted: sent to the booking user and tutor.
- Reminder 24 hours before the session: sent to the booking user and tutor.
- Optional reminder 1 hour before the session: sent to the booking user and tutor.
- Reschedule requested: sent to the other party.
- Cancellation: sent to both parties.
- Session completed: confirmation saved for tutor and admin records.

Emails should include:

- Student name
- Tutor name
- Subject
- Date and time
- Location or online meeting link, if applicable
- Current session status

## 11. First Version MVP

The first version should focus on the most important workflow:

- Account registration and login with Parent, Student, Tutor, and Admin roles
- Email/password authentication
- Google sign-in
- Parent/student tutoring request form
- Subject categories and subcategories
- Specific tutor or any tutor option
- Calendar/date/time selection
- Tutor request dashboard
- Accept and decline request actions
- Basic tutor schedule view
- Conflict detection for the same tutor at the same time
- Mark session as completed
- Tutoring hours calculation
- Tutor monthly, school-year, and lifetime hour totals
- Admin dashboard with all sessions
- CSV export for tutoring hour records

## 12. Second Version Features

After the MVP works reliably, the club can add:

- Email reminders
- Google Calendar integration
- Google Sheets integration
- Rescheduling workflow
- Cancellation workflow
- Tutor availability settings
- Automatic tutor matching
- Attendance tracking
- Parent/student feedback
- Waitlist for high-demand times
- Admin review or approval of submitted tutoring hours

## 13. Product Summary

The website should work as a lightweight tutoring club management system.

Parents and students submit tutoring requests. Tutors accept sessions based on subject and schedule. A session becomes official only after a tutor accepts it. After the session is completed, the tutor records the actual time, and the system automatically tracks monthly, school-year, and lifetime tutoring hours. Admins can oversee all sessions and export records for club management.
