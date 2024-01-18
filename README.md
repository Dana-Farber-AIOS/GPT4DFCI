# GPT4DFCI 🤖

**Welcome to the GPT4DFCI code repository, a private and secure generative AI tool, based on GPT-4 and deployed at Dana-Farber Cancer Institute.**

This repository is organized in 4 sections:

- Training material for the users
- Manuscript & policy details accompaining this tool
- Front-end code - this is the application where the users place their queries and read the output
- Back-end code that handles all requests from the applicaiton and routes all requests to other components
- Infrastructure that was used to deploy this

# 🧑‍🎓 Training

Here you will find the [training material](./link) that accompanied this tool deployment.

# 📜 Manuscript & policy

Here is linked the [Manuscript & policy details](./link) regarding this tool adoption.

# 💻 GPT4DFCI Front-end Code

<img src="https://github.com/Dana-Farber-AIOS/GPT4DFCI/assets/25375373/3400b3cf-9faf-4fce-8c22-3dff0cb5313e"/>

## Stack

-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Package managment:** [Yarn](https://yarnpkg.com/)
-   **Build tool:** [Vite](https://vitejs.dev/)
-   **Frontend library:** [React](https://react.dev/)
-   **UI component library:** [Chakra UI](https://chakra-ui.com/)
-   **Icons:** [Lucide Icons](https://lucide.dev/)
-   **Linting and formatting:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
-   **Testing:** [Playwright](https://playwright.dev/)

## Development setup

To install dependencies:

```
yarn
```

To run dev server:

```
yarn dev
```

## Testing

To run tests:

```
yarn playwright test
```

## Type Checking

To run type checks:

```
yarn tsc
```

## Linting and Formatting

To run linter:

```
yarn lint
```

To run formatter:

```
yarn prettier --write .
```


# ⌨ GPT4DFCI Backend Code

<img src="https://github.com/Dana-Farber-AIOS/GPT4DFCI/assets/25375373/91ac623e-8f4d-4a3b-9d3f-e26230965c1d"/>

## Development setup

1. Install [Poetry](https://python-poetry.org/docs/)
2. Run `poetry install` in the project root
3. Run `poetry shell` to activate the virtual environment (also creates a sub-shell)
4. Run `uvnicorn main:app --reload` to start the local server
5. If the command was successful, http://127.0.0.1:8000/docs should show a Swagger/OpenAPI docs page

## Build notes
https://learn.microsoft.com/en-us/azure/developer/python/tutorial-containerize-simple-web-app-for-app-service?tabs=web-app-fastapi

* The `gunicorn.conf.py` file is from this tutorial.
* Startup command is `gunicorn main:app`

**How to export requirements.txt (if needed for build step)**
```
poetry export --without-hashes --format=requirements.txt > requirements.txt
```

# 🔌 Infrastructure as code

All hardware and services were deployed using [this IAC configuration](./infra.iac)
