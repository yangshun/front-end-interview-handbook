I'm authoring system design questions for front end engineers. The system design questions are mainly for client applications and focus on product, user interface, user experience and less about the back end and distributed systems.

Requirements exploration involves understanding the problem thoroughly and determine the scope by asking a number of clarifying questions.

Given the following applications and example questions within code blocks, generate a suitable set of clarifying questions candidates should be asking for <QUESTION>. The title of the question is before the "===".

```
News Feed
===

### What are the core features to be supported?

- Browse news feed containing posts by the user and their friends.
- Liking and reacting to feed posts.
- Creating and publishing new posts.

Commenting and sharing will be discussed further down below but is not included in the core scope.

### What kind of posts are supported?

Primarily text and image-based posts. If time permits we can discuss more types of posts.

### What pagination UX should be used for the feed?

Infinite scrolling, meaning more posts will be added when the user reaches the end of their feed.

### Will the application be used on mobile devices?

Not a priority, but a good mobile experience would be nice.
```

```
Chat Application
===

### What are the core functionalities needed?

- Sending a message to a user.
- Receiving messages from a user.
- See one's chat history with a user.

### Is the message receiving real-time?

Yes, users should receive messages in real-time, as fast as possible without having to refresh the page.

### What kind of message formats should be supported?

Let's support formats text which can contain emojis. We can discuss supporting images if there's time.

### Does the application need to work offline?

Yes, where possible. Outgoing messages should be stored and sent out when the application goes online and users should still be allowed to browse messages even if they are offline.

### Are there group conversations?

We can assume it's a 1:1 messaging service.
```

```
Travel booking (e.g. Airbnb)
===

### What are the core features to be supported?

- Search and browse accommodation listings.
- Viewing accommodation details such as price, location, photos, and amenities.
- Make reservation for accommodations.

### What does the user demographics look like?

International users of a wide age range: US, Asia, Europe, etc.

### What are the non-functional requirements?

Each page should load under 2 seconds. Interactions with page elements should respond quickly.

### What devices will the website be used on?

All possible devices: laptop, tablets, mobile, etc.

### Do users have to be signed in?

Anyone can search for listings and browse details but users need to be logged in to make a booking.
```
