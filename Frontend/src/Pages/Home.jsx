import React, { useContext, useRef,useState,useEffect } from 'react'
import UserContext from '../Context/UserContext';
import axios from 'axios';

const Home = () => {
    let expenseNameRef = useRef(); //{current:}
    let priceRef = useRef();
    let dateRef = useRef();

    let updatenameRef = useRef()
    let updatePriceRef = useRef()
    let updateDateRef = useRef()


    let ctx = useContext(UserContext);
    console.log(ctx)
    let id = ctx.userdata.user._id
    console.log(id)


    const handleSubmit = async(e)=>{
      e.preventDefault();
      let obj = {
        ExpenseName:expenseNameRef.current.value,
        Price:priceRef.current.value,
        Date:dateRef.current.value,
        Id:id
      }

      if(!obj.ExpenseName || !obj.Price || !obj.Date || !obj.Id){
        return alert('please fill all the fields')
      }
try {
  
  let res = await axios.post('http://localhost:8090/expense/create',obj)
  console.log(res)
  console.log(res.data)
  if(res.status==200 || res.status==201){
    alert(res.data.msg)
    getAllExpense()
    expenseNameRef.current.value = '';
    priceRef.current.value = '';
    dateRef.current.value = ''
  }
} catch (error) {
  console.log(error)
}
}

    const [Allexpenses, setAllexpenses] = useState([]);
    const getAllExpense = async()=>{
      let res = await axios.post(`http://localhost:8090/expense/get/${id}`)
      let data = res.data
      console.log(data)
      setAllexpenses(data.data)
 }
   
    useEffect(()=>{
      getAllExpense()
    },[])
    
   async function handleDelete(obj) {
    console.log(obj)
    let res=await axios.delete(`http://localhost:8090/expense/delete/${obj._id}`)
    let data=res.data
    console.log(data)
    alert(data.msg)
    getAllExpense()
   }

   const [showBox, setshowBox] = useState(null);

   const handleUpdate = (obj)=>{
     console.log(obj)
     setshowBox(obj)
   }
   const handleUpdateData = async()=>{
    let obj = {}
    if(updatenameRef.current.value){
      obj.ExpenseName = updatenameRef.current.value
    }
    if(updatePriceRef.current.value){
      obj.Price = updatePriceRef.current.value
    }
    if(updateDateRef.current.value){
      obj.Date = updateDateRef.current.value
    }

    console.log(obj)
    console.log(showBox)
    let res = await axios.put(`http://localhost:8090/expense/update/${showBox._id}`,obj)
    let data = res.data;
    console.log(data)
    setshowBox(null)
    getAllExpense()
  }


  return (
 
    <div>
    
      <form action="" className='flex gap-3  text-white m-auto my-4 w-max'>
        <input ref={expenseNameRef} className='border-2 border-amber-400 px-4 py-2 rounded-md text-white' type="text" placeholder='enter a expense name' />
        <input ref={priceRef} className='border-2 border-amber-400 px-4 py-2 rounded-md  text-white' type="number" placeholder='enter a price' />
        <input ref={dateRef} className='border-2 border-amber-400 px-4 py-2 rounded-md  text-white' type="date"  />
        <button onClick={handleSubmit} className='bg-amber-600 px-3 text-white py-2 rounded-md hover:bg-amber-400'>submit</button>
      </form>
      <table className='border-2 w-[70%] m-auto text-center'>
      <thead>
        <tr className='border-b-2'>
          <th className='p-4'>Sno</th>
          <th>Expense Name</th>
          <th>Price</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
       {
        Allexpenses.map((ele,i)=>{
          return  <tr className='border-b-2'>
          <td className='p-4'>{i+1}</td>
          <td>{ele.ExpenseName}</td>
          <td>{ele.Price}</td>
          <td>{ele.Date}</td>
          <td>
            <button onClick={()=>handleDelete(ele)} className='bg-red-950 px-4 py-2 rounded-md hover:bg-red-800 text-white'>Delete</button>
            <button onClick={()=>handleUpdate(ele)} className='bg-blue-950 ms-2 px-4 py-2 rounded-md hover:bg-blue-800 text-white'>Update</button>
            </td>
        
        </tr>
        })
       }
      </tbody>
    </table>
    { showBox && <div className='h-[300px] flex flex-col gap-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-5 bg-amber-900 text-white w-[300px]'>

<input ref={updatenameRef} className='px-4 py-2 rounded-2 border-2' type="text"  placeholder='enter name to update'/>
<input ref={updatePriceRef} className='px-4 py-2 rounded-2 border-2' type="number"  placeholder='enter price to update'/>
<input ref={updateDateRef} className='px-4 py-2 rounded-2 border-2' type="date"  placeholder='enter date to update'/>

<button onClick={handleUpdateData} className='bg-green-400 px-3 py-2 rounded-md'>update</button>


<button onClick={()=>setshowBox(null)} className='bg-green-400 text-black absolute right-0 top-0 rounded-md p-3'>X</button>
</div>
}


    </div>
  )
}

export default Home
