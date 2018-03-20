let ValidatorRule = {
    isEmpty: (value,warnMsg)=>{
        if(value == ""){
            return warnMsg;
        }
    },
    minLength: (value,length,warnMsg)=>{
        if(value.length < length){
            return warnMsg;
        }
    },
    maxLength: (value,length,warnMsg)=>{
        if(value.length > length){
            return warnMsg;
        }
    },
    hasSpace: (value,warnMsg)=>{
        if(/\s/g.test(value)){
            return warnMsg;
        }
    }
}

export default class Validator{
    constructor(){
        this.valiRules = []
    }
    addRule(name,rules){
        let _this = this;
        let temp = [];
        for(let i=0,rule;rule=rules[i++];){
            ((rule)=>{
                let ruleArr = rule.rule.split(":"),
                ruleName = ruleArr.shift();
                ruleArr.unshift(null);
                ruleArr.push(rule.warnMsg);
                temp.push((value)=>{
                    ruleArr[0] = value;
                    return ValidatorRule[ruleName].apply(_this,ruleArr)
                })
            })(rule);
            this.valiRules[name] = temp;
        }
    }
    startValidate(name,value){
        for(let i=0,fn;fn=this.valiRules[name][i++];){
            let warnMsg = fn(value);
            if(warnMsg) return warnMsg;
        }
    }
}