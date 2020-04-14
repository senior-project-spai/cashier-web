### STAGE 1: Build ###
FROM node:10.13.0 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN yarn install --silent
RUN yarn global add react-scripts --silent
COPY . /usr/src/app
RUN yarn run build

### STAGE 2: Production Environment ###
FROM nginx:1.13.12-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]