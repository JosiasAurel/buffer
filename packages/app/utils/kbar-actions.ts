import { modalActions } from "../pages/app/index";

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
  {
    id: "open-app",
    name: "Open App",
    shortcut: ["a"],
    keywords: "app",
    perform: () => window.location.replace("/app"),
  },
  {
    id: "settings",
    name: "Settings",
    shortcut: ["s"],
    keywords: "settings",
    perform: () => modalActions.settingsModalVisible(true),
  },
];

export { actions };
