public without sharing class FIS_SSO_tokenHandler 
{
    @AuraEnabled
    public static List<String> RequestType()
    {
        List<String> req = new List<String>();
        for(Case_Type__c c : [SELECT Name FROM Case_Type__c])
            {
                req.add(c.Name);
            }
            return req;
    }

    @AuraEnabled
    public static String getById(string recId,String reqType)
    {
        
        String reqTypeID = [SELECT Request_Type_ID__c FROM Case_Type__c WHERE Name =: reqType].Request_Type_ID__c;
        String UserID = 'A360FISTest';
        String AppID = 'webcsr';
        DateTime dt = DateTime.now();
        Long UTCTimestamp = dt.getTime();
        String ip = Auth.SessionManagement.getCurrentSession().get('SourceIp');
        
        String CIF = [SELECT CIF__c FROM Account WHERE Id =: recId Limit 1].CIF__c;
        
        String EOF = '^^^^';
        String Delimiter = '||||';
        String SharedSecret = '-852fdxt8:38cb4w378s9:-9000';
        Xmlstreamwriter xmlW = new Xmlstreamwriter();
        xmlW.writeStartDocument('utf-8','1.0');
        xmlW.writeStartElement(null,'SSORequest',null);
        xmlW.writeStartElement(null,'Type',null);
        xmlW.writeCharacters(reqTypeID);
        xmlW.writeEndElement(); 
        xmlW.writeStartElement(null,'CreatedDate',null);
        xmlW.writeCharacters('1536960421');
        xmlW.writeEndElement();  
        xmlW.writeStartElement(null,'CreatedFrom',null);
        xmlW.writeCharacters(ip);
        xmlW.writeEndElement(); 
        xmlW.writeStartElement(null,'Attributes',null);
        xmlW.writeStartElement(null,'Attribute',null);
        xmlW.writeStartElement(null,'Name',null);
        xmlW.writeCharacters('Bank ID');
        xmlW.writeEndElement(); 
        xmlW.writeStartElement(null,'Value',null);
        xmlW.writeCharacters('DEMO');
        xmlW.writeEndElement();  
        xmlW.writeEndElement();  
        xmlW.writeStartElement(null,'Attribute',null);
        xmlW.writeStartElement(null,'Name',null);
        xmlW.writeCharacters('CIF');
        xmlW.writeEndElement(); 
        xmlW.writeStartElement(null,'Value',null);
        xmlW.writeCharacters(CIF);
        xmlW.writeEndElement();  
        xmlW.writeEndElement();  
        xmlW.writeStartElement(null,'Attribute',null);
        xmlW.writeStartElement(null,'Name',null);
        xmlW.writeCharacters('Account Number');
        xmlW.writeEndElement();  
        xmlW.writeStartElement(null,'Value',null);
        xmlW.writeCharacters('600000000221');
        xmlW.writeEndElement();  
        xmlW.writeEndElement();  
        xmlW.writeStartElement(null,'Attribute',null);
        xmlW.writeStartElement(null,'Name',null);
        xmlW.writeCharacters('First Name');
        xmlW.writeEndElement(); 
        xmlW.writeStartElement(null,'Value',null);
        xmlW.writeCharacters('JOHN');
        xmlW.writeEndElement();  
        xmlW.writeEndElement(); 
        xmlW.writeStartElement(null,'Attribute',null);
        xmlW.writeStartElement(null,'Name',null);
        xmlW.writeCharacters('Last Name');
        xmlW.writeEndElement();  
        xmlW.writeStartElement(null,'Value',null);
        xmlW.writeCharacters('ODonnel');
        xmlW.writeEndElement();  
        xmlW.writeEndElement(); 
        xmlW.writeStartElement(null,'Attribute',null);
        xmlW.writeStartElement(null,'Name',null);
        xmlW.writeCharacters('Street Address');
        xmlW.writeEndElement();  
        xmlW.writeStartElement(null,'Value',null);
        xmlW.writeCharacters('100 Campus Dr');
        xmlW.writeEndElement();  
        xmlW.writeEndElement(); 
        xmlW.writeStartElement(null,'Attribute',null);
        xmlW.writeStartElement(null,'Name',null);
        xmlW.writeCharacters('City');
        xmlW.writeEndElement();  
        xmlW.writeStartElement(null,'Value',null);
        xmlW.writeCharacters('Horsham');
        xmlW.writeEndElement();
        xmlW.writeEndElement();
        xmlW.writeStartElement(null,'Attribute',null);
        xmlW.writeStartElement(null,'Name',null);
        xmlW.writeCharacters('State');
        xmlW.writeEndElement();  
        xmlW.writeStartElement(null,'Value',null);
        xmlW.writeCharacters('PA');
        xmlW.writeEndElement(); 
        xmlW.writeEndElement(); 
        xmlW.writeStartElement(null,'Attribute',null);
        xmlW.writeStartElement(null,'Name',null);
        xmlW.writeCharacters('Zip Code');
        xmlW.writeEndElement();  
        xmlW.writeStartElement(null,'Value',null);
        xmlW.writeCharacters('19044');
        xmlW.writeEndElement();  
        xmlW.writeEndElement();  
        xmlW.writeEndElement(); 
        xmlW.writeEndElement(); 
        xmlW.writeEndDocument(); 
        String xmlStringxmlRes = xmlW.getXmlString();
        String SSORequest = xmlStringxmlRes.Substring(xmlStringxmlRes.IndexOf('<SSOReques'));
        String EncodedSSORequest = SSORequest.escapeHtml4();
        String FinalSSORequest = 'SSORequest:'+EncodedSSORequest;
        String HashBeforeBlob = UserID+AppID+UTCTimestamp+Delimiter+FinalSSORequest+EOF+SharedSecret;
        Blob targetBlob = Blob.valueOf(HashBeforeBlob);
        Blob digest = Crypto.generateDigest('SHA-512', targetBlob);
        String HashAfterBlobdigest = EncodingUtil.base64Encode(digest);
        String URLEndPoint = UserID+Delimiter+AppID+Delimiter+UTCTimestamp+Delimiter+HashAfterBlobdigest+Delimiter+FinalSSORequest+EOF;
        String EncodedURLEndPoint = EncodingUtil.base64Encode(Blob.valueof(URLEndPoint));
     
       if(EncodedURLEndPoint!= null)
        {
            String URLlink = 'https://bambuticketing-test.fisglobal.com/BMBUAT-SSO/SSOHandler.ashx?external=true&ssotoken='+EncodedURLEndPoint;
            return URLlink;
        }
        return null;
        
    }  
  
}