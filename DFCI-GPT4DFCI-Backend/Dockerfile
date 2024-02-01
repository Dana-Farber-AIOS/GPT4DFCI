# syntax=docker/dockerfile:1

FROM python:3.10

WORKDIR /code

COPY pyproject.toml poetry.lock .

RUN pip install "poetry==1.6.1"
RUN poetry --version
RUN poetry export --without-hashes --format=requirements.txt > requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

EXPOSE 3100

CMD ["gunicorn", "app.main:app"]
