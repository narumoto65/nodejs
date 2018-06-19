var members = {
    taro:'yamada',
    hanako:'flower'
}
exports.index = function(req,res){
    //var text1 = req.body.text1;
    //res.cookie('msg',text1,{maxAge:600000});
    var name = req.body.name;//name entered in form
    var pass = req.body.pass;
    var msg = '';
    var member_pass = members[name];//use the entered name to find an element in the hash
    if(member_pass == pass){
        req.session.login = true;
        req.session.name = name;
        msg = '"' + name + '"でログインしました'
    }else{
        req.session.login = false;
        msg = 'ログインに失敗しました';
    }
    res.render('index',{
        title:'Express',
        msg:msg
    });
}