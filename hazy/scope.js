Hazy.extend(Hazy.scope, {
    "data": {},
    "initScope": function(scopeId) {
        this.data[scopeId] = {};
    },
    "setScope":function(scopeId,key,value){
        this.data[scopeId][key]=value;
    },
    "getScope":function(scopeId,key){
        return this.data[scopeId][key];
    }
});
