const electron = require("electron");
const url = require("url");
const path = require("path");
const sql = require("mssql");

var config = {
    server : "144.122.56.12\\ceitserver",
    database: "user32",
    user: "user32",
    password: "Ravza123."
}

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
var cus_list_new;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 1385,
        height: 830
    });
    console.log(process.platform);
    mainWindow.loadURL(
        url.format({
            pathname : path.join(__dirname, "index.html"),
            protocol : "file:",
            slashes : true 
        })
    )


    /*pop-ups which show the query lists*/
    ipcMain.on("cus_list", () =>{
        cus_list();
        cus_list_new.webContents.once("dom-ready", () => {
            sql.connect(config, (err) =>{
                if (err){
                    console.log(err);
                }

                var request = new sql.Request();

                request.query("SELECT FNAME, LNAME, BIRTHDATE, CUST_ADD FROM CUSTOMERS_B WHERE YEAR(GETDATE()) - YEAR(BIRTHDATE) > 60", (err, result, fields) => {
                    if (err){
                        console.log(err);
                    }
                    cus_list_new.webContents.send("customer_list", result);
                })
            })
        })
    })
    ipcMain.on("rich_cus", () =>{
        rich_cust();
        rich_cust_new.webContents.once("dom-ready", () => {
            sql.connect(config, (err) =>{
                if (err){
                    console.log(err);
                }

                var request = new sql.Request();

                request.query("SELECT TOP 10 FNAME, LNAME, BALANCE FROM ACCOUNT_B, CUSTOMERS_B WHERE ACC_CUST_NO = CUST_NO ORDER BY BALANCE DESC", (err, result, fields) => {
                    if (err){
                        console.log(err);
                    }
                    rich_cust_new.webContents.send("rich_cust", result);
                })
            })
        })
    })
    ipcMain.on("list_bra", () => {
        list_bra();
        list_bra_new.webContents.once("dom-ready", () => {
            sql.connect(config, (err) =>{
                if (err){
                    console.log(err);
                }

                var request = new sql.Request();

                request.query("SELECT BRA_NAME, BRA_ADDRESS, BRA_CITY, FNAME, LNAME FROM BRANCH_B, EMPLOYEE_B WHERE BRA_MNG = EMP_NO", (err, result, fields) => {
                    if (err){
                        console.log(err);
                    }
                    list_bra_new.webContents.send("list_bra", result);
                })
            })
        })
    })
    ipcMain.on("hard_bra_man", () => {
        hard_bra_man();
        hard_bra_man_new.webContents.once("dom-ready", () => {
            sql.connect(config, (err) =>{
                if (err){
                    console.log(err);
                }

                var request = new sql.Request();

                request.query("SELECT BRA_NAME, FNAME, LNAME,SALARY FROM BRANCH_B, EMPLOYEE_B WHERE BRA_MNG = EMP_NO", (err, result, fields) => {
                    if (err){
                        console.log(err);
                    }
                    hard_bra_man_new.webContents.send("hard_bra_man", result);
                })
            })
        })
    })
    ipcMain.on("list_emp", () => {
        list_emp();
        list_emp_new.webContents.once("dom-ready", () => {
            sql.connect(config, (err) =>{
                if (err){
                    console.log(err);
                }

                var request = new sql.Request();

                request.query("SELECT FNAME, LNAME, BRA_NAME FROM EMPLOYEE_B, BRANCH_B WHERE ID_BRA = BRA_ID", (err, result, fields) => {
                    if (err){
                        console.log(err);
                    }
                    list_emp_new.webContents.send("list_emp", result);
                })
            })
        })
    })
    ipcMain.on("list_female", () => {
        list_female();
        list_female_new.webContents.once("dom-ready", () => {
            sql.connect(config, (err) =>{
                if (err){
                    console.log(err);
                }

                var request = new sql.Request();

                request.query("SELECT FNAME, LNAME, CUST_ADD, CUST_CITY FROM CUSTOMERS_B WHERE SEX LIKE 'F'", (err, result, fields) => {
                    if (err){
                        console.log(err);
                    }
                    list_female_new.webContents.send("list_female", result);
                })
            })
        })
    })
    })
    ipcMain.on("sex_disc_sal", () => {
        sex_disc_sal(); 
        sex_disc_sal_new.webContents.once("dom-ready", () => {
            sql.connect(config, (err) =>{
                if (err){
                    console.log(err);
                }

                var request = new sql.Request();

                request.query("SELECT FNAME,LNAME,EMPNO FROM EMPLOYEE", (err, result, fields) => {
                    if (err){
                        console.log(err);
                    }
                    sex_disc_sal_new.webContents.send("sex_disc_sal", result);
                })
            })
        })
    })
    ipcMain.on("emp_birth", () => {
        emp_birth();
        emp_birth_new.webContents.once("dom-ready", () => {
            sql.connect(config, (err) =>{
                if (err){
                    console.log(err);
                }

                var request = new sql.Request();

                request.query("SELECT FNAME, LNAME, BIRTHDATE FROM EMPLOYEE_B WHERE MONTH(BIRTHDATE) = MONTH(GETDATE())", (err, result, fields) => {
                    if (err){
                        console.log(err);
                    }
                    emp_birth_new.webContents.send("emp_birth", result);
                })
            })
        })
    })
    ipcMain.on("disc_emp", () => {
        disc_emp();
        disc_emp_new.webContents.once("dom-ready", () => {
            sql.connect(config, (err) =>{
                if (err){
                    console.log(err);
                }

                var request = new sql.Request();

                request.query("SELECT FNAME,LNAME,EMPNO FROM EMPLOYEE", (err, result, fields) => {
                    if (err){
                        console.log(err);
                    }
                    disc_emp_new.webContents.send("disc_emp", result);
                })
            })
        })
    })
    ipcMain.on("exp_emp", () => {
        exp_emp();
        exp_emp_new.webContents.once("dom-ready", () => {
            sql.connect(config, (err) =>{
                if (err){
                    console.log(err);
                }

                var request = new sql.Request();

                request.query("SELECT FNAME, LNAME, BRA_NAME, BRA_ADDRESS, BRA_CITY FROM BRANCH_B, EMPLOYEE_B WHERE YEAR(GETDATE()) - YEAR(HIREDATE) > 10 AND ID_BRA = BRA_ID", (err, result, fields) => {
                    if (err){
                        console.log(err);
                    }
                    exp_emp_new.webContents.send("exp_emp", result);
                })
            })
        })
    });


