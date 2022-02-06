# Buffered.link CLI

You can find the client app [here](https://buffered.link/)

## Guide

Here is how to make use of this CLI

First thing to do is to set your environment variables so it will store the secret key to access your buffer.

You secret key could be something like `sj3c3` or any alphanumeric piece of text.

The CLI reads the value of the environment variable named `BFL_SECRET`. It's value is the secret key to your buffer.

Depending on your operating system, you will have different ways to set that up.
You will find many tutorials teaching about how to set environment variables on Windows, Linux or Mac depending on the operating sytem your machine is running.

## Usage

> This step assumes you have setup your secret currectly in your environment variables.

- To create a new buffer, use the `--save` flag with the cli like below;

  ```shell
  bf --save myName
  ```

  The CLI will store `myName` in your buffer as is.
  Llonger pieces of text, should be wrapped in quotes

  ```shell
  bf --save "A really really long piece of text"
  ```

- Get a specific buffer
  When you save a buffer, you get the ID of that buffer.
  Make use of that ID to get the value of a saved buffer.

  > Note : You cannot use this command to retrieve buffered files

  ```shell
  bf --get ID
  ```

- List all the content of your buffer
  Use the `--list` flag to list the contents of your buffer

  ```shell
  bf --list
  ```

- To buffer a file, use the `--file` flag
  This command takes the full path to the file you want to be buffered as well as the name with which you want the file to be saved in your buffer.
  This name is required and will be helpful on the web client to recongnize your saved file.
  You will get the ID of the buffered file once it is successfull.

  > Note : The max size of a file you can buffer is 2mb

  ```shell
  bf --file hello.txt name
  ```

- Download a buffered file with the `--get-file` flag
  ```shell
  bf --get-file ID
  ```
  This will write the buffered file in the current directory.
