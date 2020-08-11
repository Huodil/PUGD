/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");

let menus = {};
const modules = fs
  .readdirSync(path.dirname(__filename) + "/../pages/admin", {
    withFileTypes: true,
  })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

for (let index = 0; index < modules.length; index++) {
  const element = modules[index];
  try {
    const menu = require(`../pages/admin/${element}/menu.json`);
    menus[element] = { ...menu };
  } catch (e) {
    console.error(`menu.json not found in ${element}`);
  }
}

fs.writeFileSync(
  path.dirname(__filename) + "/../static_api/menu.json",
  JSON.stringify(menus)
);
