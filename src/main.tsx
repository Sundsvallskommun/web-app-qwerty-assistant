import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import css from "./index.css?inline";
import "./index.css";

export const initializeReactApp = (appElement, rootElement) => {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App
        user={appElement.getAttribute("user")}
        hash={appElement.getAttribute("hash")}
        assistantId={
          appElement.getAttribute("assistant") ||
          import.meta.env.VITE_DEFAULT_ASSISTANT_ID
        }
        fontBase={appElement.getAttribute("fontbase")}
        topSpace={appElement.getAttribute("top")}
        bottomSpace={appElement.getAttribute("bottom")}
        leftSpace={appElement.getAttribute("left")}
        rightSpace={appElement.getAttribute("right")}
        questionsTitle={appElement.getAttribute("questions-title")}
        questions={
          appElement.getAttribute("questions")
            ? appElement
                .getAttribute("questions")
                .replace(/\[|\]|'|"/gm, "")
                .split(",")
            : undefined
        }
      />
    </React.StrictMode>
  );

  // const rootElement = document
  //   .getElementById("qwertyroot")
  //   .attachShadow({ mode: "open" });

  // ReactDOM.createPortal(
  //   <App
  //     user={appElement.getAttribute("user")}
  //     hash={appElement.getAttribute("hash")}
  //     assistantId={
  //       appElement.getAttribute("assistant") ||
  //       import.meta.env.VITE_DEFAULT_ASSISTANT_ID
  //     }
  //     fontBase={appElement.getAttribute("fontbase")}
  //     topSpace={appElement.getAttribute("top")}
  //     bottomSpace={appElement.getAttribute("bottom")}
  //     leftSpace={appElement.getAttribute("left")}
  //     rightSpace={appElement.getAttribute("right")}
  //     questionsTitle={appElement.getAttribute("questions-title")}
  //     questions={
  //       appElement.getAttribute("questions")
  //         ? appElement
  //             .getAttribute("questions")
  //             .replace(/\[|\]|'|"/gm, "")
  //             .split(",")
  //         : undefined
  //     }
  //   />,
  //   rootElement
  // );

  // ReactDOM.createPortal(
  //   <App
  //     user={rootElement.getAttribute("user")}
  //     hash={rootElement.getAttribute("hash")}
  //     assistantId={
  //       rootElement.getAttribute("assistant") ||
  //       import.meta.env.VITE_DEFAULT_ASSISTANT_ID
  //     }
  //     fontBase={rootElement.getAttribute("fontbase")}
  //     topSpace={rootElement.getAttribute("top")}
  //     bottomSpace={rootElement.getAttribute("bottom")}
  //     leftSpace={rootElement.getAttribute("left")}
  //     rightSpace={rootElement.getAttribute("right")}
  //     questionsTitle={rootElement.getAttribute("questions-title")}
  //     questions={
  //       rootElement.getAttribute("questions")
  //         ? rootElement
  //             .getAttribute("questions")
  //             .replace(/\[|\]|'|"/gm, "")
  //             .split(",")
  //         : undefined
  //     }
  //   />,
  //   rootElement
  // );
};

// class CustomAppComponent extends HTMLElement {
//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     const template = this.parentElement.querySelector(
//       "#apptemplate"
//     ) as HTMLTemplateElement;
//     if (template) {
//       const templateContent = template.content;
//       const shadowRoot = this.attachShadow({ mode: "open" });
//       shadowRoot.appendChild(templateContent.cloneNode(true));
//       const tagElement = document.getElementsByTagName("qwerty")[0];
//       if (tagElement) {
//         tagElement.setAttribute("id", "qwertyroot");
//       }
//       const rootElement = document.getElementById("qwertyroot");
//       if (rootElement) {
//         rootElement.className = "qwertyshadow";
//         initializeReactApp(rootElement);
//       } else {
//         console.error("Root element for React app not found.");
//       }
//     } else {
//       console.error("Template not found in parent element.");
//     }
//   }
// }

// customElements.define("qwerty-app", CustomAppComponent);

// const container = document.querySelector("#qwertywrapper");

// if (container) {
//   container.appendChild(document.createElement("qwerty-app"));
// }

// const appElement = document.getElementsByTagName("qwerty")[0];

// Array.from(appElements).forEach((element) => initializeReactApp(element));
// if (appElement) {
//   const shadowElement = document.createElement("div");
//   const rootElement = document.createElement("div");
//   rootElement.setAttribute("id", "qwertyroot");
//   rootElement.className = "qwertyshadow";
//   shadowElement.appendChild(rootElement);

//   document.getElementsByTagName("body")[0].appendChild(shadowElement);

//   shadowElement.attachShadow({ mode: "open" });
//   initializeReactApp(appElement, rootElement);
// }

class CustomAppComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const appElement = this.parentElement as HTMLTemplateElement;
    if (appElement) {
      // const templateContent = template.content;
      const shadowRoot = this.attachShadow({ mode: "open" });
      // create variable to attach the tailwind stylesheet
      const style = document.createElement("style");

      // attach the stylesheet as text
      style.textContent = css;

      // apply the style
      shadowRoot.appendChild(style);

      const rootElement = document.createElement("div");
      rootElement.setAttribute("id", "qwertyroot");
      shadowRoot.appendChild(rootElement);

      // const rootElement = shadowRoot.querySelector("#qwertyroot");
      if (rootElement) {
        initializeReactApp(appElement, rootElement);
      } else {
        console.error("Root element for React app not found.");
      }
    } else {
      console.error("Template not found in parent element.");
    }
  }
}
const container = document.getElementsByTagName("qwerty")[0];

if (container) {
  if (container.getAttribute("shadow") === "false") {
    container.setAttribute("class", "qwertyroot");
    container.setAttribute("id", "qwertyroot");

    initializeReactApp(container, container);
  } else {
    customElements.define("qwerty-shadow", CustomAppComponent);
    container.appendChild(document.createElement("qwerty-shadow"));
  }
}
