import React from "react"
import axios from "axios"
import { base_url } from '../../App'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";

function UpdateListing() {
    const params = useParams();
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("Misc");
    const [negotiable, setNegotiable] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
  
    const token = localStorage.getItem("unikart-auth");
  
    React.useEffect(() => {
      async function getListing() {
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const response = await axios.get(`${base_url}/user/listings/${params.id}`, config);
          if (response.status === 200) {
            setName(response.data.name || "");
            console.log(response.data)
            setDescription(response.data.description || "");
            setPrice(response.data.price || "");
            setCategory(response.data.category || "Misc");
            setNegotiable(response.data.negotiable || false);
          } else if (response.status === 404) {
            alert("Listing not found");
          }
        } catch (error) {
          console.error(error);
          setError("Failed to fetch the listing");
        } finally {
          setLoading(false);
        }
      }

      getListing();
    }, [params.id, token]);
  
    const submitListing = async (event) => {
      event.preventDefault();
      const body = { name, description, price, category, negotiable };
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.put(`${base_url}/seller/listings/${params.id}`, body, config);
  
        if (response.status === 200) {
          alert(response.data.message);
          console.log(response.data.message);
        } else {
          setError(response.data?.message || "Something went wrong");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      }
    };
  
    if (error) {
      return <div>{error}</div>;
    }
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <form onSubmit={submitListing}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
          <input
            type="checkbox"
            checked={negotiable} // Use `checked` instead of `value` for checkboxes
            onChange={(e) => setNegotiable(e.target.checked)}
          />
          Negotiable
          <CategorySelector category={category} handleCategory={setCategory} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  function CategorySelector(props) {
    return (
      <div>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            id="category"
            value={props.category}
            label="Category"
            onChange={(e) => props.handleCategory(e.target.value)}
          >
            <MenuItem value={"Electronics"}>Electronics</MenuItem>
            <MenuItem value={"Books"}>Books</MenuItem>
            <MenuItem value={"Stationary"}>Stationary</MenuItem>
            <MenuItem value={"Furniture"}>Furniture</MenuItem>
            <MenuItem value={"Misc"}>Misc</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
  
  export default UpdateListing;
  