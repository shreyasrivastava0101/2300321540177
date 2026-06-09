# Notification System Design

## System Overview
This project is a simple, lightweight Notification System consisting of a React frontend and a minimal backend structure. The application fetches notifications from an external API, displays them in a clean Material UI interface, and allows users to filter high-priority notifications. It also integrates a custom logging middleware to track important actions without crashing the main application flow.

## API Endpoints Used
- **Fetch Notifications**: `GET http://4.224.186.213/evaluation-service/notifications` (Used to fetch paginated and filtered notifications)
- **Send Logs**: `POST http://4.224.186.213/evaluation-service/logs` (Used by the logging middleware to record application events)

## Frontend Structure
The frontend is built with React, Vite, and Material UI. It includes:
- **Pages**:
  - `AllNotifications.jsx`: The default view showing all notifications.
  - `PriorityNotifications.jsx`: A filtered view showing only high-priority events (Event, Result, Placement).
- **Components**:
  - `Navbar.jsx`: Handles navigation routing.
  - `FilterBar.jsx`: Provides UI for filtering notification types.
  - `NotificationList.jsx`: Container for mapping and displaying cards.
  - `NotificationCard.jsx`: Displays individual notification details with visual distinction for viewed/unviewed states.

## Logging Middleware
The `logging_middleware` acts as a reusable utility. 
- It exports a `Log(stack, level, package_name, message)` function.
- It intercepts key actions (page loads, API calls, clicks) and sends a POST request to the log server.
- Built with a `try-catch` wrapper, it fails silently to ensure that if the logging service goes down, the main application remains unaffected.

## Data Flow
1. **API**: The frontend makes HTTP requests to the external notification service.
2. **Service**: The `api.js` file handles the fetching logic (`fetchNotifications`).
3. **State**: React hooks (`useState`, `useEffect`) store the fetched data, loading status, and any potential errors in the component state.
4. **UI**: State changes trigger React to re-render the components (`NotificationList`, `NotificationCard`), updating the user interface.

## Viewed/Unviewed Logic
- When a user clicks on a `NotificationCard`, its unique ID is stored in the browser's `localStorage`.
- The application reads this list of viewed IDs from `localStorage` during rendering.
- If a notification's ID exists in the viewed list, it is marked as "viewed" and its appearance (background color, font weight) changes to indicate it has been read.
