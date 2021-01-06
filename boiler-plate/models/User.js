const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
// const saltRounds = 10 
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
        
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token:{
        type: String
    },
    tokenExp: {
        type: Number
    }

})

//pre = 몽구스에서 가져온 메소드. 
//index.js 에서 save 전에 function 을 실행함. (save, function) 
userSchema.pre('save', function( next ) {
    // user 모델을 가리킨다.  
    var user = this;
    
    if(user.isModified('password')) {
    //비밀번호 암호화 시키기 
    
    //saltRounds 생성, 콜백 함수 실행. err가 나면, 바로 index.js 
    //user.save err 로 감. 
        bcrypt.gensaltRounds, function(err, salt){
            if(err) return next(err)

            //user.password 하면 암호화 되지 않은 순수 비밀번호를 가져온다. 
            //hash= 암호화된 비밀번호. 
            bcrypt.hash(user.password , salt, function(err, hash) {
                if (err) return next(err)
                //오류가 안 날 경우, hash 된 비밀번호로 password 교체  
                user.password = hash
                next()
            })
        }

    } else {

        next();

    }
    
    //할 일이 끝난 후에 next 로 보내준다. 
});


userSchema.methods.comparePassword = function(plainPassword, cb) {

    //plainPassword 1234567  암호화된 비밀번호 
    bcrypt.compare(plainpassword, this.password, function(err, isMatch){
        if(err) return cb(err),
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {

    var user = this;
    //jsonwebtoken 을 이용, token 을 생성하기 
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    // user._id + 'secretToken' = token

    // -> 

    // 'secretToken' -> user._id

    user.token = token 
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })

}
//모델로 감싸기 
const User = mongoose.model('User', userSchema)

//다른 곳에서도 쓸 수 있게 exports
module.exports = { User }