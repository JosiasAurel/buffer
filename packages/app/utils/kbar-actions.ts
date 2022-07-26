

const actions = [
  {
    id: "create-buffer",
    name: "Create Buffer",
    shortcut: ["c"],
    keywords: "buffer create new",
    perform: () => alert("Creating a Buffer..."),
  },
  {
    id: "about",
    name: "About",
    shortcut: ["a"],
    keywords: "about who maker builder",
    perform: () => alert("Made by Josias"),
  },
];

export {
    actions
};