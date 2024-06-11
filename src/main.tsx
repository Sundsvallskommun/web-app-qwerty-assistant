import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

export const initializeReactApp = (rootElement) => {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App
        user={rootElement.getAttribute("user")}
        hash={rootElement.getAttribute("hash")}
        assistantId={
          rootElement.getAttribute("assistant") ||
          import.meta.env.VITE_DEFAULT_ASSISTANT_ID
        }
        fontBase={rootElement.getAttribute("fontbase")}
        topSpace={rootElement.getAttribute("top")}
        bottomSpace={rootElement.getAttribute("bottom")}
        leftSpace={rootElement.getAttribute("left")}
        rightSpace={rootElement.getAttribute("right")}
        questionsTitle={rootElement.getAttribute("questions-title")}
        questions={
          rootElement.getAttribute("questions")
            ? rootElement
                .getAttribute("questions")
                .replace(/\[|\]|'|"/gm, "")
                .split(",")
            : undefined
        }
      />
    </React.StrictMode>
  );
};

class CustomAppComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = this.parentElement.querySelector(
      "#apptemplate"
    ) as HTMLTemplateElement;
    if (template) {
      const templateContent = template.content;
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(templateContent.cloneNode(true));
      const tagElement = document.getElementsByTagName("qwerty")[0];
      if (tagElement) {
        tagElement.setAttribute("id", "qwertyroot");
      }
      const rootElement = document.getElementById("qwertyroot");
      if (rootElement) {
        initializeReactApp(rootElement);
      } else {
        console.error("Root element for React app not found.");
      }
    } else {
      console.error("Template not found in parent element.");
    }
  }
}
customElements.define("qwerty-app", CustomAppComponent);
const container = document.querySelector("#qwertywrapper");
if (container) {
  container.appendChild(document.createElement("qwerty-app"));
}

const tagElement = document.getElementsByTagName("qwerty")[0];
if (tagElement && !tagElement.getAttribute("id")) {
  tagElement.setAttribute("id", "qwertyroot");
}
const topLevel = document.getElementById("qwertyroot") as HTMLElement;
if (topLevel) {
  initializeReactApp(topLevel);
}
