const validator=require("validator");

function validUser(data){
     
   
     const mandatoryField=["name","emailId","password"]
     const IsAllowed=mandatoryField.every((keys)=>Object.keys(data).includes(keys));
     
          if(!IsAllowed)
             throw new Error("Fields Missing");
     
          if(!validator.isEmail(data.emailId))
             throw new Error("Invalid Email");
         if(!validator.isStrongPassword(data.password))
             throw new Error("Weak Password");
         if(!(data.name.length>=3 && data.name.length<=20))
             throw new Error("Name should have atleast 3 char and atmost 20 char");

}

module.exports=validUser;