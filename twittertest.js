var twitter = require('twitter');

var client = new twitter({
    consumer_key:,
    consumer_secret:,
    access_token_key:,
    access_token_secret:
});

client.post('statuses/update',
    {status:'二郎食べたい'},
    function(error, tweet,response){
        if(!error){
            console.log(tweet);
        }
        if(error){
            console.log(error);
        }
    });