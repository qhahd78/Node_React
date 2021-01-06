
// node_module 에서 모듈을 가져온다. 
const express = require('express')
// 가져온 모듈을 이용하여 새로운 함수 app 을 만든다. 
const app = express()
const port = 5000
//설치했던 body-parser 가져오기 
const bodyParser = require('body-parser');
//User 모델 가져오기 
const { User } = require("./models/User");
const config = require("./config/key");

//application/x-www-form-urlencoded -이와 같은 데이터를 분석하여 가져올 수 있게 하는 코드 
app.use(bodyParser.urlencoded({extended: true}));

//application/json json 타입을 분석, 가져올 수 있게 함 
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err =>console.log(err))
//req(요청) 및 res(응답)는 Node가 제공하는 동일한 오브젝트이며, 
//따라서 req.pipe(), req.on('data', callback) 그리고 Express의 
//관여가 필요 없는 다른 모든 항목을 호출할 수 있습니다.
app.get('/', (req, res) => res.send('Hello World! 우리옹이 예쁘다 '))

app.post('/register', (req, res) => {
    //회원 가입 할 때 필요한 정보들을 client 에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    

    //body-parser를 이용. 클라이언트에 보내느 정보를 받음. 
    //req.body 로 모든 정보를 User 모델에 에 넣어줬음 
    const user = new User (req.body)

    //정보들을 유저  모델에 저장. 
    
    //save 전에 암호화 필요 
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

//응답이 올 때까지 기다리는 함수. 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

