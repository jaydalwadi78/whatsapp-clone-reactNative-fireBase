const iState = {
    isLoading : false,
    contact_data : [],
    newcontact_data : [],
    dbcontact_data : [],
    status_data:[] ,
    newuser_data:[]
}
const userReducer = (state = iState, action) => {
//console.log("state in resss ",action.user_data)
//console.log("GGG=ffffffff========================",JSON.stringify(action));
/*console.log("AAAAAA",action.user_data);
console.log("BBBBBB",action.add_user_data);
console.log("CCCCCC",action.update_user_data);
console.log("DDDDDD",action.delete_user_data);*/
//console.log("FFFFFF",action.contact_data);
//console.log("HHHH",action.newcontact_data);

		switch(action.type) {
		        case 'FETCH_CONTACT':
		        return{
		        	...state,
		        	contact_data: action.contact_data,
		        }
		        case 'NEW_CONTACT':
	          	return {
		            ...state, 
		            newcontact_data: action.newcontact_data,
		        }; 	
		        case 'FETCH_DBCONTACT':
	          	return {
		            ...state, 
		            dbcontact_data: action.payload,
		        }; 	
                case 'Add_USER':
                return {
                    ...state,
                    newuser_data: action.payload,
                }
		        case 'FETCH_STATUS':
		           // console.log("qqqqqqqqqqq",action.payload);
		            return {
		                ...state,
		                status_data: action.payload,
		        }
				default:
				}
			return state;		
		}
export default userReducer;
