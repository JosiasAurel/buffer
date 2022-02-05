import requests
from hashlib import sha256
import datetime
import json


class Buffer:
    def __init__(self, secret: str):
        self.secret = secret
        self.hashedSecret = sha256(secret.encode(
            "utf-8")).hexdigest()
        self.root_uri = "https://beta.buffered.link"
        self.save_url = f"{self.root_uri}/api/save"
        self.buffers_url = f"{self.root_uri}/api/buffers"
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

        response = requests.post(self.buffers_url, payload).content.decode()
        response = json.loads(response)

        return response
