// window.onload = ()=>{

const script1 = document.createElement("script")
const script2 = document.createElement("script")

script1.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"
script2.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.2.13/jspdf.plugin.autotable.min.js"

document.body.appendChild(script1)
document.body.appendChild(script2)

    const table1 =document.getElementById("OTNMINIEMS_CMT")
   
    function getInnermostElement(element){

            if(element.children[0]!==undefined){
                const innerElement = element.children[0]
                return getInnermostElement(innerElement)
            }else{
                // console.log(element.innerText)
                if(isNaN(Number(element.innerText))){
                    return element.innerText;
                }else{
                    return Number(element.innerText)
                }
            }

    }

let headings = []

    const topRowElArr = table1.children[0].children[0].children
    
        for(let i=0;i<topRowElArr.length;i++){
                headings.push(getInnermostElement(topRowElArr[i]))
            }
        

/* 
        
Creating 2D array for data in myTable. Using push command.
        
*/
let data = []
let rData = []
const ntrDataArray = table1.children[1].children
       
for(let i=0;i<ntrDataArray.length;i++){
    
    const dataRowArray = ntrDataArray[i].children

    for(let j=0;j<dataRowArray.length;j++){
        if(getInnermostElement(dataRowArray[1])!=="NTR" && getInnermostElement(dataRowArray[1])!=="TOTAL"){           // Selecting only NTR value
            break
        } 

    if(i==ntrDataArray.length-1){
        rData.push(0)
    }else{
       
            rData.push(getInnermostElement(dataRowArray[j]))
        

    }    
    
      if(rData.length==dataRowArray.length){
        data.push(rData)
        rData = []
    }
    
    }
}

/* 
        
operating on 2D array for calculation using same for loops.
        
*/

console.log(JSON.stringify(data))

for(let i=0;i<data.length;i++){


    for(let j=0;j<data[i].length;j++){
        data[i][0] = i+1                   // For S.No.
        if(j>2 && j<data[i].length-1 && i!==data.length-1){
           
           data[data.length-1][j]= data[data.length-1][j]+data[i][j]
           
        }

        else if(i==data.length-1 && j==data[data.length-1].length-1){
            data[i][j]=(data[data.length-1][10]/data[data.length-1][6]*100).toFixed(2)+"%";
        }

        else{
            data[data.length-1][2] = "Total"
        }

    }

}
// To this point data.length == 9

// to push headings at the start of the data array
data.unshift(headings)

var myTable = document.createElement("table");
myTable.id = "myTable"

for (i = 0; i < data.length; i++) {
    var row = document.createElement("tr");
    for (j = 0; j < data[i].length; j++) {
        if(i==0){
            var column = document.createElement("th");
        }else{

            var column = document.createElement("td");
        }
        var content = document.createTextNode(data[i][j]);
        column.appendChild(content);
        row.appendChild(column);
    }
    myTable.appendChild(row);
}

var myWindow = window.open("", "window", "width=1300,height=800");
myWindow.document.write(`
<html>
<head>
</head>
<body>`);
myWindow.document.write('</body></html>');
const myHead = myWindow.document.getElementsByTagName("head")
myWindow.document.head.innerHTML = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.2.13/jspdf.plugin.autotable.min.js"></script>
<link rel="stylesheet" type="text/css" href="./index.css">
`
myWindow.document.body.appendChild(myTable);

const download = myWindow.document.createElement("button")
download.innerHTML = "DOWNLOAD"

download.addEventListener("click",demo())

myWindow.document.body.appendChild(download)

function demo() {
    var obj = new jsPDF('landscape')
    obj.text('Sample Table', 20, 20)
    obj.autoTable({
        startX: 30,
        startY: 30,
        head: [
            ['Name', 'City', 'Phone No.']
        ],
        body: [
            ['Donna', 'New York', '8456210'],
            ['Rachel', 'Los Angeles', '7845521'],
            ['Harvey', 'Chicago', '9865371']
        ],
    });
    obj.save('example.pdf');
}

// }