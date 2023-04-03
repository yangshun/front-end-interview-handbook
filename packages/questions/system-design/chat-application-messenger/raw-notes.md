In the general case features own SQLite tables that they use to store their data. For instance, the "message reactions" feature might own a reactions table that they use to store the reactions that people have given to specific messages. This data is synced from the Messenger Infrastructure backend and it is presented to the user when he or she opens a conversation. The syncing logic will write data to the reactions table and the UI layer will read from it to present it to the user in a meaningful way. In msys even the operations that are sent to the server, such as when you react to a message, are first inserted into the database before they are sent over the network.

our UI code shouldn't be doing any complicated logic, it should in general just display what is in the database. Focus your schema design on making sure that the view has minimal code.

DataScript also offers type-safe integration with the task framework. In msys a task is how the client sends data to the server (roughly equivalent to running an HTTP request, but more sophisiticated). For instance, when a Messenger user sends a message to someone there is some DataScript program invoked from the client that takes care of inserting an optimistic message in the database (so that the message can be displayed on the UI right away) and also sending an msys task to the server with the content of the message. Upon receiving the task the server will interact with the Messenger Infrastructure to deliver the message to the recipient and it will also send back a response to the original sender to indicate the message was processed.

In general your goal when writing sync logic should be to keep track of what data has changed since you last checked and then send down DataScript code to mutate the database to keep your client back up to date.

## msys Tasks Framework

The major players are:

1. Stored Procedure - The sproc that inserts a new task into the task queue, the "pending_tasks" table (action A). Invoking this sproc from your product logic will kick off this process. At the same time, as a side-effect, this might perform some sort of optimistic write. It doesn't have to, but if you need an optimistic write, this is probably the place to do it.

2. Task Queue - The task queue will send your task to the server over HTTP or MQTT (action B). Tasks have a concept of a queue name and task id. If multiple tasks have the same queue name, they will be sent to the server one-by-one and the next will not be sent until the previous response is received. The queue also supports batching.

3. Task Handler - You write one of these in hack. This acts sort of like an XController. This is the meat-and-potatoes of the operation, and the glue between LightSpeed and the rest of Facebook's infra. Whether it's sending a message, a reaction, adding a participant to a thread, or whatever it is, this is where we actually do that. Like all things, this can either succeed or fail for any reason.

4. Task Response - There are three types of things we can send back in response to a task request: Success Ops This is DASM that we send to indicate to the client, "Your request succeeded, and as a consequence, do this thing." This would also be the place that you'd make an optimistic write Authoritative if you performed one earlier. Failure OPs This is DASM that we send to indicate, "Your request failed permanently, you should do this to recover/clean up what you did before." If you did an optimistic write in step 1, this is where you'd tidy it up. A retryable Exception Any exception is always retried by the client. The client performs exponential backoff, but as of this writing will retry forever, so you have to be careful about what sort of exceptions you send back to the client, because if it's something that's actually a permanent failure, the client's task queue will be blocked from ever advancing.

## Client Side Task Processing

Tasks from a queue are taken in order to send to the server. Tasks currently being processed and have not received a response from the server are marked as in-progress, and no more tasks from the same queue will be processed until the in-progress task(s) return a result.

### CLIENT BATCHING

Up to 5 tasks in the same queue may be batched and sent to the server in a single request. Tasks with different labels may be included in the same batch, and all the tasks will stay in order. This optimization reduces the number of network calls and saves on payload size overhead.

## What are Optimistic Writes?

Optimistic writes allow us to write things to the database locally in response to some action by a user, so that we can drive a UI update. When we get confirmation from the server that whatever we asked it to do is done, and the data that the user caused to be written is good to go, we mark it as "Authoritative". If the write fails we can remove the data or otherwise tidy up so things aren't inconsistent with the server.

This is probably best shown with an example. Suppose you're sending a reaction. The simplest thing we could possibly do is send up the request to add the reaction and then wait for the resulting Delta to come all the way back around from Iris to tell the client to add the reaction. That means that, in the very best case scenario, there's about a one-second round trip all the way through Messaging Infra, so the user will have to wait a whole second for the UI to update, which is a pretty poor user experience. And that's on a good day when the user is in the US and nothing got lost. If the user is in a developing country and something gets lost in the network then the user may never see the updated UI and has an even worse experience. Instead, we immediately add the reaction locally, then if we get an indication that the request to the server succeeded, the client cements the reaction by marking it as "Authoritative". If the server indicates failure, we remove the reaction.

Datascript has built-in support for making optimistic writes easier, and for making sure that we don't accidentally overwrite an authoritative row with a non-authoritative one with features like$table->updateRowIfAuthorityLessThanOrEq(), which makes sure you don't have to re-implement the authority-checking logic yourself, and encapsulates this inside Datascript itself.

To be fully clear - this AUTHORITY column is used to track the authority level of the entire row to help with collisions across client/server. As the client updates a single column on an existing row, the authority level of the row should not be lowered. We don't have a good way right now to track optimistic writes for column, and we require the sync stream to fully reconcile the final state of the world for optimistic write task success/failure. This means that if a task fails, we need to tell the sync stream to reload the data that was being updated (such as thread name, adding participants, etc), and we do not yet track safe rollbacks to be driven by the client.

1. Lightspeed clients work by having the server push down data that you need into a database. The server also keeps the database in sync
2. The UI for each client reads from the db instead of a GQL query
3. If you need to perform an action (send a message / fetch more data), you insert a task into the database instead of issuing a GQL mutation. The task is then sent to the server on your behalf. Responses will be synced to the database, you do not wait for a response

- Sync procedure is called when page loads
- Whenever our realtime connections (MQTT/DGW) reconnect

https://excalidraw.com/#json=vIOFh1vzI6P0C0A0JLRAa,1ZikF0vdllVI0N1Lk8xjaQ

## Task System

https://excalidraw.com/#json=1Qx2r-OiI8FPeZAt0K3SI,Jze4BoiHv30_V0xJ01opvw

## Lightspeed

Lightspeed built it's own system for sending things to the server (task system). This is needed because the app needs to work while offline, and normal network requests (a.k.a await fetch(...)) don't have good support for this.

For example, if your app goes offline, we still want to guarantee that the message gets sent to the server.

As such, the tasks system was built, and currently supports the following features:

- Strict ordering
- Batching
- Cancellation
- Retries
- Exponential Backoff
- Resume from network failure

https://excalidraw.com/#json=ly0Y4wqWamic47Qfrk_CI,i14HM2cG2L1OjGNwB70vEA

https://excalidraw.com/#json=y9v4XCUNjVECq_PKwxUiC,7P9M4RsvWmLRKhiFqpzQMg

## Gradient effect

https://css-tricks.com/recreating-the-facebook-messenger-gradient-effect-with-css/

{/_ TODO: https://excalidraw.com/#json=5713648060203008,7R5UAo9i5pRTISOZviieLQ _/} {/_ TODO: https://excalidraw.com/#json=5128115764330496,7vBP9AmfOuwT1hLYz9B4Rw _/} {/_ TODO: https://excalidraw.com/#json=5172883747766272,wuH2YFQXXZCPfzuSJWhmEg _/}
