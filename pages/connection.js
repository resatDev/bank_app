const electron = require("electron");
const url = require("url");
const path = require("path");
const sql = require("mssql");

const {app, BrowserWindow, Menu, ipcMain, ipcRenderer} = electron;
 
ipcRenderer.on("customer_list", (err, result) => {
   for(i = 0; i<result.recordset.length ; i++){
       produce_table_cus_list(result.recordset[i]);
   }
    console.log(result)
});
ipcRenderer.on("disc_emp", (err, result) => {
    for(i = 0; i < result.recordset.length ; i++){
        produce_table_cust_list(result.recordset[i]);
    }
    console.log(result);
})
ipcRenderer.on("emp_birth", (err, result) => {
    for(i = 0; i < result.recordset.length ; i++){
        produce_table_emp_birth_list(result.recordset[i]);
    }
    console.log(result);
})
ipcRenderer.on("exp_emp", (err, result) => {
    for(i = 0; i < result.recordset.length ; i++){
        produce_table_EXP_EMP_list(result.recordset[i]);
    }
    console.log(result);
})
ipcRenderer.on("sex_disc_sal", (err, result) => {
    for(i = 0; i < result.recordset.length ; i++){
        produce_table_dısc_sex_list(result.recordset[i]);
    }
    console.log(result);
})
ipcRenderer.on("rich_cust", (err, result) => {
    for(i = 0; i < result.recordset.length ; i++){
        produce_table_rich_cust_list(result.recordset[i]);
    }
    console.log(result);
})
ipcRenderer.on("list_bra", (err, result) => {
    for(i = 0; i < result.recordset.length ; i++){
        produce_table_bra_list(result.recordset[i]);
    }
    console.log(result);
})
ipcRenderer.on("list_female", (err, result) => {
    for(i = 0; i < result.recordset.length ; i++){
        produce_table_female_list(result.recordset[i]);
    }
    console.log(result);
})
ipcRenderer.on("list_emp", (err, result) => {
    for(i = 0; i < result.recordset.length ; i++){
        produce_table_emp_list(result.recordset[i]);
    }
    console.log(result);
})
ipcRenderer.on("hard_bra_man", (err, result) => {
    for(i = 0; i < result.recordset.length ; i++){
        produce_table_HARD_BRA_list(result.recordset[i]);
    }
    console.log(result);
})
function produce_table_emp_list(event){
    var query_table = document.querySelector("#table");

    const tr = document.createElement("tr");
    const td_fname = document.createElement("td");
    const td_lname = document.createElement("td");
    const td_branch_name = document.createElement("td");
    

    td_fname.innerHTML = event.FNAME;
    td_lname.innerHTML = event.LNAME;
    td_branch_name.innerHTML = event.BRA_NAME;
    tr.appendChild(td_fname);
    tr.appendChild(td_lname);
    tr.appendChild(td_branch_name);
    query_table.appendChild(tr);
}
function produce_table_bra_list(event){
    var query_table = document.querySelector("#table");

    const tr = document.createElement("tr");
    const td_fname = document.createElement("td");
    const td_lname = document.createElement("td");
    const td_branch_name = document.createElement("td");
    const td_brach_address = document.createElement("td");
    const td_branch_city = document.createElement("td");
    

    td_fname.innerHTML = event.FNAME;
    td_lname.innerHTML = event.LNAME;
    td_branch_name.innerHTML = event.BRA_NAME;
    td_branch_city.innerHTML = event.BRA_CITY;
    td_brach_address.innerHTML = event.BRA_ADDRESS;
    tr.appendChild(td_branch_name);
    tr.appendChild(td_brach_address);
    tr.appendChild(td_branch_city);
    tr.appendChild(td_fname);
    tr.appendChild(td_lname);
    query_table.appendChild(tr);
}
function produce_table_female_list(event){
    var query_table = document.querySelector("#table");

    const tr = document.createElement("tr");
    const td_fname = document.createElement("td");
    const td_lname = document.createElement("td");
    const td_city = document.createElement("td");
    const td_add = document.createElement("td");
    

    td_fname.innerHTML = event.FNAME;
    td_lname.innerHTML = event.LNAME;
    td_add.innerHTML = event.CUST_ADD;
    td_city.innerHTML = event.CUST_CITY;
    tr.appendChild(td_fname);
    tr.appendChild(td_lname);
    tr.appendChild(td_add);
    tr.appendChild(td_city);
    query_table.appendChild(tr);
}
function produce_table_HARD_BRA_list(event){
    var query_table = document.querySelector("#table");

    const tr = document.createElement("tr");
    const td_fname = document.createElement("td");
    const td_lname = document.createElement("td");
    const td_bra_name = document.createElement("td");
    const td_salary = document.createElement("td");
    

    td_fname.innerHTML = event.FNAME;
    td_lname.innerHTML = event.LNAME;
    td_bra_name.innerHTML = event.BRA_NAME;
    td_salary.innerHTML = event.SALARY;
    tr.appendChild(td_bra_name);
    tr.appendChild(td_fname);
    tr.appendChild(td_lname);
    tr.appendChild(td_salary);
    query_table.appendChild(tr);
}
function produce_table_emp_birth_list(event){
    var query_table = document.querySelector("#table");

    const tr = document.createElement("tr");
    const td_fname = document.createElement("td");
    const td_lname = document.createElement("td");
    const td_bth = document.createElement("td");
    

    td_fname.innerHTML = event.FNAME;
    td_lname.innerHTML = event.LNAME;
    td_bth.innerHTML = event.BIRTHDATE;
    tr.appendChild(td_fname);
    tr.appendChild(td_lname);
    tr.appendChild(td_bth);
    query_table.appendChild(tr);
}
function produce_table_cus_list(event){
    var query_table = document.querySelector("#table");

    const tr = document.createElement("tr");
    const td_fname = document.createElement("td");
    const td_lname = document.createElement("td");
    const td_bth = document.createElement("td");
    const td_add = document.createElement("td");
    

    td_fname.innerHTML = event.FNAME;
    td_lname.innerHTML = event.LNAME;
    td_bth.innerHTML = event.BIRTHDATE;
    td_add.innerHTML = event.CUST_ADD;
    tr.appendChild(td_fname);
    tr.appendChild(td_lname);
    tr.appendChild(td_bth);
    tr.appendChild(td_add);
    query_table.appendChild(tr);
}
function produce_table_rich_cust_list(event){
    var query_table = document.querySelector("#table");

    const tr = document.createElement("tr");
    const td_fname = document.createElement("td");
    const td_lname = document.createElement("td");
    const td_balance = document.createElement("td");
    

    td_fname.innerHTML = event.FNAME;
    td_lname.innerHTML = event.LNAME;
    td_balance.innerHTML = event.BALANCE;
    tr.appendChild(td_fname);
    tr.appendChild(td_lname);
    tr.appendChild(td_balance);
    query_table.appendChild(tr);
}
function produce_table_EXP_EMP_list(event){
    var query_table = document.querySelector("#table");

    const tr = document.createElement("tr");
    const td_fname = document.createElement("td");
    const td_lname = document.createElement("td");
    const td_branch_name = document.createElement("td");
    const td_brach_address = document.createElement("td");
    const td_branch_city = document.createElement("td");
    

    td_fname.innerHTML = event.FNAME;
    td_lname.innerHTML = event.LNAME;
    td_branch_name.innerHTML = event.BRA_NAME;
    td_branch_city.innerHTML = event.BRA_CITY;
    td_brach_address.innerHTML = event.BRA_ADDRESS;
    tr.appendChild(td_fname);
    tr.appendChild(td_lname);
    tr.appendChild(td_branch_name);
    tr.appendChild(td_brach_address);
    tr.appendChild(td_branch_city);
    query_table.appendChild(tr);
}