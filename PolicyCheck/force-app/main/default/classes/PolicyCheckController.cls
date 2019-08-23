public with sharing class PolicyCheckController {

     @AuraEnabled(cacheable = true)
public static List<Policy_Check__c> fetchPolicies(){
       return [SELECT Id,First_Name__c,Last_Name__c,Product__c ,Effective_Date__c,Medicare_Number__c FROM Policy_Check__c WHERE CreatedDate = TODAY];
    }
      @AuraEnabled(cacheable = true)
public static List<InsurancePolicy> fetchPoliciesComp(){
    
       return [SELECT Id,Product__c , Date_Check__c,NameInsured.FirstName,NameInsured.LastName,NameInsured.Medicare_Number__c FROM InsurancePolicy ];
    }
 
}
