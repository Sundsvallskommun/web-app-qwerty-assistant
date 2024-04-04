AI assistant for Sundsvalls kommun. Built using React + TypeScript + Vite.

This application will place the assistant in the lower right corner of the window, in a typical chatbot fashion.

* Installation

Run `yarn install`

* For development

Decide on an application name, for example MY_ASSISTANT, and create an env file named .env.MY_ASSISTANT.local base on the .env.example file.

Create an index.html based on the index.html.example template.

To start the development server, run `yarn dev --mode=MY_ASSISTANT` so that the corresponding env file is used.

* Deployment

To build for production, run `yarn build --mode==MY_ASSISTANT` in order to build using the corresponding config.

* Including app in a page

The app is prepared to run inside the shadow dom of a web component. Use these tags to include in page:

```
<script type="module" crossorigin="" src="SCRIPTFILE.js"></script>
<div id="qwertywrapper">
   <template id="apptemplate">
      <div id="qwertyroot" data-user="" data-hash="" data-assistant="">
      </div>
      <link rel="stylesheet" crossorigin="" href="CSSFILE.css">
   </template>
</div>
```

with correct filenames and data parameters.