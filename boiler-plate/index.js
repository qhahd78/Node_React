
// node_module 에서 모듈을 가져온다. 
const express = require('express')
// 가져온 모듈을 이용하여 새로운 함수 app 을 만든다. 
const app = express()
const port = 5000

//req(요청) 및 res(응답)는 Node가 제공하는 동일한 오브젝트이며, 
//따라서 req.pipe(), req.on('data', callback) 그리고 Express의 
//관여가 필요 없는 다른 모든 항목을 호출할 수 있습니다.
app.get('/', (req, res) => res.send('Hello World! 안녕안녕안녕?'))

//응답이 올 때까지 기다리는 함수. 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))