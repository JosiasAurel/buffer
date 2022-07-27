package main

import (
	"net/http"
	"fmt"
	"os"
	"encoding/json"
	"encoding/hex"
	"crypto/sha256"
	"strings"
	"bytes"
	"io/ioutil"
)


func main() {

	argsLength := len(os.Args) - 1

	SERVER_URI := os.Getenv("BFL_SERVICE")
	KEYPAIR := strings.Split(os.Getenv("BFL_SECRET"), ",")

	SECRET := KEYPAIR[0]
	publicKey := KEYPAIR[1]

	// fmt.Printf("SECRET KEY : %s \n",SECRET)
	hasher := sha256.New()
	hasher.Write([]byte(SECRET))

	hashedSecret := hex.EncodeToString(hasher.Sum(nil)[:])

	if argsLength == 0 {
		ShowHelp()
	} else {
		if os.Args[1] == "buffer" {
			BufferRoutine(hashedSecret, publicKey, SERVER_URI)
		} else if os.Args[1] == "refresh" {
			RefreshRoutine(SERVER_URI)
		} else if os.Args[1] == "get" {
			GetRoutine()
		}
	}

}

func ShowHelp() {
	fmt.Printf("Buffered.link CLI Help \n")
	fmt.Printf("To get a buffer, run -> bfdl buffer filename.txt \n")
	fmt.Printf("To make the new buffer public, add -p to the command above \n")
	fmt.Printf("To refresh a buffer, run -> bfdl refresh <bufferId> \n")
	fmt.Printf("To get the content of a buffer, run -> bfdl get <bufferId> \n")
	fmt.Printf("To write the content of the buffer to a file, add -f flag \n")
}

func BufferRoutine(secretHash string, publicKey string, service string) {
	isPublic := false

	fileName := os.Args[2]


	if len(os.Args) > 3 && os.Args[3] == "-p" {
		isPublic = true
	}
	
	// read the file content
	content, err := os.ReadFile(fileName)
	if err != nil { fmt.Printf("Failed to read file") }
	
	payload := map[string]interface{}{
		"type": "text",
		"ownerHash": secretHash,
		"content": string(content),
		"isPublic": isPublic,
		"publicKey": publicKey,
	}

	jsonBody, err := json.Marshal(payload)
	if err != nil { fmt.Printf("Failed") }

	// fmt.Printf("Marshalled Body : \n %s \n", jsonBody)
	// jsonBody := []byte(jsonBody_)
	bodyReader := bytes.NewReader(jsonBody)
	
	req, err := http.NewRequest(http.MethodPost, service+"/save", bodyReader)
	req.Header.Set("Content-Type", "application/json")
	
	res, err := http.DefaultClient.Do(req)

	if err != nil {
		fmt.Printf("Failed")
	}

	resBody, err := ioutil.ReadAll(res.Body)
	response := string(resBody)

	var data map[string]interface{}

	// fmt.Printf("Response is \n %s \n", response)
	_ = json.Unmarshal([]byte(response), &data)

	status, _ := data["status"]
	
	if status == true {
		buffer, _ := data["buffer"].(map[string]interface{})
		id, _ := buffer["id"]
		fmt.Printf("Saved Buffer with ID %s \n", id)
	}
}

func GetRoutine() {}
func RefreshRoutine(service string) {

	bufferId := os.Args[2]
	
	req, err := http.NewRequest(http.MethodPost, service+"/refresh?id="+bufferId, nil)
	
	_, err = http.DefaultClient.Do(req)
	if err != nil {
		fmt.Printf("Failed")
	}
	
	fmt.Printf("Refreshed Buffer with ID %s \n", bufferId)
}
