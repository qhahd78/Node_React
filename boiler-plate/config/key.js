if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod')
    //만약 환경이 개발 (local) 환경이면 prod 파일에서 가져오고, 
} else {
    module.exports = require('./dev')
}   // 배포 환경이면 dev 에서 가져옴 