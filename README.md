# React + TypeScript Tutorial Project

This repository contains a series of tutorials for learning React with TypeScript. Each tutorial covers a specific topic, starting from basic concepts to advanced ones like `Redux Toolkit`.

### Tutorials

1. [Return Basics](./src/tutorials/01-return): Introduction to returning JSX in React components.
2. [Props](./src/tutorials/02-props): Explanation of props and how to pass data between components.
3. [State](./src/tutorials/03-state): Introduction to using state in React and managing component data.
4. [Events](./src/tutorials/04-events): Handling events in React, such as clicks, form submissions, etc.
5. [Context](./src/tutorials/05-context): Using the React Context API for managing global state.
6. [Fetch](./src/tutorials/06-fetch): Fetching data from APIs and handling asynchronous actions in React.
7. [Redux Toolkit](./src/tutorials/07-redux-toolkit): Managing state with Redux Toolkit, a powerful state management tool.

### Project Structure

```plaintext
public/
src/
├── assets/
└── tutorials/
    ├── 01-return/
    ├── 02-props/
    ├── 03-state/
    ├── 04-events/
    ├── 05-context/
    ├── 06-fetch/
    └── 07-redux-toolkit/
App.tsx
hooks.ts
index.css
main.tsx
store.ts
vite-env.d.ts
.gitignore
eslint.config.js
index.html
package-lock.json
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts

```

### Cloning the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>

```

Replace <repository-url> with the actual URL of this repository.

### Installing Dependencies

Navigate to the project folder and install the necessary dependencies:

```bash
cd <project-folder>
npm install

```

### Running the Project

Once the dependencies are installed, you can start the development server:

```bash
npm run dev

```

This will start the Vite development server. Open your browser and go to `http://localhost:3000` to view the app.
