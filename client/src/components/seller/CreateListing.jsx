import axios from 'axios'
import React from 'react'
import { base_url } from '../../App'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


function CreateListing(){
    const [name , setName] = React.useState('')
    const [description , setDescription] = React.useState('')
    // const [images , setImages] = React.useState('')
    const [price , setPrice] = React.useState('')
    const [category , setCategory] = React.useState('Misc')
    const [negotiable , setNegotiable] = React.useState(false)
    const [error , setError] = React.useState(false)

    const token = localStorage.getItem('unikart-auth')

    function handleName(event){
        return setName(event.target.value)
    }
    function handleDescription(event){
        return setDescription(event.target.value)
    }
    function handlePrice(event){
        return setPrice(event.target.value)
    }
    function handleCategory(event){
        return setCategory(event.target.value)
    }

    const submitListing = async ()=>{
        const body = {name , description , price ,category , negotiable}
            const config = {headers: {Authorization : `Bearer ${token}`}}
            if (!name || !description || !price) {
                setError('All fields except negotiable are required');
                return;
              }              
            const response = await axios.post(`${base_url}/seller/create-listing` , body , config )
            if(response.status===200){
                console.log(response.data.message)
                setName('')
                setDescription('')
                setPrice('')
                setCategory('')
                setNegotiable(false)
            }
            else{
                setError(err.response?.data?.message || 'Something went wrong');
            }
    } 

    if(error){
        return <div>
            {error}
        </div>
    }

    return <div>
        <form>
        <input
          type="text"
          value={name}
          onChange={handleName}
          placeholder="Name"
        />
        <input
          type="text"
          value={description}
          onChange={handleDescription}
          placeholder="Description"
        />
        <input
          type="text"
          value={price}
          onChange={handlePrice}
          placeholder="price"
        />
        <input
          type="checkbox"
          value={negotiable}
          onChange={(e)=>{ setNegotiable(e.target.checked)}}
          placeholder="Checkbox"
        />Negotiable
        <CategorySelector category = {category} handleCategory = {handleCategory}/>
        </form>
        <button type='submit' onClick={submitListing}>Submit</button>
    </div>
}

function CategorySelector(props){
    return <div>
    <FormControl fullWidth>
    <InputLabel>Category</InputLabel>
    <Select
      id="category"
      value={props.category}
      label="Category"
      onChange={props.handleCategory}
    >
      <MenuItem value={'Electronics'}>Electronics</MenuItem>
      <MenuItem value={'Books'}>Books</MenuItem>
      <MenuItem value={'Stationary'}>Stationary</MenuItem>
      <MenuItem value={'Furniture'}>furniture</MenuItem>
      <MenuItem value={'Misc'}>misc</MenuItem>
    </Select>
  </FormControl>
  </div>
}

export default CreateListing