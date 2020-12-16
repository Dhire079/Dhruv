public  class FscAccountTableController 
{
    @AuraEnabled(Cacheable=true)
    public static List<Account> getFSCAccounts() 
    {
        return [SELECT Id,Name,OwnerId,Phone,Website,AnnualRevenue,nameurl__c from Account WHERE Industry = 'Financial Services'];
    }
}
