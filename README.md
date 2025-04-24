# SvelteKit with Node.js and WebSockets Example

This project demonstrates how to integrate a SvelteKit frontend with a Node.js backend using Socket.IO for real-time communication.

## Setup Overview

1.  **SvelteKit Frontend (`src/`)**:
    *   The main page (`src/routes/+page.svelte`) connects to the WebSocket server running on `http://localhost:3000`.
    *   It listens for the `eventFromServer` message from the server.
    *   When a message is received, it displays a temporary notification ("Data has been updated! Page refreshed.") and calls `invalidate('app:page')` which can be used to trigger data reloading if `load` functions depend on it.

2.  **Node.js Backend (`server/index.js`)**:
    *   Uses Express to create an HTTP server.
    *   Integrates Socket.IO for WebSocket communication.
    *   Serves the built SvelteKit application using `handler` from `../build/handler.js`.
    *   Provides an HTTP POST endpoint `/api/trigger-ws`.

## How it Works

*   The SvelteKit application runs in the browser and establishes a WebSocket connection to the Node.js server.
*   The Node.js server can push messages to the connected SvelteKit clients using Socket.IO.
*   This example includes a specific endpoint (`/api/trigger-ws`) on the Node.js server. Sending a POST request to this endpoint (e.g., using `curl` or Postman) with a JSON body like `{"message": "Your update message"}` will cause the server to broadcast that message to all connected SvelteKit clients via the `eventFromServer` event.

## Potential Use Cases

This basic setup can be extended for various real-time features, such as:

*   **Real-time Notifications:** Pushing alerts or updates to users as events happen on the server.
*   **Live Data Dashboards:** Displaying data that updates automatically without needing page refreshes (e.g., monitoring systems, financial data).
*   **Chat Applications:** Enabling instant messaging between users.
*   **Collaborative Tools:** Allowing multiple users to interact with the same data or document simultaneously.
*   **Activity Feeds:** Showing live updates about actions performed by other users.

## Running the Project

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```
2.  **Build the SvelteKit app:**
    ```bash
    pnpm build
    ```
3.  **Start the Node.js server:**
    ```bash
    node server/index.js
    ```
    Alternatively, you can use the npm script:
    ```bash
    pnpm start
    ```
    The server will be running at `http://localhost:3000`.

4.  **Triggering Updates:**
    Open a separate terminal and send a POST request to the trigger endpoint:
    ```powershell
    Invoke-RestMethod -Uri http://localhost:3000/api/trigger-ws -Method Post -ContentType 'application/json' -Body '{"message": "Hello from server!"}'
    ```
    Or using `curl`:
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"message": "Hello from server!"}' http://localhost:3000/api/trigger-ws
    ```
    You should see the notification appear on the webpage opened at `http://localhost:3000`.
