from buffer import Buffer
from rich import text, panel, print, style
import argparse

parser = argparse.ArgumentParser(description="Your Text Buffer")

parser.add_argument("--save", nargs=1, type=str,
                    help="The text to be buffered")
parser.add_argument("--file", nargs=1,
                    help="The file containing the text to buffer")
parser.add_argument(
    "--list", action='store_const', const=True, help="List the entire buffer stored using the secret")
parser.add_argument(
    "--get", nargs=1, help="Get data from a specific buffer id")

args = parser.parse_args()

args = vars(args)
# struct
# {'save': None, 'file': None, 'list': 'yolo', 'get': None}
buffer = Buffer("sj3c3")

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
    result = buffer.buffer(args.get("save"))
    # print(result)
    content = panel.Panel(
        text.Text(f"{result[1].get('buffer')} \n \nkey : {result[1].get('key')}", justify="left"))
    print(content)

if args.get("get"):
    result = buffer.getBuffer(args.get("get"))
    print(result)
    content = panel.Panel(
        text.Text(f"{result.get('buffer')} \n \nkey : {result.get('key')}", justify="left"))
    print(content)
