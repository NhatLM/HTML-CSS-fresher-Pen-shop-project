// JavaScript Document
function changeImg(x)
{
   	var src=document.getElementById("bigImg");
	src.src=x;
}

function findName(findname)
{
  var x=window.localStorage.getItem("count");
	if(x!=null)
	{
	   for(var i=1;i<=x;i++)
	   {
		  var v=window.localStorage.getItem(i);
		  if(v!=null)
		  {
			  var temp=v.split(",");
			  if(temp[0]==findname)
			   return i;
		  } 
	   }
	}
	return -1;	
}

function addToCart()
{
   var name=document.getElementById("ItemName").innerHTML;
   var pic=document.getElementById("ItemImg");
   var src=pic.src;
   src=src.substring(src.lastIndexOf("/")+1)
   var price=document.getElementById("ItemPrice").innerHTML;
   var kq=findName(name);
	if(kq==-1)//can't find this item
	{
		var c=window.localStorage.getItem("count");
		c++;
		window.localStorage.setItem(c,name+","+src+","+price+","+1);
		window.localStorage.setItem("count",c);
	}
	else
	{
	   var v=window.localStorage.getItem(kq);
	   if(v!=null)
	   {
		  var temp=v.split(",");//cut->array{name,pic,price,quantity}  
		  temp[3]=parseInt(temp[3])+1;
		  //put item to storage
		  window.localStorage.setItem(kq,temp[0]+","+temp[1]+","+temp[2]+","+temp[3]);
	   }
	}	
}

function setcount()
{
	var c=window.localStorage.getItem("count");
	if(c==null)
	{
	   window.localStorage.setItem("count",0);	
	}
}

function showCart()
{
	var totalmoney=0;
	var s="<table>";
	s=s+"<tr>";
	s=s+"<th>NAME</th>";
	s=s+"<th>PICTURE</th>";
	s=s+"<th>PRICE</th>";
	s=s+"<th>QUANTITY</th>";
	s=s+"<th>DELETE</th>";
	s=s+"</tr>"
	
	var c=window.localStorage.getItem("count");
	if(c!=null)
	{
	   for(var i=1;i<=c;i++)
	   {
		  var v=window.localStorage.getItem(i);
		  if(v!=null)
		  {
			 var temp=v.split(",");
			 
			 s=s+ "<tr>"
			 s=s+ "<td>" + temp[0]+"</td>";//name
			 s=s+ "<td><img src='"+temp[1]+"'></td>";//pic
			 s=s+ "<td>"+temp[2]+"</td>";//price
			 s=s+ "<td><input type='number' value='"+temp[3]+"' min='1' onchange='quantity("+i+",this)'></td>";//quantity
			 s=s+ "<td><input type='button' value='delete' onclick='deleteItem("+i+")'></td>";
			 s=s+ "</tr>";
			 temp[2]=temp[2].substring(temp[2].lastIndexOf("$")+1);
			 totalmoney=totalmoney+temp[3]*temp[2];  
		  }
	   }
	   s=s+"</table>";
	   s=s+"<p>total: $"+totalmoney+"</p>";
	   
	   var div=document.getElementById("description");
	   div.innerHTML=s;
	}
}

function quantity(i,control)//the input
{
	var v=window.localStorage.getItem(i);
	if(v!=null)
	{
		var temp=v.split(",");
		temp[3]=control.value;
		window.localStorage.setItem(i,temp[0]+","+temp[1]+","+temp[2]+","+temp[3]);
		showCart();
	}
}

function deleteItem(i)
{
   var Check=window.confirm("You are about to delete the item. Are you sure?");
   if(Check==true)
   {
	  window.localStorage.removeItem(i);
	  showCart();   
   }
}

function check()
{
  var t1=document.getElementById("t1");
  var t2=document.getElementById("t2");
  if(t1.value.length==0 || t2.value.length==0 
  || (t1.value.length!=0 && !t1.value.match("^[a-zA-Z ]+$"))
  || (t2.value.length!=0 && !t2.value.match("^[0-9]{10}$")))
  {
	 alert("Remember to check your name and your phone number must have 10 numbers");
	 return false;  
  }
  return true;
}

function done()
{
  if(check()==true)
  {
	  alert("Thank you. See you later");
	  window.localStorage.clear();
	  setcount();
	  window.open("mainpage1.html","main");
	  //hoac window.location.href="array2.html";
  }
}

function seemore()
{
  var div=document.getElementById("buyProducts");
  var height1=div.offsetHeight;
  var description=document.getElementById("description");
  var height2=description.offsetHeight;
  if(height2>height1)
   div.style.overflow="scroll";
}
