var count=0;
var addvalue=document.querySelector(".add__value")
var budgetvalue=document.querySelector(".budget__value")
var addbtn = document.querySelector(".add__btn")
var addtype=document.querySelector(".add__type")
var des=document.querySelector(".add__description")
var incomelist=document.querySelector(".income__list")
var expenseslist = document.querySelector(".expenses__list")
addbtn.addEventListener("click", function () {
 
   if(addtype.value=="inc")
        {count = count + Number(addvalue.value);
    incomelist.innerHTML = incomelist.innerHTML + "<div class='item clearfix' id='income-0'><div class='item__description'>" + des.value + "</div><div class='right clearfix'><div class='item__value'>+ " + addvalue.value + "</div><div class='item__delete'><button class='item__delete--btn'><i class='ion-ios-close-outline'></i></button></div></div></div>"
        }
    else{
        count = count - Number(addvalue.value);
    expenseslist.innerHTML = expenseslist.innerHTML + "<div class='item clearfix' id = 'expense-0' ><div class='item__description'>" + des.value + "</div><div class='right clearfix'><div class='item__value'>- " + addvalue.value + "</div><div class='item__percentage'>21%</div><div class='item__delete'><button class='item__delete--btn'><i class='ion-ios-close-outline'></i></button></div></div></div >"
    }
    
    budgetvalue.textContent = count;
    


   

   
                        
        



    addvalue.value = "val"
})
