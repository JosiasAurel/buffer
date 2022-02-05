import requests
from hashlib import sha256
import datetime
import json
import os


class Buffer:
    def __init__(self, secret: str):
        self.secret = secret
        self.hashedSecret = sha256(secret.encode(
            "utf-8")).hexdigest()
        self.root_uri = "https://beta.buffered.link"
        self.save_url = f"{self.root_uri}/api/save"
        self.buffers_url = f"{self.root_uri}/api/buffers"
        self.get_buffer = f"{self.root_uri}/api/get"
        return

    def buffer(self, text: str):
        # construct request payload
        payload = {
            "buffer": text,
            "key": self.hashedSecret,
            "date": datetime.datetime.utcnow()
        }
        # send request
        response = requests.post(self.save_url, payload).content.decode()
        response = json.loads(response)
        if response["status"] == "Success":
            return True, response
        return False,

    def load_buffer(self):
        # load buffers payload
        payload = {
            "key": self.hashedSecret
        }
        # make req
        response = requests.post(self.buffers_url, payload).content.decode()
        response = json.loads(response)
        # print(response)
        try:
            return response.get("fetchedBuffers")
        except:
            return False

    def getBuffer(self, bufferKey: str):
        payload = {
            "bufferKey": bufferKey
        }

        response = requests.post(self.get_buffer, payload).content.decode()
        response = json.loads(response)

        return response

    def buffer_file(self, filepath: str):
        file_size = os.path.getsize(filepath) / 10**6

        if file_size <= 1:
            with open(filepath, "rb") as file:
                content = file.read()

            payload = {
                "file": {
                    "type": filepath.split(".")[-1],  # file extension
                    "content": content,
                    "size": file_size
                }
            }

            response = requests.post(self.save_url, payload).content.decode()
            response = json.loads(response)
            if response["status"] == "Success":
                return True, response.get("key")
            return False,
        else:
            print("File too large. Max size is 1.5mb")
            print(
                "Consider using a service like https://transfer.sh for uploading large files")
            return
