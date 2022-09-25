FROM python:3.7

WORKDIR /usr/src/app
COPY . .
RUN pip install -r requirements/prod.txt
EXPOSE 5000

ENTRYPOINT ["flask"]
CMD ["run", "--host", "0.0.0.0", "--port", "5000"]
