var budgetcontroller=(function()
{ 
    var expense = function(id , description,value)
    {
        this.id=id;
        this.description=description;
        this.value=value;
        this.percentage=-1;
    };

    expense.prototype.calcpercentage = function(totalincome){
        if(totalincome>0)
            {
this.percentage =Math.round((this.value/totalincome)*100);
            }
            else{
                this.percentage=-1;
            }

    }

    expense.prototype.getpercentage=function(){
        return this.percentage
    }

    var income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    

var calculatetotal=function(type){
   var sum =0;
   data.allitems[type].forEach(function(cur){
sum=sum+cur.value;
   })
   data.totals[type]=sum

}
  
    var totalexpenses = 0

    var data ={
        allitems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        }
       , budget:0
       ,percentage:-1
    }
    return{
        additem:function(type,des,val){
        var newitem,id  
        if(data.allitems[type].length>0)
        id=data.allitems[type][data.allitems[type].length-1].id+1
        else
        id=0

        
        if(type=='exp')
         {
            newitem = new expense(id, des, val)
         }
         else if(type=='inc')
         {
            newitem = new income(id, des, val) 
         }
         
         data.allitems[type].push(newitem)
           return newitem
        },

deleteitem:function(type,id){
    
    var ids = data.allitems[type].map(function(current){
      return current.id;

    });


    
   var index=ids.indexOf(id);
   
    if(index!== -1){
      var o=  data.allitems[type].splice(index,1);
      console.log(0)
    }
    



},

        calculatebudget:function(){

            calculatetotal('exp');
            calculatetotal('inc')



            data.budget=data.totals.inc-data.totals.exp;
            data.percentage=Math.round(data.totals.exp/data.totals.inc*100);

        },

        calculatepercentages:function(){
          data.allitems.exp.forEach(function(cur){
cur.calcpercentage(data.totals.inc);

          })

        },
        getpercentages:function(){
var allperc = data.allitems.exp.map(function(cur)
{
    return cur.getpercentage();
})
return allperc
        }
,
        getbudget:function(){
           return{
               budget:data.budget,
               totalinc:data.totals.inc,
               totalexp:data.totals.exp,
               percentage:data.percentage
           }
        },



   testing:function()
{
    console.log(data)
}

    }
})(); 







