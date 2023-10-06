#funcionando
FROM node:lts
ENV NODE_ENV=production
RUN apt-get update && apt-get install -y vim

RUN mkdir /usr/src/local
ENV PATH=/usr/src/local/bin:$PATH
ENV NPM_CONFIG_PREFIX=/usr/src/local
WORKDIR /usr/src/local
COPY . .
RUN npm ci
RUN npm install --dev && npm cache clean --force
RUN npm i ngx-cookie-service -g
RUN npm run build --prod
COPY . .
RUN chown -R node /usr/src/local
EXPOSE 4200
USER node
CMD ["npm", "start"]

