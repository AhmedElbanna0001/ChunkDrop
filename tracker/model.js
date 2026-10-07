import { nanoid } from "nanoid";

export class Peers {
  #peers = [];

  get peers() {
    return this.#peers;
  }

  registerPeer(peerUsername, peerAddress) {
    const duplicate = this.#peers.find((peer) => {
      return peer.username === peerUsername || peer.address === peerAddress;
    });

    if (duplicate)
      throw new Error("A peer with the same username or address exists");

    this.#peers.push(new Peer(username, address));
  }
}

export class Files {
  #files = [];

  get files() {
    return this.#files;
  }

  registerFile(file) {
    const duplicate = this.#files.filter((f) => {
      return f.name === file.name || f.id === f.id;
    });
    if (duplicate) throw new Error("This file already exists");
    this.#files.push(file);
  }
}
export class File {
  #id = nanoid();
  #name;
  #size;
  #description;
  #peers = [];
  #chunks = [];
  constructor(name, size, description) {
    this.#name = name;
    this.#size = size;
    this.#description = description;
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }

  get size() {
    return this.#size;
  }

  get description() {
    return this.#description;
  }

  get peers() {
    return this.#peers;
  }

  get chunks() {
    return this.#chunks;
  }

  addPeer(peerId) {
    const duplicate = this.#peers.find((peer) => {
      return peer.id === peerId;
    });

    if (duplicate) throw new Error("You are already seeding this file.");

    this.#peers.push(peerId);
  }

  addChunk(chunkId, chunkSize, chunkHash) {
    const duplicate = this.#chunks.find((chunk) => {
      return chunk.id === chunkId || chunk.hash === chunkHash;
    });

    if (duplicate) throw new Error("Duplicate chunk.");

    this.#chunks.push(new Chunk(chunkSize, chunkHash));
  }
}

class Peer {
  #id = nanoid();
  #username;
  #address;

  constructor(peerUsername, peerAddress) {
    this.#username = peerUsername;
    this.#address = peerAddress;
  }

  get id() {
    return this.#id;
  }

  get username() {
    return this.#username;
  }

  get address() {
    return this.#address;
  }
}

class Chunk {
  #id = nanoid();
  #size;
  #hash;
  constructor(chunkSize, chunkHash) {
    this.#size = chunkSize;
    this.#hash = chunkHash;
  }

  get size() {
    return this.#size;
  }

  get hash() {
    return this.#hash;
  }
}
