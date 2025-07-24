export const initialStore=()=>{
  return{
    baseUrl: "https://playground.4geeks.com/contact/",
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'GET_AGENDA_BY_USER':
      return {
        ...store,
        agenda: action.payload
      }
    }

    case 'ADD_CONTACT':
      return {
        ...store,
        contacts: action.payload
      }

    case 'EDIT_CONTACT':
      return {
        ...store,
        contacts: action.payload
      }

      case 'DELETE_CONTACT':
      return {
        ...store,
        contacts: action.payload
      }
  }
}
