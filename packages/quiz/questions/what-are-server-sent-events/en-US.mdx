---
title: What are server-sent events?
---

## TL;DR

[Server-sent events (SSE)](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) is a standard that allows a web page to receive automatic updates from a server via an HTTP connection. Server-sent events are used with `EventSource` instances that opens a connection with a server and allows client to receive events from the server. Connections created by server-sent events are persistent (similar to the `WebSocket`s), however there are a few differences:

| Property | `WebSocket` | `EventSource` |
| --- | --- | --- |
| Direction | Bi-directional – both client and server can exchange messages | Unidirectional – only server sends data |
| Data type | Binary and text data | Only text |
| Protocol | WebSocket protocol (`ws://`) | Regular HTTP (`http://`) |

**Creating an event source**

```js
const eventSource = new EventSource('/sse-stream');
```

**Listening for events**

```js
// Fired when the connection is established.
eventSource.addEventListener('open', () => {
  console.log('Connection opened');
});

// Fired when a message is received from the server.
eventSource.addEventListener('message', (event) => {
  console.log('Received message:', event.data);
});

// Fired when an error occurs.
eventSource.addEventListener('error', (error) => {
  console.error('Error occurred:', error);
});
```

**Sending events from server**

```js
const express = require('express');
const app = express();

app.get('/sse-stream', (req, res) => {
  // `Content-Type` need to be set to `text/event-stream`.
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Each message should be prefixed with data.
  const sendEvent = (data) => res.write(`data: ${data}\n\n`);

  sendEvent('Hello from server');

  const intervalId = setInterval(() => sendEvent(new Date().toString()), 1000);

  res.on('close', () => {
    console.log('Client closed connection');
    clearInterval(intervalId);
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
```

In this example, the server sends a "Hello from server" message initially, and then sends the current date every second. The connection is kept alive until the client closes it

---

## Server-sent events (SSE)

Server-sent events (SSE) is a standard that allows a server to push updates to a web client over a single, long-lived HTTP connection. It enables real-time updates without the client having to constantly poll the server for new data.

## How SSE works

1. The client creates a new `EventSource` object, passing the URL of the `server-side` script that will generate the event stream:

   ```js
   const eventSource = new EventSource('/event-stream');
   ```

2. The server-side script sets the appropriate headers to indicate that it will be sending an event stream (`Content-Type: text/event-stream`), and then starts sending events to the client.
3. Each event sent by the server follows a specific format, with fields like `event`, `data`, and `id`. For example:

   ```js
   event: message
   data: Hello, world!

   event: update
   id: 123
   data: {"temperature": 25, "humidity": 60}
   ```

4. On the client-side, the `EventSource` object receives these events and dispatches them as browser events, which can be handled using event listeners or the `onmessage` event handler:

   ```js
   eventSource.onmessage = function (event) {
     console.log('Received message:', event.data);
   };

   eventSource.addEventListener('update', function (event) {
     console.log('Received update:', JSON.parse(event.data));
   });
   ```

5. The `EventSource` object automatically handles reconnection if the connection is lost, and it can resume the event stream from the last received event ID using the `Last-Event-ID HTTP header`.

## SSE features

- **Unidirectional**: Only the server can send data to the client. For bidirectional communication, web sockets would be more appropriate.
- **Retry mechanism**: The client will retry the connection if it fails, with the retry interval specified by the `retry:` field from the server.
- **Text-only data**: SSE can only transmit text data, which means binary data needs to be encoded (e.g., Base64) before transmission. This can lead to increased overhead and inefficiency for applications that need to transmit large binary payloads.
- **Built-in browser support**: Supported by most modern browsers without additional libraries.
- **Event types**: SSE supports custom event types using the `event:` field, allowing categorization of messages.
- **`Last-Event-Id`**: The client sends the `Last-Event-Id` header when reconnecting, allowing the server to resume the stream from the last received event. However, there is no built-in mechanism to replay missed events during the disconnection period. You may need to implement a mechanism to handle missed events, such as using the `Last-Event-Id` header.
- **Connection limitations**: Browsers have a limit on the maximum number of concurrent SSE connections, typically around 6 per domain. This can be a bottleneck if you need to establish multiple SSE connections from the same client. Using HTTP/2 will mitigate this issue.

## Implementing SSE in JavaScript

The following code demonstrates a minimal implementation of SSE on the client and the server:

- The server sets the appropriate headers to establish an SSE connection.
- Messages are sent to the client every 5 seconds.
- The server cleans up the interval and ends the response when the client disconnects.

On the client:

```js
// Create a new EventSource object
const eventSource = new EventSource('/sse');

// Event listener for receiving messages
eventSource.onmessage = function (event) {
  console.log('New message:', event.data);
};

// Event listener for errors
eventSource.onerror = function (error) {
  console.error('Error occurred:', error);
};

// Optional: Event listener for open connection
eventSource.onopen = function () {
  console.log('Connection opened');
};
```

On the server:

```js
const http = require('http');

http
  .createServer((req, res) => {
    if (req.url === '/sse') {
      // Set headers for SSE
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });

      // Function to send a message
      const sendMessage = (message) => {
        res.write(`data: ${message}\n\n`); // Messages are delimited with double line breaks.
      };

      // Send a message every 5 seconds
      const intervalId = setInterval(() => {
        sendMessage(`Current time: ${new Date().toLocaleTimeString()}`);
      }, 5000);

      // Handle client disconnect
      req.on('close', () => {
        clearInterval(intervalId);
        res.end();
      });
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(8080, () => {
    console.log('SSE server running on port 8080');
  });
```

## Summary

Server-sent events provide an efficient and straightforward way to push updates from a server to a client in real-time. They are particularly well-suited for applications that require continuous data streams but do not need full bidirectional communication. With built-in support in modern browsers, SSE is a reliable choice for many real-time web applications.

## Further reading

- [Using server-sent events - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
- [Server-sent Events - javascript.info](https://javascript.info/server-sent-events)
- [Server-sent Events: A WebSockets alternative ready for another look](https://ably.com/topic/server-sent-events)
- [What are SSE (Server-Sent Events) and how do they work?](https://bunny.net/academy/http/what-is-sse-server-sent-events-and-how-do-they-work/)
