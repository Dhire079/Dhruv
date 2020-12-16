public  class FscAccountTableController 
{
    /**
    * Get all  Accounts with filter Industry = 'Financial Services'
     */
    @AuraEnabled(Cacheable=true)
    public static List<Account> getFSCAccounts() 
    {
        return [SELECT Id,Name,OwnerId,Phone,Website,AnnualRevenue,nameurl__c from Account WHERE Industry = 'Financial Services'];
    }

    /**
    * Get all  Accounts with filter Industry = 'Financial Services' and Name starting with the @param SearchKey returned from the component
     */
    @AuraEnabled(Cacheable=true)
    public static List<Account> filterFSCAccounts(String searchKey) 
    {
        system.debug('SearchKey '+searchKey);
        return [SELECT Id,Name,OwnerId,Phone,Website,AnnualRevenue,nameurl__c from Account WHERE Industry = 'Financial Services' AND Name LIKE: searchKey+'%'];
    }
}