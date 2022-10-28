# Plutus

Plutus is a personal accounting software to keep track of all your expenses.

> **_NOTE:_** Plutus is currently in development, there is no public available build.

## Description

> Plutus is a personal accounting software to keep track of all your expenses.

While the initial description of Plutus sounds like a dime-a-dozen kind of software, it is anything but.
It is designed as a p2p local-first progressive web app that gives some amazing superpowers:
zero-click install on all platforms, offline support, and sync multiple instances in real-time over Bluetooth/internet/LAN/USB. You can even edit your expenses on your phone while on vacation and sync right back up with the instance on your home device _without conflicts_.[^1]

[^1]: For the current set of features [see](features)

## Design

### Core tenants

In no particular order:

- All systems are distributed systems.
- [Parse, don't validate.](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)[^2]
- The cloud is just someone else's computer.
- Cache, cache, cache.
- If the user is confused then I'm wrong.

[^2]: "Parse, don't validate" by Alexis King, [see](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)

### Technical

#### Users

Users will be represented using public-key cryptography. [^3]

[^3]: Wikipedia entry on public-key cryptography, [see](https://en.wikipedia.org/wiki/Public-key_cryptography)

#### Database

This is where the magic happens.

Since our app is a distributed system we need a _distributed_ database. Users
expect that their entries into their phones will be merged with the changes on their laptops
even if they haven't been synced for days or even months.

To do so we need a database where the entries can be added in _any_ order and still
derive the same state. We will use conflict-free replicated data types (CRDT) [^4], specifically sets and last-write-wins where each entry is timestamped using a hybrid logical clock (HLC) [^5]. This will also allow us to only share the entries that we would like to share, allowing you to share your milk purchase with your mom but not your late-night trip to the store for condoms.

[^4]: A basic intro to the topic of CRDTs, [see](https://crdt.tech/)
[^5]: Post on "hybrid-logical-clocks" by Jared Forsyth, [see](https://jaredforsyth.com/posts/hybrid-logical-clocks/)

#### Sync

With a good database layer that performs all the heavy lifting all that is left
is the problem of syncing. Now, since we are building a PWA it gets a bit more complicated.
We do not have full access to the user's machine, but only the Web APIs, and have to make due. Luckily for us, there are multiple interesting APIs though some are still experimental.

- [Bluetooth](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
- [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [USB](https://developer.mozilla.org/en-US/docs/Web/API/WebUSB_API)
- [HID](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API)
- [File drag&drop](https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API) & [File picker](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)

There will be two modes of sync: real-time, and async.

#### Tagging

A lot of effort has been spent by people trying to do hierarchical categories: but they usually fail.
Whenever you encode something into a hierarchical structure you embed one way of thinking about the world. The problem however is that people often have different views of what makes a natural hierarchy, and it is not unusual for your own opinion on the matter to change over time.

This is why we will do away with categories and only use plain string tags. Then we can run a fancy clutering algorithm on top and dynamically organize the data as more is added.

---

## Features

Features listed with "(MVP)" are the goal for version 1.0 of Plutus.

- [ ] Installable PWA (MVP)
- [ ] Offline support (MVP)
- [ ] Dark/Light mode
- [ ] CRUD expenses (MVP)
- [ ] Store images
- [ ] Tags
  - [ ] Basic tagging based on strings (MVP)
  - [ ] Clustering to create categories
- [ ] Sync
  - [ ] USB
  - [ ] WebRTC (MVP)
  - [ ] Bluetooth
  - [ ] File (export/import)
- [ ] Track/sync expenses with other people
