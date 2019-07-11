public with sharing class AccountSyncController {
    @AuraEnabled(cacheable = true)  
   public static List<Account> getAccountsList(Integer pagenumber, Integer numberOfRecords, Integer pageSize, String searchString) {  
     String searchKey = '%' + searchString + '%';  
     String query = 'select id, Name from Account ';  
     if (searchString != null && searchString != '') {  
       query += ' where name like \'%' + searchString + '%\' ';  
     }  
     query += ' limit ' + pageSize + ' offset ' + (pageSize * (pagenumber - 1));  
     return Database.query(query);  
   }  
   @AuraEnabled(cacheable = true)  
   public static Integer getAccountsCount(String searchString) {  
     String query = 'select count() from Account ';  
     if (searchString != null && searchString != '') {  
       query += ' where name like \'%' + searchString + '%\' ';  
     }  
     return Database.countQuery(query);  
   } 

 @AuraEnabled
public static Map<String, String> getAccountFields() {
    Map<String, String> retVal = new Map<String, String>();
    Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get('Account').getDescribe().fields.getMap();
    system.debug(fieldMap);
    for (String fieldName: fieldMap.keySet()) { 
      System.debug('How many'); 
        retVal.put(fieldName, fieldMap.get(fieldName).getDescribe().getLabel());
    }
    System.debug('return is '+retVal.values());
    return retVal;
}
@AuraEnabled
public static List<String> getAccountId(List<String>accountId) {

System.debug('dsfdsf'+accountId);
return accountId;
 } 
}