from buffer import Buffer
from rich import text, panel, print, style
import argparse

parser = argparse.ArgumentParser(description="Your Text Buffer")

parser.add_argument("--save", nargs=1, type=str,
                    help="The text to be buffered")
parser.add_argument("--file", nargs=1,
                    help="The file containing the text to buffer")
parser.add_argument(
    "--list", action='store_false', help="List the entire buffer stored using the secret")
parser.add_argument(
    "--get", nargs=1, help="Get data from a specific buffer id")

args = parser.parse_args()

args = vars(args)
# {'save': None, 'file': None, 'list': 'yolo', 'get': None}
buffer = Buffer("sj3c3")

if args.get("list") != None:
    buffers = buffer.load_buffer()
    for buffer in buffers:
        content = panel.Panel(
            text.Text(f"{buffer.get('buffer')}", justify="left"))
        print(content)

if args.get("save") != None:
    result = buffer.buffer(args.get("save"))
    content = panel.Panel(
        text.Text(f"{buffer.get('buffer')}", justify="left"))
    content_key = text.Text(
        f"{buffer.get('key')}", justify="left", style=style.Style(underline=True))
    print(content)
    print(content_key)
