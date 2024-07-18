var display = document.getElementById("#display");
var bodyData = document.querySelector(".body-data");
var display = document.querySelector("#display");
var data = [], trans = [], count = [], sumOfTransaction = [], myName, filterوtable, tr, td;
table = document.querySelector(".body-data");
tr = table.getElementsByTagName("tr");

getCustomerData();

var searchName = document.getElementById("customerName");
var searchAmount = document.getElementById("CustomerAmount");

async function getCustomerData() {
    var respone = await fetch('http://localhost:5050/customers');
    data = await respone.json();
    getTransData();
}
async function getTransData() {
    var respone = await fetch('http://localhost:5050/transactions');
    trans = await respone.json();
    // displayData();
}

function displayData() {
    // myName = data[0].name.toUpperCase();
    // filter = searchName.value.toUpperCase();
    var container = "";
    for (var i = 0; i < data.length; i++) {
        count[i] = 0;
        sumOfTransaction[i] = 0
        for (var j = 0; j < trans.length; j++) {
            if (data[i].id == trans[j].customer_id) {
                count[i]++;
                sumOfTransaction[i] += trans[j].amount;
            }
        }
        container += `
                        <tr>
                            <th scope="row">${data[i].id}</th>
                            <td>${data[i].name}</td>
                            <td>$${sumOfTransaction[i]}</td>
                            <td>${count[i]}</td>
                        </tr>
        `;
    }
    bodyData.innerHTML = container;
}
{/* <th scope="row">${data[i].id}</th> */ }

$('#basic-addon1').on('click', function () {
    var cartona = "", wrongData = false, selectedCust, count2 = 1;
    if (searchName.value) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].name.toUpperCase() == (searchName.value.toUpperCase())) {
                console.log("true");
                cartona += `<tr>
                                <th scope="row">${count2++}</th>
                                <td>${data[i].name}</td>
                                <td>$${sumOfTransaction[i]}</td>
                                <td>${count[i]}</td>
                            </tr>`;
                // break;
                selectedCust = data[i].id;
            }

        }
        bodyData.innerHTML = cartona;
        document.querySelector('#customerName').value = "";
    }
    let [dateOfTransArr, amountOfTransArr] = getCustTransactionsAmount(selectedCust);
    console.log(dateOfTransArr, amountOfTransArr);
    chart(dateOfTransArr, amountOfTransArr);
    // destroy();

})

$('#basic-addon2').on('click', function () {
    var cartona = "", wrongData = false;
    if (searchAmount.value) {
        for (var j = 0; j < trans.length; j++) {
            if (searchAmount.value == sumOfTransaction[j]) {
                cartona += `<tr>
                            <th scope="row">${data[j].id}</th>
                            <td>${data[j].name}</td>
                            <td>$${sumOfTransaction[j]}</td>
                            <td>${count[j]}</td>
                        </tr>`;
                // break;
            }
        }
        bodyData.innerHTML = cartona;
        document.querySelector('#CustomerAmount').value = "";
    }
})

$('#display').on('click', function () {
    // getCustomerData();
    displayData();
})
function destroy() {

}
function chart(date, amount) {
    const ctx = document.getElementById('myChart');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: date,
            datasets: [{
                label: 'Customer Transaction per day',
                data: amount,
                borderWidth: 5
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

function getCustTransactionsAmount(custId) {
    const day = [], transAmount = [];

    for (let i = 0; i < trans.length; i++) {
        if (custId == trans[i].customer_id) {
            day.push(trans[i].date);
            transAmount.push(trans[i].amount);
        }
    }
    return [day, transAmount];
}
