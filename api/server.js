
const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const orders = [];


app.use(bodyParser.json());
app.use(express.static(__dirname + '/../dist/widgetList'));

function checkOrder(qty){

    let counter = +qty;

    let orderTotal = []
    
    checkQty(counter, orderTotal);

}

function checkQty(counter, orderTotal){
    while(counter > 0){
console.log(counter)
        switch(true){
            case(counter >= 5000):
            addWidgets(5000,orderTotal);
                counter = counter - 5000;
            break;
    
            case(counter >= 2000):
            addWidgets(2000,orderTotal);
            counter = counter - 2000;
            break;
    
            case(counter >= 1000):
            addWidgets(1000,orderTotal);
            counter = counter - 1000;
            break;
    
            case(counter >= 500):
            addWidgets(500,orderTotal);
            counter = counter - 500;
            break;
    
            case(counter >= 250):
            addWidgets(250,orderTotal);
            counter = counter - 250;
            break;

            default:
                addWidgets(250,orderTotal);
                counter = counter - 250;
                break;
        }  

   
        
    }
    orders.push(orderTotal);
}

function generatePack(size){
    return {packSize:size};
}

function addWidgets(size,orderTotal){
    let currentList = orderTotal.find(({packSize})=>packSize === size);
    if(!currentList){
        orderTotal.push({...generatePack(size),qty:1})
        return;
    } 
    currentList.qty +=1

}

app.get('/api/order', (req, res) => {
  res.json(orders);
});

app.post('/api/order', (req, res) => {
  const order = req.body.qty;


  checkOrder(order)
  res.json(orders);
});

app.get('/*', (req,res) => {
  res.sendFile('index.html',{root:'../dist/widgetList'})
});

app.listen(process.env.PORT || port, () => {
    console.log(`Server listening on the port::${port}`);
});