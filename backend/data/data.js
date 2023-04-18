const fs = require("node:fs/promises");

const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");

async function readData() {
  const data = await fs.readFile("listings.json", "utf8");

  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile("listings.json", JSON.stringify(data));
}

async function getAll() {
  const storedData = await readData();
  if (!storedData.listings) {
    throw new NotFoundError("Could not find any listingss.");
  }
  return storedData.listings;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.listings || storedData.listings.length === 0) {
    throw new NotFoundError("Could not find any listings.");
  }

  const event = storedData.listings.find((ev) => ev.id === id);
  if (!event) {
    throw new NotFoundError("Could not find listings for id " + id);
  }

  return event;
}

async function add(data) {
  const storedData = await readData();
  storedData.listings.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.listings || storedData.listings.length === 0) {
    throw new NotFoundError("Could not find any listings.");
  }

  const index = storedData.listings.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError("Could not find event for id " + id);
  }

  storedData.listings[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.listings.filter((ev) => ev.id !== id);
  await writeData({ listings: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
