import types from "./type.js"

var mutations = {
	[types.CHANGE](state,item){
    var defChannel=state.channels.default;
    var recomChannel=state.channels.recommendations;
    var placeChannel=state.channels.placeNews;
		if(item.type===0){
			let index=defChannel.indexOf(item);
			if(index!=-1){
				defChannel.splice(index,1);
				recomChannel.unshift(item);
			} else{
				recomChannel.splice(recomChannel.indexOf(item),1);
				defChannel.push(item);
			}
		}
		if(item.type==1){
			let index=defChannel.indexOf(item);
			if(index!=-1){
				defChannel.splice(index,1);
				placeChannel.unshift(item);
			} else{
				placeChannel.splice(placeChannel.indexOf(item),1);
				defChannel.push(item);
			}
		}
	},
	[types.ADD](state,account){
		var data=state.accounts;
		if(data.indexOf(account)===-1){
			data.push(account)
		}
	}
}

export default mutations;