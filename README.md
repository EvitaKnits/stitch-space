![CI logo](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png)

# Stitch Space: a fibre art portfolio social site

This repository contains the frontend code for the Stitch Space website. The backend API repository can be found [here](https://github.com/EvitaKnits/stitch-space-API). The front end is built using Vite, React, React-Bootstrap, JavaScript, and JSX, and is hosted on Heroku.

This README focuses on the frontend components and functionality within this repository. It also includes general information on the project, such as competitor analysis, development management using GitHub Projects, and the Agile methodology employed throughout the development process. For information regarding the backend API, please refer to the README in the backend repository.

To visit the deployed Stitch Space site [click here](https://stitch-space-f65c363b25bd.herokuapp.com/)

![Home Page](documentation/readmeheader.png)

## Table of Contents

1. [Purpose](#1-purpose)
2. [Features](#2-features)
3. [Requirement Gathering and Planning](#3-requirement-gathering-and-planning)
    - [Brief Competitor Analysis and Target Demographic](#brief-competitor-analysis-and-target-demographic)
    - [User Journeys](#user-journeys)
    - [User Permissions](#user-permissions)
    - [React Components](#react-components)
    - [API Integration](#api-integration)
    - [Data Validation](#data-validation)
    - [Error Messaging](#error-messaging)
4. [User Interface Design](#4-user-interface-design)
    - [Wireframes](#wireframes)
    - [Colour Scheme](#colour-scheme)
    - [Icons](#icons)
5. [Testing](#5-testing)
    - [Continuous Testing](#continuous-testing)
    - [Manual Testing](#manual-testing)
    - [Functional Testing](#functional-testing)
    - [Browser Compatibility and Screen Size Responsiveness](#browser-compatibility-and-screen-size-responsiveness)
    - [Code Validation](#code-validation)
    - [Accessibility](#accessibility)
6. [Bugs](#6-bugs)
7. [Set Up and Deployment](#7-set-up-and-deployment)
    - [Libraries](#libraries)
    - [React with Vite Set Up](#react-with-vite-set-up)
    - [Deployment](#deployment)
8. [Agile Methodology](#8-agile-methodology)
    - [Epics and User Stories](#epics-and-user-stories)
    - [Sprint One](#sprint-one-0909-to-1509)
    - [Sprint Two](#sprint-two-1609-to-2209)
    - [Sprint Three](#sprint-three-2309-to-2909)
9. [Future Development](#9-future-development)
10. [Credits](#10-credits)

## 1. Purpose

The goal of this site is to create a dedicated space for fibre artists to showcase their portfolios, allowing their work to be viewed, appreciated, and socially engaged with by fellow fibre artists.

## 2. Features

### Existing Features

-   **Navigation Bar**: at the top of each page, the navigation bar provides all links required to access every part of the site. It is fully responsive and changes its contents depending on whether the user is signed in or not.

**Signed Out**

![Signed Out Navigation Bar](documentation/navbarloggedout.png)

**Signed In**

![Signed In Navigation Bar](documentation/navbar.png)

-   **Home Page**: this page greets the user with a brief overview of what Stitch Space is about, provides an easy way to sign up and shows a small section of featured artists to give a preview of the art to prospective users.

![Home Page](documentation/homepage.png)

-   **Registration Page**: this is a simple and uncluttered page with a short form to fill in, in order to become a Stitch Space member.

![Registration Page](documentation/registration.png)

-   **Feed Page**: this page shows the artwork of all the people you follow, in one convenient place.

![Feed Page](documentation/thefeed.png)

-   **Explore Page**: this page allows you to explore all artwork on the site and find new artists to follow. There are different filtering options to allow you to easily locate the type of work you are interested in.

![Explore Page](documentation/explorepage.png)

-   **Notifications Dropdown**: this dropdown is available in the navigation bar and is therefore found on every page across the site. It provides you with a quick view into the interactions relevant to you. If another user follows you, rates your piece or comments on your piece, it will be displayed here for you to view. Rows show in bold if they've not been seen previously and are more greyed out if they have already been viewed.

![Notifications Dropdown](documentation/notificationsdropdown.png)

-   **My Stitch Space Page**: this serves as your personal artist portfolio. The sidebar gives an overview of you and the main part of the page is dedicated to displaying your artwork. There is a mini-navigation bar at the top to allow users to view all your pieces or just the pieces of each craft at a time.

![My Stitch Space Page](documentation/myss.png)

-   **Followers/Following Sections**: the buttons in the profile sidebar allow you to view the users following this artist, or the users this artist is following.

![Followers Section](documentation/myssfollowers.png)
![Following Section](documentation/myssfollowing.png)

-   **Profile Editing Section**: it is possible to quickly and easily edit your profile details without leaving your 'My Stitch Space' page.

![Profile Edit Section](documentation/myssedit.png)

## 3. Requirement Gathering and Planning

### Brief Competitor Analysis and Target Demographic

When analysing competitors in the realm of online portfolio platforms for artists, several notable options come to mind:

-   Instagram is a popular choice for artists looking to showcase their work due to its large user base and visual-centric approach. However, its broad focus across many content types means it lacks specific features tailored to fibre artists and their unique needs.
-   Etsy provides a platform for selling handmade goods, including fibre arts, but it primarily focuses on e-commerce rather than creating a dedicated portfolio space where artists can purely showcase and engage with their work.
-   Behance and DeviantArt are also widely recognised in the art community for portfolio presentation, but their generalist approach encompasses all art forms, which can make it harder for fibre artists to find a targeted audience and community.

In this landscape, Stitch Space aims to carve out a unique niche by offering a dedicated platform specifically for fibre artists. It focuses on providing a community-driven environment where artists can not only showcase their portfolios but also interact with peers, gain inspiration, and receive feedback. The goal is to foster a specialised community that supports and celebrates the work of fibre artists, making Stitch Space an ideal platform for those looking to share their craft in a more targeted and supportive setting.

### User Journeys

These are the core user journeys, it is not an exhaustive list of all possible user journeys, just the most important ones:

1. Sign Up and Edit User Details

```mermaid
flowchart LR
    A[Navigate to Stitch Space] --> B[Enter details on Registration form]
    B --> C[Click Register button]
    C --> D[Log in with email and password]
    D --> E[Navigate to My Stitch Space page]
    E --> F[Click the Edit Profile button ]
    F --> G[Edit details or add picture or bio]
    G --> H[Save Changes]
```

2. Create a Piece

```mermaid
flowchart LR
    A[Log In] --> B[Navigate to personal Stitch Space page]
    B --> C[Click 'Add a New Piece' button]
    C --> D[Fill in New Piece form]
    D --> E[Click 'Create Piece' button]
```

3. Browse and Interact with Pieces

```mermaid
flowchart TD
    A[Log In] --> B[Click 'Feed' in the navigation bar]
    A --> C[Click 'Explore' in the navigation bar]
    A --> D[Click 'My Stitch Space' in the dropdown from the user icon in the navigation bar]
    B --> E[Click on any piece]
    C --> F[Carry out a search, optionally adding any filters]
    F --> E
    D --> G[Click on 'Following' or 'Followers' and click on a specific user]
    G --> E
    E --> H[Comment on the piece or rate it, if not your own]
```

4. Edit or Delete a Piece

```mermaid
flowchart LR
    A[Log In] --> B[Navigate to personal Stitch Space page via the profile picture in the navigation bar]
    B --> C[Click on a piece then the 'Edit Piece' button]
    C --> D[Change details in Piece form]
    D --> E[Click 'Save Changes' button]
    C --> F[Click on 'Delete Piece' button]
    F --> G[Confirm deletion on modal]
```

5. View Followers or Following

```mermaid
flowchart TD
    A[Log In] --> B[Navigate to personal Stitch Space page via the profile picture in the navigation bar]
    A --> C[Click 'Feed' in the navigation bar]
    A --> D[Click 'Explore' in the navigation bar]
    B --> E[Click on 'Followers' or 'Following' in the sidebar]
    C --> F[Click on any piece then the artist's name]
    D --> G[Carry out a search search, optionally adding any filters]
    G --> F
    F --> E
```

6. View Notifications

```mermaid
flowchart LR
    A[Log In] --> B[Click on the Bell icon in the navigation bar]
```

### User Permissions

Before signing up, users can explore the home page to learn more about Stitch Space and view a sample of featured artists. They can also access the sign-up and login pages without needing an account.

Once signed in, users can access the full site, with restrictions ensuring they can only add, edit, or view their own personal details and artwork.

The table below provides a detailed overview of page access based on authentication and authorisation:

Authentication: Requires the user to be logged in.
Authorisation: Limits access to a user's own content.
Neither: Accessible without being logged in.

| Page                                 | Access Logged Out? | Access Logged In? | Access Only Own? |
| ------------------------------------ | ------------------ | ----------------- | ---------------- |
| Home                                 | Yes                | Yes               | N/A              |
| Sign Up                              | Yes                | No                | N/A              |
| Login                                | Yes                | No                | N/A              |
| Feed                                 | No                 | Yes               | Yes              |
| Explore                              | No                 | Yes               | N/A              |
| Personal Stitch Space: default       | No                 | Yes               | No               |
| Personal Stitch Space: add new piece | No                 | Yes               | Yes              |
| Personal Stitch Space: piece detail  | No                 | Yes               | No               |
| Personal Stitch Space: piece edit    | No                 | Yes               | Yes              |
| Personal Stitch Space: followers     | No                 | Yes               | No               |
| Notifications                        | No                 | Yes               | Yes              |

Admins can access the Django admin panel for the backend API.

### React Components

This project includes several reusable React components that are used across various parts of the application. They are documented below along with their purpose and main props: 

| **Component**          | **Purpose**                                                                 | 
|------------------------|-----------------------------------------------------------------------------|
| `About`                | Displays information about the platform and shows a sign-up button if user is not logged in. |
| `AppHeader`            | The main header of the application, displaying the app's title, profile name, and navigation. |
| `ArtTypeDropdown`      | Dropdown that filters art pieces by type (e.g., knitting, crochet, embroidery). |
| `Comment`              | Renders a comment with the user’s profile info, content, and timestamp. |
| `FeaturedArtists`      | Displays a carousel of featured art pieces. |
| `FollowerCard`         | Displays a follower's profile info with a link to their profile. |
| `NavBar`               | Main navigation bar with links to various app sections, including profile and login/logout. |
| `NotificationsDropdown`| Dropdown menu of user notifications (follows, ratings, comments). | 
| `PieceCard`            | Renders an individual art piece, showing the title, image, and artist’s name. | 
| `SearchBar`            | Search input to filter art pieces by name. |
| `SortByDropdown`       | Dropdown to sort art pieces by various criteria (e.g., title, rating). | 

### API Integration

The HTTP requests specifications have been defined in detail, in the backend API README, [here](https://github.com/EvitaKnits/stitch-space-API). These formats have been used.

**Authentication Mechanism**
JSON Web Tokens (JWTs) are used for token-based authentication.

**Cross-Origin Resourcer Sharing (CORS)**
CORS is configured on the Django backend to allow requests from this React frontend. This has been done using the `django-cors-headers` package which will handle those settings.

**Data Fetching and State Management**
Axios is used for making HTTP requests to the DJango REST API backend.

React Context and Hooks are used for simple state management.

### Data Validation

Comprehensive data format specifications are available in the API repository's README. This frontend ensures that only valid data is sent to the back end by performing field-level validation before submitting any requests.

### Error Messaging

The Django REST API back end will return meaningful HTTP status codes, enabling this React front end to display clear error messages to users, helping them identify and resolve issues. However, because the front end is defensively programmed to prevent scenarios that trigger 400, 404, or most other errors, only a few error messages were necessary. The API-side error codes are documented to support potential direct API access or usage by different front ends.                                                                                         |

## 4. User Interface Design

### Wireframes

The wireframes were created using Balsamiq and they illustrate the core user interface and functionality of Stitch Space from a monitor and mobile device perspective. These visual guides serve as the blueprint for the structure and design of the application, ensuring a cohesive and intuitive user experience.

#### Home Page

![Home Page Wireframe](documentation/home.png)

#### Feed

![Feed Wireframe](documentation/feed.png)

#### Explore

![Explore Wireframe](documentation/explore.png)

#### My Stitch Space

Default View:
![My Stitch Space Wireframe - default view](documentation/mystitchspace.png)

Piece Detail View:
![My Stitch Space Wireframe - piece detail](documentation/piecedetail.png)

Piece Edit View:
![My Stitch Space Wireframe - piece edit](documentation/pieceedit.png)

Followers/Following View:
![My Stitch Space Wireframe - followers/following](documentation/followers.png)

#### User Details

![User Details Wireframe](documentation/userdetails.png)

#### Notifications

![Notifications Wireframe](documentation/notifications.png)

#### Sign Up

![Sign Up Wireframe](documentation/signup.png)

#### Development Notes

The wireframes were broadly stuck to during development, non-minor changes are listed below, with their reasoning:

-   Home Page:

    -   A sign up button was added to the 'About' section when the user was not logged in. This made it easier for new users to sign up right from the home page rather than having to navigate to the navigation bar.
    -   The 'User Details' item was removed from the user icon dropdown as this was not implemented as a separate page in the end (see why in the last part of this section below).

-   My Stitch Space:

    -   The user level rating in the Profile sidebar of this page was not implemented and has now been added to the future development list. This was not a required piece of functionality for the MVP of this site.
    -   The mobile view was not implemented to have dropdown sections, as it was much cleaner to just stack the content and make it scrollable.
    -   There is no upload for photos - instead, URLs of photos hosted elsewhere are used for the MVP of this site. The ability to upload photos directly has been added to the future development list.

-   User Details:
    -   This page was removed completely, because all the edits to the user's information could easily and cleanly be done from the sidebar itself, rather than having to navigate to a whole separate page
    -   Art Types' at the user level was also dropped as this was not required for any functionality after all.

### Colour Scheme

I wanted to pick a fun and energetic palette to reflect the creative nature of this application. My original choices looked great next to each other in theory but when I came to implementing them, they didn't quite work. So after some finessing, I ended up with the following colour scheme:

![Colour Scheme Image](documentation/colours.png)

### Icon

I searched Font Awesome for an icon that could be used that aligns with the theme. I found this 'Stroopwafel' icon which, although represents a waffle, actually also looks like a snippet of cross stitch canvas, so I decided to use it.

![Stroopwafel Icon](documentation/stroopwafel.png)

## 5. Testing

### Continuous Testing

Through a combination of automated testing written using `vitest` for JavaScript, and manual testing from the frontend, I achieved a good coverage of test cases. The code I wrote was also passed through validators/linters at the end to ensure adherence to coding standards and best practices, ultimately aiming for robust and maintainable code.

### Manual Testing

My manual testing covered:

-   Each user journey from end to end - see [User Journeys section](#user-journeys).
-   The level of access when logged out
-   The level of access when logged in and whether the user could only access their own personal details and pieces of functionality intended only for them

Below is a breakdown of the key areas: 

1. **User Registration and Authentication**

**Goal**: To verify that users can register, log in, and log out correctly.

**Steps**:
- Registered with valid credentials.
- Tried to register with invalid credentials (e.g., password mismatch).
- Logged in successfully with valid credentials.
- Tried logging in with incorrect credentials to ensure error messages appeared.
- Logged out and confirmed access to restricted pages was denied after logout.

**Edge Cases**:
- Tried to submit empty or incomplete forms, ensuring appropriate validation messages appeared.
- Attempted to access restricted pages without logging in and verified redirection to the login page.
- Tried to use a duplicate email for registration and ensured that the API prevented it with an appropriate error message.

2. **Profile Management**

**Goal**: To confirm that users can view and edit their profile correctly, including adding a profile image URL and updating personal details.

**Steps**:
- Logged in, navigated to "My Stitch Space", and edited profile details (name, biography, profile image URL).
- Ensured the updated profile details were reflected immediately on the UI.

**Edge Case**:
- Left profile fields empty to test form validation.

3. **Piece Creation, Editing, and Deletion**

**Goal**: To test the full lifecycle of art piece management—creating, editing, and deleting a piece.

**Steps**:
- Created a new art piece by filling out all required fields and submitting the form.
- Edited an existing piece, updating the title and art type.
- Deleted a piece and confirmed it no longer appeared on the "My Stitch Space" page.

**Edge Cases**:
- Left mandatory fields (title, image URL) empty to check if the form prevented submission.
- Checked that only the owner of a piece could edit or delete it, ensuring permission boundaries were respected.

4. **Browsing and Interacting with Art Pieces**

**Goal**: To ensure that users can browse, search, filter, and interact with art pieces (e.g., commenting, rating).

**Steps**:
- Used the search bar and filters on the Explore page to find specific art types.
- Commented on a piece and verified that the comment appeared.
- Rated a piece and ensured the rating updated correctly.

**Edge Cases**:
- Tried submitting an empty comment and verified that the form did not allow it.
- Checked that users could not rate their own pieces by confirming the rating UI was hidden for the piece owner.

5. **Feed and Notifications**

**Goal**: To confirm that users can view their personalised feed and receive notifications of interactions (e.g., follows, comments, ratings).

**Steps**:
- Followed multiple users and verified that their latest pieces appeared in the feed.
- Checked that notifications were marked as new until viewed, and then displayed as read.
- Followed a user, rated their piece, and commented to generate notifications.

**Edge Case**:
- Ensured that notifications only appeared for relevant interactions (e.g., user was notified only when others commented or rated their pieces, not their own actions).

This made up the bulk of the testing and was carried out continuously throughout the build, ensuring each change had the intended result.

### Functional Testing

Functional testing focused on ensuring that each component worked as intended and handled user interaction smoothly. This included testing functionality such as:

**Navigation**: Verified that all links, including internal navigation, worked correctly (e.g., clicking on a profile, going to a piece's detail page).
**Dropdowns**: Ensured that dropdowns (e.g., notifications, user menu, art type filter) functioned correctly and responded to clicks.
**Search and Filtering**: Checked that search and filter inputs dynamically updated results and that the system performed as expected with both broad and narrow search terms.

### Browser Compatibility and Screen Size Responsiveness

I viewed the site on each of the three key screen sizes (mobile, tablet and computer), using devtools, on three of the most popular browsers. 

Pixel references for each of the screen sizes:

| Screen             | Pixels |
| ------------------ | ------ |
| Mobile - iPhone SE | 375px  |
| Tablet - iPad Mini | 768px  |
| Computer           | 1366px |

| Browser | Screen Size       | Appearance | Responsiveness |
| ------- | ----------------- | ---------- | -------------- |
| Chrome  | Mobile            | Good       |     Bug 11     |
|         | Tablet            | Good       |     Good       |
|         | Computer          | Good       |     Good       |
| Firefox | Mobile            | Good       |     Bug 11     |
|         | Tablet            | Good       |     Good       |
|         | Computer          | Good       |     Good       |
| Safari  | Mobile            | Good       |     Bug 11     |
|         | Tablet            | Good       |     Good       |
|         | Computer          | Good       |     Good       |

**Goal**: To verify that the site is fully responsive across different screen sizes and that the UI adapts correctly on mobile devices.

**Steps**:
- Used dev tools to simulate mobile (iPhone SE), tablet (iPad Mini), and computer (1366px) views in Chrome, Firefox, and Safari.
- Ensured that components e.g. the navigation bar, piece cards and comments page were usable and well-formatted on smaller screens.
- Ensured that each page looked as intended on all screen sizes.

### Code Validation

| Language   | Validation Method                                                             | Outcome |
| ---------- | ----------------------------------------------------------------------------- | ------- |
| HTML       | Via direct input on [W3C HTML Validator](https://validator.w3.org/)           |  No errors |
| CSS        | Via direct input on [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) |  No errors |
| JavaScript | Via command line [ES Lint](https://eslint.org/)                               |  No errors |


### Accessibility

**Lighthouse**

To ensure the front end of my program was accessible I used Lighthouse and recorded the final results for each page below:

| Page | Result |
| ---- | ------ |
| Home | ![Lighthouse: Home](documentation/lighthousehome.png) |
| Login | ![Lighthouse: Login](documentation/lighthouselogin.png) |
| Feed | ![Lighthouse: Feed](documentation/lighthousefeed.png) |
| Explore | ![Lighthouse: Explore](documentation/lighthouseexplore.png) |
| My Stitch Space | ![Lighthouse: Profile](documentation/lighthouseprofile.png) |
| MSS: Piece Detail | ![Lighthouse: Piece](documentation/lighthousepiece.png) |
| MSS: New Piece | ![Lighthouse: New Piece](documentation/lighthousenewpiece.png) |
| MSS: Followers | ![Lighthouse: Followers](documentation/lighthousefollowers.png) |
| MSS: Following | ![Lighthouse: Following](documentation/lighthousefollowing.png) |

Where there is less than 100% performance above (Feed, Explore, My Stitch Space), this is due to the 'Masonic' library I used for the 'Masonry Wall' component. I unfortunately did not realise that there is an accessibility issue in that library and now it is central to my project. This is a known issue logged in the repository's 'Issues' tab on [GitHub](https://github.com/jaredLunde/masonic/issues/133).

## 6. Bugs

Here is a list showing a selection of bugs found towards the end of development. This list is not exhaustive but is intended to give a sample of the types of things that were found and fixed. I don't believe I have left any unresolved bugs.

### Bug One

Issue: The background colour of the Notifications drop down button in the Navigation bar was the primary colour used for other buttons, but should match the beige background colour in this context, like the dropdown user button next to it.

![Bug One](documentation/bug1.png)

Fix: I removed the separate NotificationsDropdown.module.css file and imported the file styling the user icon button (NavBar.module.css) so they would match, as they are both in the navigation bar. I moved the styling I wanted to keep for the notification items too.

![Bug One Fixed](documentation/navbar.png)

### Bug Two

Issue: The 'Sign Up' button that had previously shown up in the 'About' section of the home page when the user viewing the page was not signed in, disappeared at some point during development.

Fix: I found that I was not handling the loading state properly in the context so the condition for the sign up button to appear was never met. I moved the setting of the loading state to a 'finally' clause at the end (see below), to ensure it would be set correctly and the button would appear in the right circumstances.

**Sign up button**
```
{!userContext.loading && !userContext.currentUser && (
    <div className="d-flex justify-content-center">
        <Button
            className={styles.SignUpButton}
            onClick={handleSignUpClick}
        >
            Sign Up
        </Button>
    </div>
)}
```

**Context**
```
const handleMount = async () => {
    try {
        const { data } = await axiosClient.get('dj-rest-auth/user/')
        setCurrentUser(data)

    } catch (err) {
        console.error(err)
    }
    finally {
        setLoading(false)
    }
}
```

This is the button showing up as intended post-fix:

![Bug Two Fixed](documentation/bug2fixed.png)

### Bug Three

Issue: Clicking on the 'Sign Up' link in the user dropdown found in the navigation bar, redirects to the 'Login' page.

Fix: I changed all the 'href' links in the NavBar.jsx file to use 'Link' from react-router-dom.

### Bug Four

Issue: Registering a new user, doesn't assign their first name and last name correctly to the database, thus their Stitch Space is wrong.

![Bug Four](documentation/bug4.png)

Fix: This was a back end issue solved in the API repository as **bug one** for that repository. See the [README](https://github.com/EvitaKnits/stitch-space-API) for full details.

![Bug Four Fixed](documentation/bug4fixed.png)

### Bug Five

Issue: The 'Stitcher Since' timestamp was not showing a very user friendly date. (See image from bug four which also shows bug five's issue)

Fix: I added a helper function to transform the timestamp to the format I desired, e.g instead of '2024-10-01T11:53:33.146351Z', it is now '1 October 2024'. (See image of fix from bug four which also shows this fix)

### Bug Six

Issue: The Navigation Bar doesn't indicate which page you are currently on in any way. This needs changing to be less confusing.

![Bug Six](documentation/bug6.png)

Fix: I added the 'useLocation' hook from 'react-router-dom' and some conditional CSS formatting to make the page name bold when the user is on that page.

![Bug Six Fixed](documentation/bug6fixed.png)

### Bug Seven

Issue: It is currently possible for a user to rate their own pieces.

![Bug Seven](documentation/bug7.png)

Fix: I added a check that only displays the rating element if the user is **not** the owner of the piece. This means the owner of the piece doesn't have access to the field to rate their own piece.

![Bug Seven Fixed](documentation/bug7fixed.png)

### Bug Eight

Issue: The colour of the icons in the notification dropdown do not match the colour scheme and the rest of the icons on the site.

![Bug Eight](documentation/bug8.png)

Fix: I found that I had accidentally left in some inline styling I added to these icons when I was first sketching out the notifications dropdown and wanted to make them more visible. I removed this and they followed the styling of the 'icons' class as expected.

![Bug Eight Fixed](documentation/notificationsdropdown.png)

### Bug Nine

Issue: There is no upload date on the Piece Detail view below the type of craft the piece is. See bug 7 screenshots, as this issue is present there.

Fix: This was just a typo. I had put 'createdDate' and not 'createdAt' which is the actual name of the field in the API response. I also applied the formatting I used in bug 5 to make the timestamp more user friendly.

![Bug Nine Fixed](documentation/bug9fixed.png)

### Bug Ten

Issue: The 'Stitch Space' title in the App header is not behaving as expected and puts the artist's name in there on every page once they've logged in, rather than only on their personal Stitch Space. 

![Bug Ten](documentation/bug10.png)

Fix: I used the 'useLocation' hook from 'react-router-dom' again to determine where the user is in the site and whether the title should include their name or not. 

![Bug Ten Fixed](documentation/bug10fixed.png)

### Bug Eleven

Issue: The three buttons displayed above the image on the Piece Detail page get stuck together on mobile screens

![Bug Eleven](documentation/bug11.png)

Fix: I just added some bootstrap margin utilities - one of them adds a small margin on top on mobile view and the other makes sure this margin is removed for small screens and above. Thus, the buttons appear responsively for all screen sizes.

![Bug Eleven Fixed](documentation/bug11fixed.png)

## 7. Set Up and Deployment

### Libraries

Several front end libraries were utilised during this project. Below I set out which ones, their purpose and my reasoning for using them. 

| **Library**            | **Purpose**                                                                 | **Reasoning**                                                |
|------------------------|-----------------------------------------------------------------------------|---------------------------------------------------------------------|
| **React** | A JavaScript library for building user interfaces. | React's component-based structure makes it easy to manage the dynamic UI in this project by keeping the code modular, reusable, and efficient when it comes to rendering and managing state.|
| **React Router** | Enables routing and navigation in single-page applications. | Handles navigation and dynamic route management smoothly, making it easy to switch between pages like profiles, art pieces, and searches, while keeping the URL structure clean and organised. |
| **React Bootstrap**  | A UI framework that provides pre-built responsive components.  | Speeds up UI development with ready-made, responsive components like forms, buttons, and modals. This keeps the app's design consistent and cuts down on the need for writing custom CSS. |
| **Font Awesome** | A library of vector icons for use in the UI.  | Provides a wide range of customisable icons that enhance the visual appeal and user experience by providing clear, intuitive cues (like notification and profile icons), all without adding much overhead to the project. |
| **Masonic** | A masonry grid layout library for React.  | This library renders only the visible items in a grid, which works well for displaying art pieces in a staggered, gallery-style layout. It helps keep the interface clean and organised, even with large collections of items. |
| **Axios**  | A promise-based HTTP client for making requests to APIs. | Simplifies making asynchronous HTTP requests to the backend, including handling authentication tokens and error management. |


### React with Vite Set Up

This is how I set up React with Vite.

1. Created a New Vite Project
   Used the `create-vite` [tool](https://vitejs.dev/guide/) to initialise a new Vite project with a React template. Ran the following command in the terminal:

```bash
npm create vite@latest . -- --template react
```

2. Installed dependencies
   Navigated to the project directory and installed the necessary dependencies with: `npm install`
3. Tested the setup
   To verify everything is set up correctly, I ran the development server using: `npm run dev`
    > Note: To serve the bundled JavaScript files after Vite transpiles the JSX, a simple server is needed.
4. Added Express for Server Setup
   To create a basic server, added `express` to my project dependencies. Updated my `package.json` and installed the new dependencies using: `npm install express`
    > Note: Needed to ensure `express` was added to the `dependencies` section, not `devDependencies`. This is needed for production environments where `devDependencies` are not installed.
5. Created a Basic Server File
   Created a `server.js` file to set up an Express server. This server will serve the `dist/index.html` file generated by Vite when I run the build script: `npm run build`
6. Updated `package.json` Scripts
   Added a new script to my `package.json` to start the Express server:

```json
"start": "node server.js"
```

7. Ran the Express Server
   Now I can start the server with this command: `npm start`
    > Note: The server will not display the app unless you've built the project using the build script.
8. Specified Node and npm Versions
   To ensure compatibility with Heroku (the deployment environment), I specified the Node.js and npm versions in the `engines` section of my `package.json`

### Running Locally

-   Install Node and npm
-   Install the dependencies by running: `npm install`
-   Run the Vite build in development mode with: `npm run dev`

### Deployment

This project was deployed to [Heroku](https://id.heroku.com/login): a hosting platform.

## 8. Agile Methodology

After getting both repositories set up and all planning carried out, both READMEs in both repositories were updated with as much information as possible up front, to have a strong basis from which to develop. I then set this project up in GitHub projects using agile methodology. This facilitated my prioritisation and time management. I added the high level epics, created the user stories as issues within them, created the three one-week sprints I intended to complete the development portion of this project in, and populated the first sprint.

### Epics and User Stories

My user stories can be seen in full in the associated GitHub Project on my repo. This is where all the details, including tasks and acceptance criteria can be seen. These user stories have been assigned to Epics.

| Epic                | Stories                                    |
| ------------------- | ------------------------------------------ |
| User Management     | Connect placeholder frontend and backend |
|                     | User registration                          |
|                     | User login and logout                      |
|                     | Password reset                             |
|                     | Create user details page                   |
| Piece Management    | Create piece                               |
|                     | Edit piece                                 |
|                     | Delete piece                               |
| Social Interactions | Comment on a piece                         |
|                     | Rate a piece                               |
|                     | Follow a user                              |
|                     | View following/followers                   |
|                     | Receive notifications for interactions     |
| Browsing Pieces     | Create basic home page                     |
|                     | Create basic feed page                     |
|                     | Create basic explore page                  |
|                     | Create 'My Stitch Space' page              |

### Sprint One: 09/09 to 15/09

![Sprint One Screenshot](documentation/sprint1.png)

-   Sprint Planning: this involved taking the highest priority issues and assigning them to the first sprint. The highest priority story involves wiring up the front and back ends so may take up the whole sprint. This was the only one marked as must have. The next two were should haves and the final one a could have. This gave me a breakdown of 25% for must, 50% for should and 25% for could.
-   Sprint Retrospective:
    -   Achievements: Completing the thin slice and connecting the placeholder frontend and backend.
    -   Progress: A stable, deployed base on which to develop the rest of the project.
    -   Challenges: There was less time than anticipated to work on my project and the thin slice proved more difficult to complete too. The Cross-Origin Resource Sharing (CORS) element needed specific configuration that took a while to figure out for example.
    -   Action Next Sprint: The goal for next sprint is to get the basic page structure created with dummy data, to provide a basis from which to develop the backend further in future sprints.

### Sprint Two: 16/09 to 22/09

![Sprint Two Screenshot](documentation/sprint2.png)

-   Sprint Planning: Creating the basic home page and the user details page are must haves this sprint, then the remaining stories from Epic 4: Browsing Pieces are distributed between should haves and could haves. The breakdown for this sprint is 40% must have, 40% should have and 20% could have.
-   Sprint Retrospective:
    -   Achievements: Completing such a large amount of work in one sprint.
    -   Progress: Created all of the front end pages and created all the models, views and endpoints for the API.
    -   Challenges: Switching between the front and back ends was difficult at times, as different languages and mindsets were required. Also, knowing how to break up the stories in this type of project. I cancelled a couple of existing user stories, and added 6 more to cover the creation and API integration of each model. I then worked on 6 stories at once, incrementally adding to each of them. This doesn't feel optimal.
    -   Action Next Sprint: The goal for the third sprint is to finish the whole project. I managed to set aside a lot of time for these two sprints to aim to finish by the end of September. This will involve integration of the frontend and the API, then the implementation of the final small pieces of functionality such as receiving notifications.

### Sprint Three: 23/09 to 29/09

![Sprint Three Screenshot](documentation/sprint3.png)

-   Sprint Planning: Completing the API integration is a must have this sprint, so all 6 of these stories have been marked as such. The remaining stories have been added to this sprint and marked as should haves, as I am aiming to finish this project this sprint. This gives me 40% must haves and 60% should haves.
-   Sprint Retrospective:
    -   Achievements: Completing all user stories.
    -   Progress: The bulk of the work was finished in this sprint, leaving just the final parts to polish off and some bugs to fix, followed by the write up in the READMEs for the front and back end repositories.
    -   Challenges: There was a steep learning curve here with the integration, so this took more time than anticipated.

### Wrapping Up: 30/09 to 02/10

These few days were dedicated to the final write up in this README as well as the README in the back end repository. This involved activities such as ensuring accuracy of information, details of testing and bugs and accessibility validation.

## 9. Future Development

-   Add Password Reset functionality for users that have forgotten their password or want to change it.
-   Provide functionality for directly uploading images to the site rather than using URLs of images hosted elsewhere
-   Add a user-level rating which averages the ratings on all their pieces and displays it in the Profile sidebar of the My Stitch Space page.
-   Expand to more obscure fibre arts.
-   Allow users to indicate where a piece belongs to more than one art type.
-   Allow users to be included on the same piece where they've collaborated.
-   Improve endpoints so that it is not possible to create nonsensical entries when hitting them directly, e.g. creating a notification for a user that tells them something relevant to a different user.

## 10. Credits

-   I built my flowcharts using [Mermaid](https://mermaid.js.org/syntax/flowchart.html) in my readme.
-   I visually represented my colour palette using [Adobe Colour](https://color.adobe.com/create/color-wheel).
-   I sourced my icons from [Font Awesome](https://fontawesome.com/).
-   I turned my icon from Font Awesome into a favicon with [Fonticon](https://gauger.io/fonticon/)
-   I generated all my different favicons with [Real Favicon Generator](https://realfavicongenerator.net/)
-   I used [ChatGPT](https://chatgpt.com) to explain error messages, advise on set up and research the best way to go about my implementation.
-   Reference for using Vite instead of Create React App: https://www.freecodecamp.org/news/how-to-create-a-react-app-in-2024/
-   This helped me figure out the mistake I made in the Vite setup where I put `express` in the wrong dependencies section: [Heroku troubleshooting docs](https://devcenter.heroku.com/articles/troubleshooting-node-deploys)
-   The image on the 404 page is by [Noor Sethi on Unsplash](https://unsplash.com/@noorsethi?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
-   I used images from [Lorem Picsum](https://picsum.photos/) during development to give me plenty of data to work with, and for the example pieces in the system that are not the Featured Artist pieces on the Home Page carousel.
-   I used [Masonic](https://github.com/jaredLunde/masonic) library to handle tiling of pieces in places such as the Feed and Explore pages.
- I used [Prettier](https://prettier.io/) to format my code.
- I used [ES Lint](https://eslint.org/) for code validation via the command line.

-   The images on the Featured Artists carousel on the home page have been sourced from [Unsplash](https://unsplash.com/):
    -   Photo titled 'Pandemic Times' is by [Swati H. Das](https://unsplash.com/photos/pink-blue-and-yellow-wooden-musical-instrument-mHkeT419LGM)
    -   Photo titled 'Dark Florals' is by [Ksenia Yakovleva](https://unsplash.com/photos/a-close-up-of-a-embroidery-on-a-black-cloth-with-a-pair-of-scissors-GkwoMPCmwDs)
    -   Photo titled 'Renaissance Woman' is by [Olga Kalinina](https://unsplash.com/photos/a-close-up-of-a-embroidery-on-a-table-k2jyiW9z9yc)

I also used the documentation of all the elements included in this project:

-   [Vite](https://vitejs.dev/guide/)
-   [Vitest](https://vitest.dev/)
-   [React](https://react.dev/reference/react)
-   [React-Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction)

Thank you to fellow Code Institute student Dennis Schenkel who told me about Vite as an option instead of the deprecated 'Create React App'.

**General Credit**
As ever, I want to thank the open source community for the great resources that teach me so much and also remind me of what I learnt in my Code Institute lessons. I also referenced the learning materials and 'Moments' walkthrough projects throughout development to inform my coding decisions.

I believe I have credited where I used specific items in the previous section but this is a general credit to the reference resources I looked through to teach me new elements as well as reminding me how things I'd already come across worked as I went along.

Every effort has been made to credit everything used, but if I find anything else specific later on that needs crediting, that I missed, I will be sure to add it.
