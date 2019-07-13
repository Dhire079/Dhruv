public with sharing class AccountSyncController { 
  
    @AuraEnabled(cacheable = true)  
   public static List<Account> getAccountsList(Integer pagenumber, Integer numberOfRecords, Integer pageSize, String searchString) {  
    // fetch accounts similar to search key
     String searchKey = '%' + searchString + '%';  
     String query = 'select id, Name from Account ';  
     if (!String.isBlank(searchString) {  
       query += ' where name like \'%' + searchString + '%\' ';  
     }  
     query += ' limit ' + pageSize + ' offset ' + (pageSize * (pagenumber - 1));  
     return Database.query(query);  
   }  

   @AuraEnabled(cacheable = true)  
   public static Integer getAccountsCount(String searchString) {  
    // search key account count
     String query = 'select count() from Account ';  
     if (!String.isBlank(searchString) {  
       query += ' where name like \'%' + searchString + '%\' ';  
     }  
     return Database.countQuery(query);  
   } 

 @AuraEnabled
public static Map<String, String> getAccountFields() {
  // return dynamic list of account fields
    Map<String, String> retVal = new Map<String, String>();
    Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get('Account').getDescribe().fields.getMap();
    system.debug(fieldMap);
    for (String fieldName: fieldMap.keySet()) { 
        retVal.put(fieldName, fieldMap.get(fieldName).getDescribe().getLabel());
    }
    return retVal;
}
}