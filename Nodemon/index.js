const express=require('express');
const app =express();

app.get('/cats',(req,res)=>{
    console.log('We got  a request for cats!');
    res.send('<h1>Meow!</h1>');
})
app.get('//r/subreddit',(req,res)=>{
    console.log(req.params);
    res.send("<h1>Welcome to the subreddit!</h1>");
})
app.get('/dogs',(req,res)=>{
    console.log('We got  a request for dogs!');
    res.send('<h1>Woof!</h1>');
})
app.listen(8080,()=>{
    console.log('Server is running on port 8080');
})