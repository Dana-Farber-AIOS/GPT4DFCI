# DFCI-GPT4DFCI-Backend

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