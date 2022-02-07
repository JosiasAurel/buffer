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

## Building the CLI from source

First make sure you have [pipenv](https://pypi.org/project/pipenv/) installed.
Navigate to the `cli` directory and run `pipenv shell`.

Once in the virtual environment, run `pipenv install` to install all the required dependencies.

To build the CLI, run `pyinstaller --onefile bfdl`
This command will build the CLI and output the binary in the `dist` directory.
You can then add the CLI to `PATH` environment variable and use it.
