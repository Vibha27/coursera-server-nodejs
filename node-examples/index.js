var rect = require('./rectangle');

function  solveRect(l,b) {
    console.log("Solving for rectangle = " + l + ' and ' + b);

    rect(l,b,(err,rectangle) => {
        if(err) {
            console.log("Error : ",err.message);
        }else{
            console.log('Area of l =' + l + 'b= ' + b + ' is ' + rectangle.area());
            console.log('Perimeter of l =' + l + 'b= ' + b + 'is' + rectangle.perimeter());

        }
    });

    console.log('this statement is after the call to rect()')
}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);