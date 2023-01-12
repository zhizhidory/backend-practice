const db =require("../config/dbconnection.js")
const createMessagSQL = `CREATE TABLE message(
    id bigint NOT NULL primary key AUTO_INCREMENT,
    content varchar(255),
    imageUrl varchar(255))`;
db.query(createMessagSQL, (err, result)=>{
    if(err) return console.log(err.message);
})

db.end((err) => {
    if(err) return console.log(err.message);
})