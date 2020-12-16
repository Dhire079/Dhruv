import { LightningElement,track,wire } from 'lwc';
import getFSCAccounts from '@salesforce/apex/FscAccountTableController.getFSCAccounts';
import filterFSCAccounts from '@salesforce/apex/FscAccountTableController.filterFSCAccounts';

import { ShowToastEvent } from 'lightning/platformShowToastEvent'

const columns = [
    { label: 'Account Name', fieldName: 'nameurl__c', sortable: 'true',type:'url',
    typeAttributes: {
        label: { fieldName: 'Name' }, target: '_blank', tooltip: { fieldName: 'Name' } 
    }},
    { label: 'Owner', fieldName: 'OwnerId', sortable: 'true', editable: true},
    { label: 'Phone', fieldName: 'Phone', editable: true},
    { label: 'Website', fieldName: 'Website' , editable: true},
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', editable: true }
];
    
    export default class FscAccountTable extends LightningElement {

    columns = columns;
    sortBy;
    sortDirection;
    accountsList;
    backupResponseFromWire;

    // Get accounts with indurty = 'financial services'
    @wire(getFSCAccounts, {})
    wiredAccounts(resp) {

        this.backupResponseFromWire = resp;
        const { data, error } = resp;
        if (data) 
        {
            console.log('Entered');
            console.log('Data '+data);
            this.accountsList = data;
            

        }
        else if(error)
        {
        this.showNotification("error","Error getting Account data", error );
        }
    }
        // Assign sorting direction and sorting field
        doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
        }

        // Sort based on direction chosen in the table and the field
        sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.accountsList));
        // Return the value stored in the field
        let keyValue = (a) => {
        return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1: -1;
        // sorting data
        parseData.sort((x, y) => {
        x = keyValue(x) ? keyValue(x) : ''; // handling null values
        y = keyValue(y) ? keyValue(y) : '';
        // sorting values based on direction
        return isReverse * ((x > y) - (y > x));
        });
        this.accountsList = parseData;
        }

        //Call apex method to filter accounts on the table based on user input -> account name
        filterAccounts(event)
        {
          filterFSCAccounts({searchKey : event.target.value}).then(accountList =>{this.accountsList = accountList});
        }


        // Show Toast Messages
        showNotification(variant, title, message) {
          const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
          });
          this.dispatchEvent(evt);
        }
}