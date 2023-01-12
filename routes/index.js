const AWS = require('aws-sdk');
require("dotenv").config()
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const multer =require('multer')
const db =require("../config/dbconnection.js")

let urlencodeedParser = bodyParser.urlencoded({ extended: false})

const profileUpload = multer({
    limit: {
      // 限制上傳檔案的大小為 1MB
      fileSize: 1000000
    },
    fileFilter(req, file, cb) {
      // 只接受三種圖片格式
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        cb(null, false);
      }
      cb(null, true);
    }
  })
const s3 = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});

const SELECTMessage = function() {
  return new Promise((reslove, reject) =>{
    db.query("SELECT * FROM message ORDER BY id DESC",(err, result, fileds) => {
      if(err) reject(err)
      reslove(result)
    })
  })
}

router.get('/', function(req, res){
    SELECTMessage().then( data=> {res.render("index", {"data":data})})
  });
router.post('/', profileUpload.single("upload-img"), urlencodeedParser, (req, res) =>{
    console.log(req.body.content)
    let date= new Date()
    let newdate=date.toLocaleDateString("en-CA")
    let time = date.getHours()
    let minute = date.getMinutes()
    let second= date.getSeconds()
    let filename=newdate+"-"+time+minute+second
    const params = {
        Bucket: 'xuanawsbucket/test', // 相簿位子
        Key: filename, // S3 上的檔案名稱
        Body: req.file.buffer, // 檔案
        ContentType: req.file.mimetype //副檔名
        // ACL: 'public-read', // 檔案權限
    };

    const upload= function(){
      return new Promise((reslove, reject) =>{
        s3.upload(params, (err, data) => {
          if (err) reject (err, err.stack);
          reslove (console.log('Bucket Created Successfully', data.Location));
      })}
      )};
      upload().then(()=>{
        const sql = "INSERT INTO message (content, imageUrl) VALUES (?, ?)"
        let varsql= [req.body.content, "https://ds6rxh7zrj5cq.cloudfront.net/test/"+filename]
        db.query(sql, varsql, (err, result) =>{
          if(err) return console.log(err.message);
          console.log(result)
          res.redirect("/")
    })})
})

module.exports = router;