var uicontroller=(function(){
   
var domstrings={
inputtype:".add__type",
inputdescription:".add__description",
inputvalue:".add__value",
inputbtn:".add__btn",
incomecontainer:".income__list",
    expensescontainer: ".expenses__list",
    budgetlabel:".budget__value",
    incomelabel:".budget__income--value",
    expenseslabel:".budget__expenses--value",
    percentagelabel:".budget__expenses--percentage",
    container:'.container',
    expensesperclabel:".item__percentage"
    ,datelabel:".budget__title--month"
}

  var  formatnumber= function (num, type) {
        var numsplit, int, dec;



        num = Math.abs(num)
        num =num.toFixed(2)
        numsplit = num.split('.')
        int = numsplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length)

        }
        dec = numsplit[1];
        type == 'exp' ? sign = '-' : sign = '+';
        return sign + ' ' + int +'.'+ dec



    }


    var nodelistforeach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    }  

  return {
      getinput:function(){
          return {
               type : document.querySelector(domstrings.inputtype).value,
               description : document.querySelector(domstrings.inputdescription).value,
               value : parseFloat(document.querySelector(domstrings.inputvalue).value)
          }
        },

        addlistitem:function(obj,type)
        {var html,newhtml,element;

            if (type === "inc") {
                element=domstrings.incomecontainer;
                html = "<div class='item clearfix' id='inc-%id%'><div class='item__description'>%des.value%</div><div class='right clearfix'><div class='item__value'> %addvalue.value%</div><div class='item__delete'><button class='item__delete--btn'><i class='ion-ios-close-outline'></i></button></div></div></div>"
            }
            else if(type==="exp") {
            element=domstrings.expensescontainer;
               html= "<div class='item clearfix' id='exp-%id%' ><div class='item__description'>%des.value%</div><div class='right clearfix'><div class='item__value'> %addvalue.value%</div><div class='item__percentage'>21%</div><div class='item__delete'><button class='item__delete--btn'><i class='ion-ios-close-outline'></i></button></div></div></div >"
            }
        
        newhtml=html.replace('%id%',obj.id)
        newhtml=newhtml.replace("%des.value%",obj.description)
            newhtml = newhtml.replace("%addvalue.value%", formatnumber(obj.value,type))
        
        document.querySelector(element).insertAdjacentHTML('beforeend',newhtml)
        },
        deletelistitem:function(selectorid){
            document.getElementById(selectorid).parentNode.removeChild(document.getElementById(selectorid))


        },

        clearfield:function(){
            var fields=document.querySelectorAll(domstrings.inputdescription + ',' + domstrings.inputvalue)
            var fieldsarr=Array.prototype.slice.call(fields);
            
            fieldsarr.forEach(function(current,index,arr){
                current.value = "";

            })
            fieldsarr[0].focus()

        }
        ,
        displaybudget:function(obj){
           obj.budget>0?type='inc':type='exp'
        document.querySelector(domstrings.budgetlabel).textContent=formatnumber(obj.budget,type);
        document.querySelector(domstrings.incomelabel).textContent=formatnumber(obj.totalinc,'inc')
            document.querySelector(domstrings.expenseslabel).textContent = formatnumber(obj.totalexp,'exp')
           
         if(obj.percentage>0)
         {
             document.querySelector(domstrings.percentagelabel).textContent = obj.percentage+'%'

         }
         else{
             document.querySelector(domstrings.percentagelabel).textContent = '---'

         }

        },

displaypercentages:function(percentage)
{
    var fields = document.querySelectorAll(domstrings.expensesperclabel);


nodelistforeach(fields,function(current,index){
    if(percentage[index]>0)
    {
    current.textContent=percentage[index] + '%';
    }
    else{
        current.textContent='---'
    }
})
},

displaymonth:function(){
    var now,year,month
     now=new Date();
     months=['jan','feb','march','apr','may','june','july','august','sep','oct','nov','dec']
     month=now.getMonth()
    year=now.getFullYear();
    document.querySelector(domstrings.datelabel).textContent=months[month]  + ' ' +year
}
,

changetype:function() {
    var fields = document.querySelectorAll(
        domstrings.inputtype + ',' +
        domstrings.inputdescription + ',' +
        domstrings.inputvalue)
        nodelistforeach(fields,function (curr) {
            curr.classList.toggle('red-focus')
        })

    document.querySelector(domstrings.inputbtn).classList.toggle('red')
    
}


,

  getdomstrings:function() {
        return domstrings;
    }
}

})()







var controller=(function(budgetctrl,uictrl){
    
var setupeventlistner =function(){

    var dom = uictrl.getdomstrings()

    document.querySelector(dom.inputbtn).addEventListener("click", ctrladditem)

    document.addEventListener("keypress", function (event) {
        if (event.keycode === 13 || event.which === 13) {
            ctrladditem()
        }
    })

    document.querySelector(dom.container).addEventListener('click',ctrldeleteitem);

    document.querySelector(dom.inputtype).addEventListener('change',uictrl.changetype)

}
   var updatebudget=function(){

    budgetctrl.calculatebudget();

   var budget=budgetctrl.getbudget();
   
   uictrl.displaybudget(budget)

   

   }

   var updatepercentage=function(){

budgetctrl.calculatepercentages()
var percentages =budgetctrl.getpercentages();
uictrl.displaypercentages(percentages)

   }



    var ctrladditem=function(){
      
        var input=uictrl.getinput();
        if(input.description!=="" && !isNaN(input.value) && input.value>0 )
        {
       var newitem =  budgetctrl.additem(input.type,input.description,input.value)
           

       uictrl.addlistitem(newitem,input.type)

        uictrl.clearfield()

        updatebudget();

        updatepercentage();
        }
    }
   
     var ctrldeleteitem = function (event) {
         
         var itemid= event.target.parentNode.parentNode.parentNode.parentNode.id;
         
         if(itemid)
         {
          var  splitid=itemid.split('-')
          var type =splitid[0];
          var id=Number(splitid[1]);


          budgetctrl.deleteitem(type,id);
          uictrl.deletelistitem(itemid);
          updatebudget()
          updatepercentage();
         }
         
     }




   return {
       init:function(){
           uictrl.displaymonth()
           uictrl.displaybudget({
               budget: 0,
               totalinc: 0,
               totalexp: 0,
               percentage: -1}
           )
           setupeventlistner()
       }
   }
   

}
)(budgetcontroller,uicontroller);


controller.init();