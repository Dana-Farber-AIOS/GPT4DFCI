# GPT4DFCI 🤖

**Welcome to the code repository for GPT4DFCI, a private and secure generative AI tool, based on GPT-4 and deployed at Dana-Farber Cancer Institute.**

*ℹ️ Tool requirements, usage policy, and training material are overseen by the broader Dana-Farber Generative AI Governance Committee. The development of this tool is led by the Dana-Farber Informatics & Analytics Department.*

This repository is organized in the following sections:

- Manuscript & policy details accompaining this tool
- Training material for the users
- Front-end code - this is the application where the users place their queries and read the output
- Back-end code that handles all requests from the applicaiton and routes all requests to other components
- Infrastructure that was used to deploy this
- License
- Contact

# 📜 Manuscript & policy

👉 Here is linked the [Manuscript & policy details](./link) regarding this tool adoption.

# 🧑‍🎓 Training

👉 Here you will find the [training material](./link) that accompanied this tool deployment.

# 💻 GPT4DFCI Front-end Code

<img src="https://github.com/Dana-Farber-AIOS/GPT4DFCI/assets/25375373/3400b3cf-9faf-4fce-8c22-3dff0cb5313e"/>

👉 All code is in the [DFCI-GPT4DFCI](./DFCI-GPT4DFCI) folder.

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

👉 All code is in the [DFCI-GPT4DFCI-Backend](./DFCI-GPT4DFCI-Backend) folder.

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

# 🎫 License

The GNU GPL v2 version of GPT4DFCI is made available via Open Source licensing. The user is free to use, modify, and distribute under the terms of the GNU General Public License version 2.

Commercial license options are available also.

# 📧 Contact

Questions? Comments? Suggestions? Get in touch!

aios@dfci.harvard.edu
