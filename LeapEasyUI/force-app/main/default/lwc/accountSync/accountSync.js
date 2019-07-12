import { LightningElement, track} from 'lwc';  

 import getAccountFields from '@salesforce/apex/AccountSyncController.getAccountFields';  
 export default class accountSync extends LightningElement {  
   @track _selected = [];
    @track maps=getAccountFields().then(map=>{this.maps=map;});
    @track partnerId=[];
    @track partners=['Hugh Jackman','Ryan Gosling'];

    /*eslint vars-on-top: 0*/
    /*eslint guard-for-in: 0*/
     /*eslint no-console: 0*/
     /*eslint no-alert: 0*/
       /*eslint no-constant-condition: 0*/

       handleAll() // check all logic
       {

         var g =this.template.querySelector('input');
         var a = this.template.querySelectorAll('input');
         {
        for( var b = 0; b < a.length; b++){ 
         for( var c = 0; c < this.partners.length; c++)
         {
 
           if(a[b].name===this.partners[c]){
             if(g.checked===true)
             {
             a[b].checked=true;
             this.partnerId.push(a[b].name);
             }
             if(g.checked===false)
             {
               a[b].checked=false;
               for( var i = 0; i < this.partnerId; i++){ 
                 if ( this.partnerId[i] === a[b].name) {
                   this.partner.splice(i, 1); 
                 }
             }
           }
        }
       }
     }
       }
     }
       
     handleClick(event) // push or pull info of selected account
       {
         if(event.target.checked===true)
         {
          this.partnerId.push(event.target.name);
         }
         if(event.target.checked===false)
         {
          for( var i = 0; i < this.partnerId.length; i++){ 
            if ( this.partnerId[i] === event.target.name) {
              this.partnerId.splice(i, 1); 
            }
         }
         }
      console.log('sdfsd'+this.partnerId);
       }

  get options(){ // fill the options of the duallistbox

    var opt = [];
        for(var k in this.maps)
        {
           opt.push({ value:k, label:this.maps[k]});
        }
        return opt;  
}

    handleChange(event) {  // handle moving options to selected side
    this._selected=event.detail.value;
    }
   
    updatePartners(){} // to be implemented
}
