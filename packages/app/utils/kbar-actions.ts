import { modalActions } from "../pages/index";

const actions = [
  {
    id: "create-buffer",
    name: "Create Buffer",
    shortcut: ["c"],
    keywords: "buffer create new",
    perform: () => modalActions.createModalVisible(true),
  },
  {
    id: "github",
    name: "GitHub",
    shortcut: ["gh"],
    keywords: "Source Code",
    perform: () =>
      window.location.replace("https://github.com/JosiasAurel/buffer"),
  },
  {
    id: "home",
    name: "Home",
    shortcut: ["h"],
    keywords: "home",
    perform: () => window.location.replace("/"),
  },
];

export { actions };
