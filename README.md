# OpenPlugDJ

[![npm version](https://img.shields.io/npm/v/openplugdj.svg)](https://www.npmjs.com/package/openplugdj)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, event-driven DJ queue and room engine inspired by plug.dj. Build collaborative music listening experiences with real-time queue management, voting, and multiple room support.

## Features

- 🎵 **Queue Management** - Add, remove, and reorder tracks in a DJ queue
- 🏠 **Multi-Room Support** - Create and manage multiple music rooms
- 👥 **User Management** - Handle users with different roles (listener, DJ, admin)
- 🗳️ **Voting System** - Built-in upvote/downvote functionality for tracks
- 📦 **Flexible Storage** - Memory or Redis-backed storage adapters
- 🔌 **Event-Driven** - React to track changes, votes, and queue updates
- 🎯 **TypeScript First** - Full type safety and IntelliSense support
- 🪶 **Lightweight** - Minimal dependencies, maximum performance

## Installation

```bash
npm install openplugdj
```

For Redis support:
```bash
npm install openplugdj ioredis
```

## Quick Start

```typescript
import { DJ, Room, Track, DJEntry } from "openplugdj";

// Create a custom stream service (implement your audio logic)
const streamService = {
  async play(track: Track) {
    console.log(`Playing: ${track.title}`);
    // Your audio streaming logic here
    await new Promise(resolve => setTimeout(resolve, track.duration));
  },
  async stop() {
    console.log("Stopped playback");
  }
};

// Initialize the DJ engine
const dj = new DJ(streamService);

// Create a room
const room = dj.createRoom("room-1");

// Add a user
room.addUser({
  id: "user-1",
  username: "DJ Cool",
  role: "dj",
  joinedAt: Date.now()
});

// Add a track to the queue
const entry: DJEntry = {
  id: "entry-1",
  track: {
    id: "track-1",
    title: "Awesome Song",
    url: "https://example.com/song.mp3",
    duration: 180000, // 3 minutes in milliseconds
    addedBy: "user-1",
    createdAt: Date.now()
  },
  userId: "user-1",
  position: 0,
  createdAt: Date.now()
};

room.addEntry(entry);

// Listen to events
room.on("trackStart", (track) => {
  console.log(`Now playing: ${track.title}`);
});

room.on("trackEnd", (track) => {
  console.log(`Finished: ${track.title}`);
});

room.on("voteUpdated", (votes) => {
  console.log(`Votes: ${votes.up} up, ${votes.down} down`);
});

// Start playback
room.start();
```

## Core Concepts

### DJ

The main engine that manages multiple rooms.

```typescript
import { DJ } from "openplugdj";

const dj = new DJ(streamService);

// Create rooms
const room1 = dj.createRoom("rock-room");
const room2 = dj.createRoom("jazz-room");

// Get a room
const room = dj.getRoom("rock-room");

// Delete a room
dj.deleteRoom("rock-room");

// Listen to room events
dj.on("roomCreated", (room) => {
  console.log(`Room created: ${room.id}`);
});
```

### Room

A room contains a queue, player, and manages users.

```typescript
// Add users
room.addUser(user);
room.removeUser(userId);

// Access the queue
room.queue.add(entry);
room.queue.remove(entryId);
room.queue.reorder(0, 2); // Move from index 0 to index 2
const allEntries = room.queue.getAll();

// Player controls
room.player.skip(); // Skip current track
room.player.vote(userId, "up"); // Vote on current track
const current = room.player.getCurrent();

// Events
room.on("userJoined", (user) => {});
room.on("userLeft", (user) => {});
room.on("queueUpdated", (entries) => {});
room.on("trackStart", (track) => {});
room.on("trackEnd", (track) => {});
room.on("voteUpdated", (results) => {});
room.on("queueEmpty", () => {});
```

### StreamService

Implement this interface to connect your audio streaming logic:

```typescript
import { StreamService, Track } from "openplugdj";

class MyStreamService implements StreamService {
  async play(track: Track): Promise<void> {
    // Start streaming the track
    // Wait for track.duration milliseconds or until stop() is called
  }

  async stop(): Promise<void> {
    // Stop current playback
  }
}
```

### Storage Adapters

Choose between in-memory or Redis storage:

```typescript
import { MemoryStore, RedisStore } from "openplugdj";

// In-memory (default)
const memoryStore = new MemoryStore<Room>();

// Redis
const redisStore = new RedisStore<Room>(
  "redis://localhost:6379",
  "rooms" // namespace
);

// Use with custom storage
await redisStore.set("room-1", room);
const room = await redisStore.get("room-1");
```

## API Reference

### Types

#### Track
```typescript
interface Track {
  id: string;
  title: string;
  url: string;
  duration: number; // milliseconds
  addedBy: string;
  createdAt: number;
}
```

#### User
```typescript
type UserRole = "listener" | "dj" | "admin";

interface User {
  id: string;
  username: string;
  role: UserRole;
  joinedAt: number;
}
```

#### DJEntry
```typescript
interface DJEntry {
  id: string;
  track: Track;
  userId: string;
  position: number;
  createdAt: number;
}
```

## Advanced Usage

### Using Redis for Persistence

```typescript
import { DJ, RedisStore, Room } from "openplugdj";

const dj = new DJ(streamService);
const roomStore = new RedisStore<Room>("redis://localhost:6379", "rooms");

// Your rooms persist across restarts
const room = dj.createRoom("persistent-room");
await roomStore.set(room.id, room);
```

### Vote Management

```typescript
// Users can vote on the current track
room.player.vote("user-1", "up");
room.player.vote("user-2", "down");

room.on("voteUpdated", (results) => {
  console.log(`Score: ${results.up - results.down}`);
  
  // Auto-skip if too many downvotes
  if (results.down > 5) {
    room.player.skip();
  }
});
```

### Queue Management

```typescript
// Add multiple tracks
const entries = [entry1, entry2, entry3];
entries.forEach(entry => room.queue.add(entry));

// Reorder queue (drag and drop)
room.queue.reorder(0, 2);

// Remove a track
room.queue.remove(entryId);

// Clear entire queue
room.queue.clear();

// Get queue info
console.log(`Queue size: ${room.queue.size()}`);
```

## Examples

Check out these example implementations:

- **Simple Bot** - Basic DJ bot with preset playlist
- **Web Server** - Express + Socket.IO integration
- **Discord Bot** - Voice channel music bot
- **REST API** - Full-featured API backend

See the `/examples` directory in the repository.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [bulondra](https://github.com/bulondra)

## Links

- [GitHub Repository](https://github.com/bulondra/openplugdj)
- [Issue Tracker](https://github.com/bulondra/openplugdj/issues)
- [npm Package](https://www.npmjs.com/package/openplugdj)

## Support

If you find this project helpful, please consider giving it a ⭐ on GitHub!
