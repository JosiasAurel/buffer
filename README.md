# buffer

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJosiasAurel%2Fbuffer.git&env=NEXT_PUBLIC_DETA_PROJECT_KEY&project-name=buffered)

A tool to share text between connected devices via PoO

## Setting Up

Clone this repository

```shell
https://github.com/JosiasAurel/buffer.git
```

Navigate to the directory

```shell
cd buffer
```

Install dependecies

```shell
yarn install
```

Create a new project on [Deta][https://deta.sh] and create a `.env` file.
Make sure to add the following in your `.env` file

```env
NEXT_PUBLIC_DETA_PROJECT_KEY=<DETA_PROJECT_KEY>
```

Start the development server with `yarn dev`

## Deployment

To deploy it, if you have vercel installed, in your project directory run `vercel --prod`.
Set up the environment variable in your Vercel project settings.

You could also deploy straight from here
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJosiasAurel%2Fbuffer.git&env=NEXT_PUBLIC_DETA_PROJECT_KEY&project-name=buffered)
