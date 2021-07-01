FROM node:14.16.1-buster as frontend-build
WORKDIR /app

COPY frontend/ .
RUN npm install && npm run build

#============================================

FROM node:14.16.1-buster
WORKDIR /app

COPY backend/ .
RUN npm install
COPY --from=frontend-build /app/build/ public/
RUN ls -al ./public/

CMD [ "node", "src/index.mjs" ]