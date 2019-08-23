@isTest(SeeAllData=false)

private class PolicyCheckControllerTest {
    @isTest
   private static void returnPolicies()
   {
       Policy_Check__c test = new Policy_Check__c(First_Name__c='Dhruv',Last_Name__c='Iyengar',Product__c='MAPD' ,Effective_Date__c=Date.today(),Medicare_Number__c='12345');
       insert test;
       List<Policy_Check__c> testList = new List<Policy_Check__c>(PolicyCheckController.fetchPolicies());
       System.assertEquals(1,testList.size(),'List size is '+testList.size()+' but should be 1');
    }
    @isTest
    private static void returnInsurancePoliciesComparators()
    {
       Producer prod = new Producer(Name='Jose');
       insert prod;
       String prodid;
       List<Producer> prodIdl = new List<Producer>([SELECT Id FROM Producer WHERE Name='Jose']);
       for(Producer itr1 : prodIdl)
       {
           prodid = itr1.Id;
       }
       Account test = new Account(Name='Dhruv Iyengar',Medicare_Number__c='12345',Agent_Id__c='269830');
    
       insert test;
       List<Account> iterate = new List<Account>([SELECT Id,Agent_Id__c FROM Account WHERE FirstName='Dhruv']);
       String id;
       for(Account itr : iterate)
       {
           id=itr.Id;
       }
       InsurancePolicy testPol = new InsurancePolicy(Name='Test',NameInsuredId=id,EffectiveDate=Date.today(),Product__c='MAPD');
       insert testPol;
       List<InsurancePolicy> testListI = new List<InsurancePolicy>(PolicyCheckController.fetchPoliciesComp());
       System.assertEquals(1,testListI.size(),'List size is '+testListI.size()+' but should be 1');
    }
}