function cus_list(){
    cus_list_new = new BrowserWindow({
        width: 1385,
        height: 830,
        webPreferences: {
            nodeIntegration: true
        },
    })
    cus_list_new.loadURL(url.format({
        pathname: path.join(__dirname, "./pages/cus_list.html"),
        protocol: "file:",
        slashes: true
    }))
    cus_list_new.on("close", ()=>{
        cus_list_new = null
        sql.close()
    })
}

function disc_emp(){
    disc_emp_new = new BrowserWindow({
        width: 1385,
        height: 830,
        webPreferences : {
            nodeIntegration: true
        }
    })
    disc_emp_new.loadURL(url.format({
        pathname: path.join(__dirname, "./pages/disc_emp.html"),
        protocol: "file:",
        slashes: true
    }))
    disc_emp_new.on("close", ()=>{
        disc_emp_new = null;
        sql.close()
    })
}

function emp_birth(){
    emp_birth_new = new BrowserWindow({
        width: 1385,
        height: 830,
        webPreferences : {
            nodeIntegration: true
        }
    })
    emp_birth_new.loadURL(url.format({
        pathname: path.join(__dirname, "./pages/emp_birth.html"),
        protocol: "file:",
        slashes: true
    }))
    emp_birth_new.on("close", ()=>{
        emp_birth_new = null;
        sql.close()
    })
}

function exp_emp(){
    exp_emp_new = new BrowserWindow({
        width: 1385,
        height: 830,
        webPreferences: {
            nodeIntegration: true
        }
    })
    exp_emp_new.loadURL(url.format({
        pathname: path.join(__dirname, "./pages/exp_emp.html"),
        protocol: "file:",
        slashes: true
    }))
    exp_emp_new.on("close", ()=>{
        exp_emp_new = null;
        sql.close()
    })
}

function hard_bra_man(){
    hard_bra_man_new = new BrowserWindow({
        width: 1385,
        height: 830,
        webPreferences : {
            nodeIntegration : true
        }
    })
    hard_bra_man_new.loadURL(url.format({
        pathname: path.join(__dirname, "./pages/hard_bra_man.html"),
        protocol: "file:",
        slashes: true
    }))
    hard_bra_man_new.on("close", ()=>{
        hard_bra_man_new = null;
        sql.close()
    })
}

function list_bra(){
    list_bra_new = new BrowserWindow({
        width: 1385,
        height: 830,
        webPreferences : {
            nodeIntegration: true
        }
    })
    list_bra_new.loadURL(url.format({
        pathname: path.join(__dirname, "./pages/list_bra.html"),
        protocol: "file:",
        slashes: true
    }))
    list_bra_new.on("close", ()=>{
        list_bra_new = null;
        sql.close()
    })
}

function list_emp(){
    list_emp_new = new BrowserWindow({
        width: 1385,
        height: 830,
        webPreferences : {
            nodeIntegration: true
        }
    })
    list_emp_new.loadURL(url.format({
        pathname: path.join(__dirname, "./pages/list_emp.html"),
        protocol: "file:",
        slashes: true
    }))
    list_emp_new.on("close", ()=>{
        list_emp_new = null;
        sql.close()
    })
}

function list_female(){
    list_female_new = new BrowserWindow({
        width: 1385,
        height: 830,
        webPreferences : {
            nodeIntegration: true
        }
    })
    list_female_new.loadURL(url.format({
        pathname: path.join(__dirname, "./pages/list_female.html"),
        protocol: "file:",
        slashes: true
    }))
    list_female_new.on("close", ()=>{
        list_female_new = null;
        sql.close()
    })
}

function rich_cust(){
    rich_cust_new = new BrowserWindow({
        width: 1385,
        height: 830,
        webPreferences:{
            nodeIntegration: true
        }
    })
    rich_cust_new.loadURL(url.format({
        pathname: path.join(__dirname, "./pages/rich_cust.html"),
        protocol: "file:",
        slashes: true
    }))
    rich_cust_new.on("close", ()=>{
        rich_cust_new = null;
        sql.close()
    })
}

function sex_disc_sal(){
    sex_disc_sal_new = new BrowserWindow({
        width: 1385,
        height: 830,
        webPreferences: {
            nodeIntegration: true
        }
    })
    sex_disc_sal_new.loadURL(url.format({
        pathname: path.join(__dirname, "./pages/sex_disc_sal.html"),
        protocol: "file:",
        slashes: true
    }))
    sex_disc_sal_new.on("close", ()=>{
        sex_disc_sal_new = null;
        sql.close()
    })
}