import { LightningElement, track, api } from 'lwc';  
 import getAccountsList from '@salesforce/apex/AccountSyncController.getAccountsList';  
 import getAccountsCount from '@salesforce/apex/AccountSyncController.getAccountsCount'; 
 export default class accountSync extends LightningElement {  
   @track accounts;  
   @track button;
   @track names=[];
   @track error;  
   @api currentpage;  
   @api pagesize;  
   @track checkStatus=[];
   @track accountId=[];
   @track searchKey;  
   @track records=[];
   totalpages;  
   localCurrentPage = null;  
   isSearchChangeExecuted = false; 
   

     /*eslint no-console: 0*/
     /*eslint vars-on-top: 0*/
     /*eslint no-else-return: 0*/
      /*eslint consistent-return: 0*/
      /*eslint getter-return: 0*/
      
      handleAll() // select all logic
      {
        var g =this.template.querySelector('input');
        var a = this.template.querySelectorAll('input');
        
        {
       for( var b = 0; b < a.length; b++){ 
        for( var c = 0; c < this.accounts.length; c++)
        {

          if(a[b].name===this.accounts[c].Id){
            if(g.checked===true)
            {
            a[b].checked=true;
            this.accountId.push(a[b].name);
            }
            if(g.checked===false)
            {
              a[b].checked=false;
              for( var i = 0; i < this.accountId.length; i++){ 
                if ( this.accountId[i] === a[b].name) {
                  this.accountId.splice(i, 1); 
                }
            }
          }
       }
      }
    }
      }
    }

  updateList() // keeping track of individually selected checkboxes logic
    {
      this.template.querySelector('input[name=options]').checked=false;
      console.log('inbois');
      var a = this.template.querySelectorAll('input');
       for( var b = 0; b < a.length; b++){ 
         
         for(var i=0;i<this.accountId.length;i++){
        if(a[b].name===this.accountId[i])
        {
          a[b].checked=true;

        }
       }
      }
    }

 handleClick(event) // push or pull info of selected account
 {
  
   if(event.target.checked===true)
   {
    this.accountId.push(event.target.name);

   }
   if(event.target.checked===false)
   {
    for( var i = 0; i < this.accountId.length; i++){ 
      if ( this.accountId[i] === event.target.name) {
        this.accountId.splice(i, 1); 
      }
   }
   }
 }
 

   handleKeyChange(event) {   // search dialog box key
     if (this.searchKey !== event.target.value) {  
       this.isSearchChangeExecuted = false;  
       this.searchKey = event.target.value;  
       this.currentpage = 1;  
     }  
   }  

   renderedCallback() {  
     //To keep the selected checkboxes on page turn or search
     this.updateList();
       // This line added to avoid duplicate/multiple executions of this code.

     if (this.isSearchChangeExecuted && (this.localCurrentPage === this.currentpage)) {  
       return;  
     }  
     this.isSearchChangeExecuted = true;  
     this.localCurrentPage = this.currentpage;  
     getAccountsCount({ searchString: this.searchKey })  //retrieve the accounts for the current page
       .then(recordsCount => {  
         this.totalrecords = recordsCount;  
         if (recordsCount !== 0 && !isNaN(recordsCount)) {  
           this.totalpages = Math.ceil(recordsCount / this.pagesize);  
           getAccountsList({ pagenumber: this.currentpage, numberOfRecords: recordsCount, pageSize: this.pagesize, searchString: this.searchKey })  
             .then(accountList => {  
               this.accounts = accountList;  
               this.error = undefined;  
             })  
             .catch(error => {  //error handling
               this.error = error;  
               this.accounts = undefined;  
             });  
         } else {  
           this.accounts = [];  
           this.totalpages = 1;  
           this.totalrecords = 0;  
         }  
         const event = new CustomEvent('recordsload', {  
           detail: recordsCount  
         });  
         this.dispatchEvent(event);  
       })  
       .catch(error => {  
         this.error = error;  
         this.totalrecords = undefined;  
       });  

   }
}
