function handleBasicQueryResponse(httpResponse, err, res) {
    if (err) {
        console.log("ERROR");
        console.log(err);
        httpResponse.status(400).send("Invalid Request");
        return;
    }
    console.log(res["rows"])
    httpResponse.send(res["rows"]);
}


module.exports = { handleBasicQueryResponse }