# Instagram Automatic Liker
## With In-built dashboard

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 	![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) 	![Instagram](https://img.shields.io/badge/INSTAGRAM-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white)


Instagram Automatic Liker is a Node.js based command-line tool,
It helps to automate Instagram by liking all the latest posts in timeline 🔥❤️️

Dissociated fork from [muhemmedirfanc/like-automation-ig](https://github.com/muhemmedirfanc/like-automation-ig)

## Features

- Token storing, simulating device  📱
- Dashboard with advanced control 📊
- API access ⚙️
- Lightweight, Database less architecture 🪶

## Tech

Instagram Automatic Liker uses a number of open source projects to work properly:
- [Node.Js] - Core framework! 💯
- [Instagram Private API] - to communicate with  ❤️ 
- [Typescript] - For static typing ✋
- [Express] - for dashboard ⌨️
- [PubSub] - to communicate between services (interprocess) 📣
- [nconf] - in memory key value store 🏪

## Installation

Instagram Automatic Liker requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```
git clone https://github.com/mohdmusthafa/like-automation-ig.git
npm install
npm run build
npm start
```

## Development

Want to contribute? Great!

Instagram Automatic Liker uses Browserify + Uglify for dashboard.
Make a change in your file and refresh to see your updates!

Open your favorite Terminal and run these commands.

First Tab:

```sh
npm run dev
```

Second Tab:

```sh
npm run dev:dashboard
```

(optional) Third:

```sh
karma test
```

#### Building for source

For production release:

```sh
npm run build
```

## Docker

Instagram is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 3000, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
docker build -t <youruser>/insta-auto-liker:${package.json.version} .
```

This will create the instagram automatic liker image and pull in the necessary dependencies.
Be sure to swap out `${package.json.version}` with the actual
version of Instagram Automatic Liker.

Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 80 of the host to
port 3000 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 80:3000 --restart=always --env-file <path_to_env_file> --name=insta_liker <youruser>/insta-auto-liker:${package.json.version}
```

> Note: `--env-file=<path_to_env_file>` is required for application configuration.

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:80
```

[//]: # ()

   [node.js]: <http://nodejs.org>
   [Instagram Private API]: <https://github.com/dilame/instagram-private-api>
   [TypeScript]: <https://www.typescriptlang.org/>
   [PubSub]: <https://github.com/mroderick/PubSubJS>
   [express]: <http://expressjs.com>
   [nconf]: <https://github.com/indexzero/nconf>
