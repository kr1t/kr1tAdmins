const modules = import.meta.globEager("./*.ts")
const middlewares = {}
for (let key in modules) {
  let name = key.replace(/(^.\/)|(\.ts$)/g, "")
  if (name.charAt(0) != "_") middlewares[name] = modules[key].default
}

export default middlewares
