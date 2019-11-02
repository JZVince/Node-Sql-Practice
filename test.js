const csv = require('csv'); 
// loads the csv module referenced above.
const obj = csv(); 
// gets the csv module to access the required functionality
function MyCSV(Fone, Ftwo, Fthree) {
    this.FieldOne = Fone;
    this.FieldTwo = Ftwo;
    this.FieldThree = Fthree;
};
// Define the MyCSV object with parameterized constructor, this will be used for storing the data read from the csv into an array of MyCSV. You will need to define each field as shown above.
var MyData = []; 
// MyData array will contain the data from the CSV file and it will be sent to the clients request over HTTP. 
obj.from.path('./data/courses.csv').to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
        MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2]));
    }
    console.log(MyData);
});
