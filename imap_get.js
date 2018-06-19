var inbox = require("inbox");
const server ="imap.sfc.keio.ac.jp";
const user = "t16642sn";
const password = "Himawari12";
var iconv = require('iconv');
var conv = new iconv.Iconv("ISO-2022-JP","UTF-8");

var client = inbox.createConnection(false,server,{
    secureConnection: true,
    auth:{
        user:user,
        pass:password
    }
});

client.connect();

client.on("connect",function(){
    console.log('connected!');
    client.openMailbox("INBOX",function(error,info){
        if(error){
            console.log(error);
        }
        else{
            //console.log(info);
        }
        client.listMessages(-50,function(err,messages){
            if(err){
                console.log(err);
            }
            else{
                //console.log(messages);
            }
            messages.forEach(function(message){
                //const uid = message.UID;
                //console.log(uid);
                //console.log(message.title);
                if(message.title == 'CNS Printer Status'){
                    client.createMessageStream(message.UID).on('data',function(data){
                        var body = conv.convert(data).toString();
                        console.log(body);
                    })
                }
            })
            client.close();
        })
    })
});

/*
client.on('connect',function(){
    console.log('connected!');
client.listMessages(-10,function(err,messages){
    messages.forEach(function(message){
        const uid = message.UID;
        console.log(uid);
        console.log('Name:'+ message.from.name);
        console.log("address: "+message.from.address);
        console.log("Title: "+message.title);
    })
    client.close();
});
});
*/
