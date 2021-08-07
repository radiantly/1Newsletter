const express = require('express')
const multer = require('multer')
const app = express()
const upload = multer()

app.post('/email', upload.any(), async(req, res)=>{
    const body = req.body
    console.log("to: ", body.to);
    console.log("cc: ", body.cc);
    console.log("from: ", body.from);
    console.log("subject: ", body.subject);

    console.log("html: ", body.html);
    console.log("text: ", body.text);
    console.log("attachments: ", body.attachments);
    // console.log("attachment-info: ", body['attachment-info']);
    // console.log("content-ids: ", body['content-ids']);

    

    if (req.files.length > 0) {
        // Log file data
        console.log(req.files)
    } else {
        console.log('No files...')
    }

    return res.status(200).send()

})
app.listen(3000, () => {
    console.log('Webserver running on port 3000! -> http://localhost:3000')
})