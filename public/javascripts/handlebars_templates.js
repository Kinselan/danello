this["JST"] = this["JST"] || {};

this["JST"]["card"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression;

  return "<input type='text' value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.card : depth0)) != null ? stack1.title : stack1), depth0))
    + "\"></input><h2>in list <span class=\"highlight\">"
    + alias2(((helper = (helper = helpers.list_name || (depth0 != null ? depth0.list_name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"list_name","hash":{},"data":data}) : helper)))
    + "</span></h2><div class='cardInfo'><textarea readonly>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.card : depth0)) != null ? stack1.desc : stack1), depth0))
    + "</textarea></div><div class=\"alignRight\"><a class=\"editCardButton\" href=\"#\">Edit</a><a class=\"deleteCardButton\" href=\"#\">Delete</a><a class=\"saveButton\" href=\"#\">Save</a><a class=\"cancelButton\" href=\"#\">Cancel</a></div><i class=\"fa fa-times fa-lg\" aria-hidden=\"true\"></i>";
},"useData":true});

this["JST"]["list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "	<li class= \"card\" data-id=\""
    + alias4(((helper = (helper = helpers.cardId || (depth0 != null ? depth0.cardId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardId","hash":{},"data":data}) : helper)))
    + "\" data-desc=\""
    + alias4(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data}) : helper)))
    + "\"><input type=\"text\" readonly value=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></li>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<h1>"
    + alias4(((helper = (helper = helpers.list_name || (depth0 != null ? depth0.list_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list_name","hash":{},"data":data}) : helper)))
    + "</h1><ul class=\"cards\" list-id=\""
    + alias4(((helper = (helper = helpers.list_id || (depth0 != null ? depth0.list_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list_id","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.cards : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul><div list-id="
    + alias4(((helper = (helper = helpers.list_id || (depth0 != null ? depth0.list_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list_id","hash":{},"data":data}) : helper)))
    + "><div class=\"addCard\">Add a card...</div><div class=\"addCardForm\"><form autocomplete=\"off\"><textarea></textarea><a class='addCardButton'>Add</a><a class='cancelAddCardButton'>Cancel</a></form></div></div>";
},"useData":true});

this["JST"]["modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- <div class=\"modal\">	<input type='text' value=\"{title}\"></input>	<div class='cardInfo'>{details}</div>	<a class=\"button\" href=\"#\">Edit</a>	<a class=\"button delete\" href=\"#\">Delete</a></div> -->";
},"useData":true});