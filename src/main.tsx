import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppWrapper } from "./context/app.context";
import "./index.css";

export const initializeReactApp = (rootElement) => {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AppWrapper>
        <App
          user={rootElement.getAttribute("data-user")}
          hash={rootElement.getAttribute("data-hash")}
          assistantId={
            rootElement.getAttribute("data-assistant") ||
            import.meta.env.VITE_DEFAULT_ASSISTANT_ID
          }
        />
      </AppWrapper>
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

      const rootElement = shadowRoot.querySelector("#qwertyroot");
      if (rootElement) {
        initializeReactApp(rootElement);
        const fonts = document.createElement("link");
        fonts.type = "text/css";
        fonts.rel = "stylesheet";
        fonts.href =
          "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
        document.head.appendChild(fonts);
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

const topLevel = document.querySelector("#qwertyroot") as HTMLElement;
if (topLevel) {
  initializeReactApp(topLevel);
}
