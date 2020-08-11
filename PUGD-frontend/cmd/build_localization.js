/* eslint-disable no-undef */

const fs = require("fs");
const path = require("path");

const locals = {}
// Get a list of languages from the localization files in a directory
const getLanguages = (dir) => {
  return fs
    .readdirSync(dir, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isFile())
    .map((dirent) => {
      return dirent.name.split(/[\[\]]+|.json/).filter(item => item)[0]
    })
}
// Get a list of modules from the /pages/admin directory
const modules = fs
  .readdirSync(path.dirname(__filename) + "/../pages/admin", {
    withFileTypes: true,
  })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);


modules.forEach(module => {
  try {
    const languages = getLanguages(path.dirname(__filename) + `/../pages/admin/${module}/_locales`)
    languages.forEach((language) => {
      const lang = require(`../pages/admin/${module}/_locales/[${language}].json`);
      if (!locals[language])
        locals[language] = {}
      locals[language] = { ...locals[language], ...lang }
      // locals[language][language] = lang
    })

  } catch (e) {
    console.error(`_locales not found in `, path.dirname(__filename) + `../pages/admin/${module}/_locales`);

  }
});
Object.keys(locals).forEach(lang => {
  fs.writeFileSync(
    path.dirname(__filename) + `/../static_api/${lang}.json`,
    JSON.stringify(locals[lang])
  );
});
