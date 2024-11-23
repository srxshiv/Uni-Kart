import axios from 'axios';
import React from 'react';
import { base_url } from '../../App';

function CreateListing() {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('Misc');
    const [negotiable, setNegotiable] = React.useState(false);
    const [error, setError] = React.useState('');
    const token = localStorage.getItem('unikart-auth');

    const submitListing = async () => {
        if (!name || !description || !price) {
            setError('All fields except negotiable are required');
            return;
        }
        
        const body = { name, description, price, category, negotiable };
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const response = await axios.post(`${base_url}/seller/create-listing`, body, config);
            if (response.status === 200) {
                console.log(response.data.message);
                setName('');
                setDescription('');
                setPrice('');
                setCategory('Misc');
                setNegotiable(false);
                setError('');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-zinc-900 text-center mb-8">
                        Create Listing
                    </h2>
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Listing Name"
                            className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                        />
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                        >
                            <option value="Electronics">Electronics</option>
                            <option value="Books">Books</option>
                            <option value="Stationary">Stationary</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Misc">Misc</option>
                        </select>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={negotiable}
                                onChange={(e) => setNegotiable(e.target.checked)}
                                className="w-4 h-4 text-indigo-600 border-zinc-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-zinc-700">Price is negotiable</span>
                        </label>
                        <button
                            onClick={submitListing}
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                        >
                            Create Listing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateListing;