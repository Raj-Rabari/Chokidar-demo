const chokidar = require("chokidar");
const fs = require("fs");

let defaultOptions = {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    depth: 99,
    alwaysStat: true,
    ignorePermissionErrors: false,
    atomic: false // or a custom 'atomicity delay', in milliseconds (default 100)
};

const fileWatcher = chokidar.watch('D:\\watched folder', defaultOptions).on('change', (evt, stats) => {
    console.log(new Date().toTimeString(),"Change done",evt);
});


let xlsFile = "D:\\watched folder\\abc.xlsx";
let txtFile = "D:\\watched folder\\demo.txt";
let wordDoc = "D:\\watched folder\\word.docx";


setTimeout(() => {
    writeSyncStatus(xlsFile);
    writeSyncStatus(txtFile);
    writeSyncStatus(wordDoc);
}, 2000);

function writeSyncStatus(strPath) {
    let sWriter = fs.createWriteStream(strPath + ':SyncStatus');
    sWriter.on('open', (sw, err) => {
        if (!err) {
            sWriter.write('5');
            sWriter.close(() => {
                console.log(new Date().toTimeString(),"close", strPath, fs.statSync(strPath).mtimeMs);
            });
        }
    });
}