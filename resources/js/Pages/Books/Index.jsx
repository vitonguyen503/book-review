import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Book from '@/Components/Book';
import { Head } from '@inertiajs/react';
import AddForm from './AddForm';
import SecondaryButton from '@/Components/SecondaryButton';
 
export default function Index({ auth, books }) {
    // const { data, setData, post, processing, reset, errors } = useForm({
    //     name: '',
    //     author: '',
    //     rate: '',
    //     review: ''
    // });

    const [show, setShow] = useState(false)
    const [buttonText, setButtonText] = useState("Add")
 
    // const submit = (e) => {
    //     e.preventDefault();
    //     post(route('books.store'), { onSuccess: () => reset() });
    // };

    useEffect(() => {
        !show ? setButtonText("Add") : setButtonText("Cancel")
    }, [show])
 
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Books" />
 
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <button className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-950 border border-gray-300 rounded-md font-semibold text-xs text-white uppercase tracking-widest shadow-sm hover:bg-indigo-900 hover:text-gray-50 focus:outline-none focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150" onClick={() => setShow(!show)}>{buttonText}</button>
                {show && <AddForm />}
                {/* <h1>Add new review</h1> */}
                {/* <form onSubmit={submit}>
                    <input
                        value={data.name}
                        placeholder="Book name"
                        className="block w-full border-gray-300 my-4 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('name', e.target.value)}
                    ></input>
                    <InputError message={errors.name} className="mt-2" />


                    <input
                        value={data.author}
                        placeholder="Author"
                        className="block w-full border-gray-300 my-4 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('author', e.target.value)}
                    ></input>
                    <InputError message={errors.author} className="mt-2" />

                    <input
                        value={data.rate}
                        placeholder="Rate"
                        className="block w-full border-gray-300 my-4 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('rate', e.target.value)}
                        type='number'
                        min={0}
                        max={5}
                    ></input>
                    <InputError message={errors.rate} className="mt-2" />

                    <textarea
                        value={data.review}
                        placeholder="Review"
                        className="block w-full border-gray-300 my-4 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('review', e.target.value)}
                    ></textarea>
                    
                    <PrimaryButton className="mt-4" disabled={processing}>Post</PrimaryButton>
                </form> */}

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y-8">
                    {books.map(book =>
                        <Book key={book.id} book={book} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}