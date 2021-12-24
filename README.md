# buffer

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
