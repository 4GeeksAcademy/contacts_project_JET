import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const AddContacts = () => {

  const {store, dispatch} =useGlobalReducer()

    return (
        <div className="text-center mt-5">
            <h1>
                A simple test still
            </h1>
        </div>
    );
}; 