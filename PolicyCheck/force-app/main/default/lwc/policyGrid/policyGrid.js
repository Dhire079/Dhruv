import {
    LightningElement,
    track,wire
} from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fetchPolicies from '@salesforce/apex/PolicyCheckController.fetchPolicies';
import fetchPoliciesComp from '@salesforce/apex/PolicyCheckController.fetchPoliciesComp';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import {updateRecord} from 'lightning/uiRecordApi';
import ID_FIELD from '@salesforce/schema/Policy_Check__c.Id';
import CHECK_FIELD from '@salesforce/schema/Policy_Check__c.Check_Passed__c';
const columns = [{
    label: 'View',
    type: 'button-icon',
    initialWidth: 75,
    typeAttributes: {
        iconName: 'action:preview',
        title: 'Preview',
        variant: 'border-filled',
        alternativeText: 'View'
    }
},
{
    label: 'Check ID',
    fieldName: 'Id'
},
{
    label: 'First Name',
    fieldName: 'First_Name__c'
},
{
    label: 'Last Name',
    fieldName: 'Last_Name__c'
},
{
    label: 'Product',
    fieldName: 'Product__c'
},
{
    label: 'Effective Date',
    fieldName: 'Effective_Date__c'
},
{
    label: 'Medicare Number',
    fieldName: 'Medicare_Number__c'
}];

export default class PolicyGrid extends NavigationMixin(LightningElement) {
 
@track columns = columns;
@track record = {};
@track rowOffset = 0;
@track data = {};
@track bShowModal = false;
@track name;
@track parameters;
@track error;
@track counter=0;
@track tr=true;
@track selected=[];
@track polcomp = fetchPoliciesComp().then(pol=>{this.polcomp=pol;});
_wiredResult;

    @wire(fetchPolicies)
    wiredCallback(result) {
        this._wiredResult = result;
        if (result.data) {
            this.parameters = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.parameters = undefined;
        }
    }
/*eslint no-console: 0*/
/*eslint no-return-assign: 0*/
/*eslint no-alert: 0*/
/*eslint vars-on-top: 0*/
/*eslint guard-for-in: 0*/
/*eslint eqeqeq: 0*/


// in order to refresh your data, execute this function:
    refreshData() {
        return refreshApex(this._wiredResult);
    }
    connectedCallback() {
     
        this.accountHomePageRef = {
            type: "standard__webPage",
            attributes: {
                url:'https://kingdominsurancegroup.lightning.force.com/lightning/r/Report/00O1U000007JF4nUAG/view',
                actionName:'refresh' }
        };
      
    }
getSelectedRows(event)
{
    this.counter++;
    const selectedRows = event.detail.selectedRows;
   
    var opt=[];
    for (let i = 0; i < selectedRows.length; i++){
        opt.push({id:selectedRows[i].Id,first:selectedRows[i].First_Name__c,last:selectedRows[i].Last_Name__c,product:selectedRows[i].Product__c,date:selectedRows[i].Effective_Date__c,medicare:selectedRows[i].Medicare_Number__c});

    }
    this.selected=opt;
    
}
handleRowAction(event) {
    console.log('we init');
    const row = event.detail.row;
    this.record = row;
    this.bShowModal = true;
}

closeModal() {
    this.bShowModal = false;
}

redirect(evt){
    if(this.counter>0)
    {
    var list=[];
    var fields={};
    console.log('Entered redirect');
for(var z=0;z<this.polcomp.length;z++)
{console.log('entered first loop');
    for(var k=0;k<this.selected.length;k++)
    {
        console.log('product='+this.polcomp[z].Product__c+' '+this.selected[k].product);
        console.log('first name='+this.polcomp[z].NameInsured.FirstName+' '+this.selected[k].first);
        console.log('last name ='+this.polcomp[z].NameInsured.LastName+' '+this.selected[k].last);
        console.log('medicare number='+this.polcomp[z].NameInsured.Medicare_Number__c+' '+this.selected[k].medicare);
        console.log('effective ='+this.polcomp[z].Date_Check__c+' '+this.selected[k].date);
        console.log(this.polcomp[z].Product__c==this.selected[k].product);
        console.log(this.polcomp[z].NameInsured.FirstName==this.selected[k].first);
        console.log(this.polcomp[z].NameInsured.LastName==this.selected[k].last);
        console.log(this.polcomp[z].NameInsured.Medicare_Number__c==this.selected[k].medicare);
        console.log(this.polcomp[z].Date_Check__c===this.selected[k].date);

        if(this.polcomp[z].Product__c==this.selected[k].product&& this.polcomp[z].NameInsured.FirstName==this.selected[k].first&&this.polcomp[z].NameInsured.LastName==this.selected[k].last&&this.polcomp[z].NameInsured.Medicare_Number__c==this.selected[k].medicare&&this.polcomp[z].Date_Check__c==this.selected[k].date)
        {
           fields[ID_FIELD.fieldApiName]=this.selected[k].id;
           fields[CHECK_FIELD.fieldApiName]=this.tr;
            list={fields};
            updateRecord(list);
        }
    }
    
}


    evt.preventDefault();
    evt.stopPropagation();
    this[NavigationMixin.Navigate](this.accountHomePageRef);
    }
    if(this.counter==0)
    {
        const evt1 = new ShowToastEvent({
            title: "Error",
            message: "A minimum of one check should be selected",
            variant: "error"
        });
        this.dispatchEvent(evt1);   
    }
}


    
    handleSubmit(event) {
        
        event.preventDefault();
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
       
    }
    



    handleSuccess(event) {
        this.refreshData();
        const evt = new ShowToastEvent({
            title: "PolicyCheck created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.recordId = event.detail.id;
        this.dispatchEvent(evt);
        this.template.querySelectorAll('lightning-input-field').forEach(each => {
            each.value = '';
          

        });
       
    }
   
}