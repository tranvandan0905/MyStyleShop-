import instance from "./customize-axios";
const postcontacts =async(data)=>{
    try{

        const response=await  instance.post('/api/contacts',data)
  return response;
    }catch(error)
    {
        return error;
    }
}
export {postcontacts};