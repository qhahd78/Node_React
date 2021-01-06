const { User } = require("../models/User");


let auth = (req, res, next) => {

    //인증 처리 여기서 함

    // 클라이언트 쿠키에서 토큰 가져오기. 

    let token = req.cookies.x_auth;

    // 토큰을 복호화하고 유저를 찾기.
    User.findByToken(token, (err, user) =>{
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();
    })

    //유저가 있으면 인증 완료. 

    //유저가 없으면 인증 안됨. 
}

module.exports = { auth };