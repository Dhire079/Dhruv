({
  account: function(component, event, helper) {
    var action = component.get("c.RequestType");

    action.setCallback(this, function(response) {
      var list = response.getReturnValue();
      component.set("v.picklistValues", list);
    });
    $A.enqueueAction(action);
  },
  closeModel: function(component, event, helper) {
    $A.get("e.force:closeQuickAction").fire();
  },
  launch: function(component, event, helper) {
    var action = component.get("c.getById");
    action.setParams({
      recId: component.get("v.recordId"),
      reqType: component.get("v.req")
    });
    action.setCallback(this, function(response) {
      var res = response.getReturnValue();
      window.open(res);
      $A.get("e.force:closeQuickAction").fire();
      $A.get("e.force:refreshView").fire();
    });
    $A.enqueueAction(action);
  }
});
