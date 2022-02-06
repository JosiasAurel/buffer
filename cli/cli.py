from buffer import Buffer
from rich import text, panel, print, style
import argparse
import json

parser = argparse.ArgumentParser(description="Your Text Buffer")

parser.add_argument("--save", nargs=1, type=str,
                    help="Buffers a piece of text. Takes as argument the text to be buffered. Use quotes for long text.")
parser.add_argument("--file", nargs=2,
                    help="Used to buffer a small file. Takes as the full path to the file e.g ./hello.txt ")
parser.add_argument(
    "--list", action='store_const', const=True, help="List the entire buffer stored using the secret")
parser.add_argument(
    "--get", nargs=1, help="Get data from a specific buffer id")
parser.add_argument(
    "--get-file", nargs=1, help="Get a buffered file from a specific buffer id")

args = parser.parse_args()

args = vars(args)
# struct
# {'save': None, 'file': None, 'list': 'yolo', 'get': None}
buffer = Buffer()


if args.get("list"):
    print(args.get("list") is not None)
    buffers = buffer.load_buffer()
    if buffers.__len__() > 0:
        for buffer in buffers:
            content = panel.Panel(
                text.Text(f"{buffer.get('buffer')}", justify="left"))
            print(content)
    else:
        print("Empty Buffer")

if args.get("save"):
    result = buffer.buffer(args.get("save")[0])
    # print(result)
    if (result[0]):
        content = panel.Panel(
            text.Text(f"{result[1].get('buffer')} \n \nkey : {result[1].get('key')}", justify="left"))
        print(content)
    else:
        print("Failed to buffer")
        print("Please try again")

if args.get("get"):
    result = buffer.getBuffer(args.get("get"))
    print(result.get("buffer"))

if args.get("file"):
    # print(args.get("file"))
    filepath = args.get("file")[0]
    name = args.get("file")[1]
    result = buffer.buffer_file(filepath, name)
    content = panel.Panel(
        text.Text(f"File Key : {result[1]}", justify="left"))
    print(content)

if args.get("get_file"):
    buffer.get_file(args.get("get_file"))
