import { nanoid } from "nanoid";

export class Peers {
  #peers = [];

  get peers() {
    return this.#peers;
  }

  registerPeer(username, address) {
    const duplicate = this.#peers.find((peer) => {
      return peer.username === username || peer.address === address;
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

  addPeer(id) {
    const duplicate = this.#peers.find((peer) => {
      return peer.id === id;
    });

    if (duplicate) throw new Error("You are already seeding this file.");

    this.#peers.push(id);
  }

  addChunk(size, hash) {
    const duplicate = this.#chunks.find((chunk) => {
      return chunk.hash === hash;
    });

    if (duplicate) throw new Error("Duplicate chunk.");

    this.#chunks.push(new Chunk(size, hash));
  }
}

class Peer {
  #id = nanoid();
  #username;
  #address;

  constructor(username, address) {
    this.#username = username;
    this.#address = address;
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
  constructor(size, hash) {
    this.#size = size;
    this.#hash = hash;
  }

  get size() {
    return this.#size;
  }

  get hash() {
    return this.#hash;
  }
}
