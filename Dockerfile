FROM node:18

WORKDIR /usr/src/app
ENV PORT 8000
ENV HOST 0.0.0.0
ENV MODEL_URL=https://storage.googleapis.com/batiklens-development-models/model.json

COPY . .
RUN npm install
EXPOSE 8000
CMD [ "npm", "run", "start"]
