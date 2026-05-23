function validateExpense(data){

const {amount,category} = data;

if(!amount || amount <= 0){
throw new Error("Invalid amount")
}

if(!category){
throw new Error("Category required")
}

}

module.exports = validateExpense;