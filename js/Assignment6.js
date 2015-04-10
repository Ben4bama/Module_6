function Menuchoice()
{
    if (document.getElementById("menu").value == "Add A Customer")
    
    {
        document.getElementById("sec_1").style.visibility = "visible";
        document.getElementById("sec_2").style.visibility = "hidden";
        document.getElementById("sec_3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Change Shipping Info")
    {
        document.getElementById("sec_1").style.visibility = "hidden";
        document.getElementById("sec_2").style.visibility = "visible";
        document.getElementById("sec_3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Delete a Customer")
    {
        document.getElementById("sec_1").style.visibility = "hidden";
        document.getElementById("sec_2").style.visibility = "hidden";
        document.getElementById("sec_3").style.visibility = "visible";
    }
    else
    {
        document.getElementById("sec_1").style.visibility = "hidden";
        document.getElementById("sec_2").style.visibility = "hidden";
        document.getElementById("sec_3").style.visibility = "hidden";
    }
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CreateCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    //Collect Customer data from web page
    var customerid = document.getElementById("custid").value;
    var customername = document.getElementById("custName").value;
    var customercity = document.getElementById("custCity").value;
    
    //Create the parameter string
    var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername +'","City":"' + customercity +'"}';
    
    //Checking for AJAx operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult_1(result);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
}

function OperationResult_1(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("result_1").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("result_1").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CreateShippingInfo()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    //Collect Customer data from web page
    var ordernumber= document.getElementById("ordNum").value;
    var shiptoname = document.getElementById("Ship2Name").value;
    var shipstadd = document.getElementById("ShipStAdd").value;
    var shipcity = document.getElementById("ShipCity").value;
    var shippoco = document.getElementById("ShipPC").value;
    
    //Create the parameter string
    var newshipinfo = '{"OrderID":"' + ordernumber + '","ShipName":"' + shiptoname +'","ShipAddress":"' + shipstadd +'","ShipCity":"' + shipcity +'","ShipPostcode":"' + shippoco +'"}';
    
    //Checking for AJAx operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult_2(result);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newshipinfo);
}

function OperationResult_2(output)
{
    if (output == 1)
    {
        document.getElementById("result_2").innerHTML = "The operation was successful!"
    }
    else  if (output == -3) 
    {
        document.getElementById("result_2").innerHTML = "The Order Number does not exist."
    }
    else 
    {
        document.getElementById("result_2").innerHTML = "The operation was NOT successful."
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function DeleteCustID()
{
    var objRequest = new XMLHttpRequest();  //Create AJAX request object
    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    url += document.getElementById("DelcustID").value;
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    }
            //Initiate the server request
            objRequest.open("GET", url, true);
            objRequest.send();
}


function GenerateOutput(result)
{
    if ( result.DeleteCustomerResult.WasSuccessful == 1)
    {
        document.getElementById("result_3").innerHTML = "Customer was deleted from the database."
    }
    else if (result.DeleteCustomerResult.WasSuccessful == 0) 
    {
        document.getElementById("result_3").innerHTML = "The operation was NOT successful." + "<br>" + output.Exception;
    }
}