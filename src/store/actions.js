
import types from "./type.js"

var actions={
	change:({commit},item) => {
    commit(types.CHANGE,item);
	},
	upload:({commit},account) => {
		commit(types.ADD,account)
	}
}



export default actions;