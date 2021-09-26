var express = require('express');
var cors = require('cors')
const utils = require('./core/utils.js');
var app = express();
// const puppeteer = require('puppeteer');
const axios = require('axios');

const bodyParser = require('body-parser')
const multer = require('multer');


//CREATE EXPRESS APP
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'));
app.use(cors())

// var server = require('http').createServer(app);
// trang chu



// hosting

const fs = require("fs"); // Or `import fs from "fs";` with ESM

var rootPath = '/var/www/python/';
const sourcePath = rootPath + 'source/';
const resultPath = rootPath + 'results/';


/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
const execShellCommand = async cmd => {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            resolve(error ? false : true);
        });
    });
}

const execCmd = async cmds => {
    var c = [];
    if (typeof cmds == "string") {
        c.push(cmds);
    }
    else if (typeof cmds == "object" && (cmds instanceof Array || cmds.constructor == Array)) {
        c = cmds;
    }
    var cs = 0;
    if (c.length) {
        for (let index = 0; index < c.length; index++) {
            const cmd = c[index];
            const stt = await execShellCommand(cmd);
            if (stt) cs++;
        }
    }
    return cs;
}

const execCmdList = async cmds => {
    var c = [];
    if (typeof cmds == "string") {
        c.push(cmds);
    }
    else if (typeof cmds == "object" && (cmds instanceof Array || cmds.constructor == Array)) {
        c = cmds;
    }
    var cs = 0;
    if (c.length) {
        for (let index = 0; index < c.length; index++) {
            const cmd = c[index];
            const stt = await execShellCommand(cmd);
            if (stt) cs++;
            else {
                console.log("exec error! cmd: " + cmd)
                index += c.length;
                return false;
            }
        }
    }
    return cs;
}




async function startConvertion(inputFile, lang) {
    let outputFile = inputFile + ".txt";
    let result = '';
    if (fs.existsSync(sourcePath + inputFile)) {
        var status = await execCmdList(["python3 convert.py " + lang + " " + sourcePath + inputFile + (outputFile != "" ? " " + resultPath + outputFile : '')]);
        if (status) {
            if (fs.existsSync(resultPath + outputFile)) {
                var contents = fs.readFileSync(resultPath + outputFile, 'utf8');
                // await execCmdList(["rm " + resultPath + outputFile]);
                result = contents;
            }
        }
    }
    return result;
}



// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'source')
    },
    filename: function (req, file, cb) {
        var a = file.originalname.split(".");
        var e = a.pop();
        var name = utils.Str.slug(a.join("."), '-');
        cb(null, file.fieldname + '-' + Date.now() +'-' +name+ "." + e)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (_req, file, cb) {
        checkFileType(file, cb);
    }
})

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /wav|mp3|ogg|m4a|aac/;
    // Check ext
    let ext = file.originalname.split(".").pop();
    const extname = filetypes.test(ext.toLowerCase());
    // Check mime
    const audioTest = /audio\//
    const mimetype = audioTest.test(file.mimetype);
    // console.log(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Audio only');
    }
}








// ROUTES
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
})




app.post('/uploadfile', upload.single('audiofile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})


app.post('/api/upload-and-convert', upload.single('audiofile'), async (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    let filename = file.filename;
    var lang = req.body.lang || 1;
    var content = await startConvertion(filename, lang);
    var result = {
        status: content.length > 0,
        content: content
    }
    res.send(result);
})


app.listen(1998, () => {
    console.log('Example app listening on port 1998!')
});


