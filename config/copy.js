const db =require("./dbconnection.js")
const url="https://ds6rxh7zrj5cq.cloudfront.net/test/"
const urlimage=[url+"2023-01-11-144435", url+"2023-01-11-144838", url+"2023-01-12-132040", url+"2023-01-12-132510"]
// const createMessagSQL = `INSERT INTO message (content, imageUrl) VALUES ("1",? ),("2",?), ("3", ?), ("4", ?)`;
const createMessagSQL = `TRUNCATE TABLE message`;

db.query(createMessagSQL, (err, result)=>{
    if(err) {
        console.log(err.message);
        return
    }
    console.log("result:"+ result);
})
db.query("SELECT * FROM message", (err, result)=>{
    if(err) {
        console.log(err.message);
        return
    }
    console.log("result:"+ result);
})

// db.end((err) => {
//     if (err){
//         console.log(err.message);
//         return
//     }
//     console.log("close")
// })