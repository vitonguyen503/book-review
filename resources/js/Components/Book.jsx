import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useForm, usePage } from '@inertiajs/react';
import SecondaryButton from './SecondaryButton';

dayjs.extend(relativeTime);
 
function Book({ book }) {

    const { auth } = usePage().props;
 
    const [editing, setEditing] = useState(false);
 
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        name: book.name,
        author: book.author,
        rate: book.rate,
        review: book.review
    });
 
    const submit = (e) => {
        e.preventDefault();
        patch(route('books.update', book.id), { onSuccess: () => setEditing(false) });
    };

    return (
        <div className="p-6 flex space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="h-6 w-6 text-gray-600 -scale-x-100" stoke="currentColor" strokeWidth="2" viewBox="0 0 20 20" fill="none">
                <path opacity="0.5" d="M18.3307 9.9974C18.3307 14.5997 14.5997 18.3307 9.9974 18.3307C5.39502 18.3307 1.66406 14.5997 1.66406 9.9974C1.66406 5.39502 5.39502 1.66406 9.9974 1.66406C14.5997 1.66406 18.3307 5.39502 18.3307 9.9974Z" fill="#1C274C"/>
                <path d="M14.0071 15.8427C12.8678 16.6253 11.4881 17.0833 10.0013 17.0833C8.51455 17.0833 7.13483 16.6253 5.99547 15.8426C5.49226 15.4969 5.27721 14.8385 5.56979 14.3027C6.17631 13.1918 7.42608 12.5 10.0013 12.5C12.5766 12.5 13.8263 13.1919 14.4328 14.3027C14.7254 14.8385 14.5103 15.497 14.0071 15.8427Z" fill="#1C274C"/>
                <path d="M9.99997 10C11.3807 10 12.5 8.88075 12.5 7.5C12.5 6.11929 11.3807 5 9.99997 5C8.6193 5 7.5 6.11929 7.5 7.5C7.5 8.88075 8.6193 10 9.99997 10Z" fill="#1C274C"/>
            </svg>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-gray-800">{book.user.name}</span>
                        <small className="ml-2 text-sm text-gray-600">{dayjs(book.created_at).fromNow()}</small>
                        { book.created_at !== book.updated_at && <small className="text-sm text-gray-600"> &middot; edited</small>}
                    </div>
                    {book.user.id === auth.user.id &&
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                    Edit
                                </button>
                                <Dropdown.Link as="button" href={route('books.destroy', book.id)} method="delete">
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    }
                </div>
                <div className='mt-3'>
                {editing
                    ? 
                    <form onSubmit={submit}>
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
                                                
                        {/* <textarea value={data.message} onChange={e => setData('message', e.target.value)} className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea>
                        <InputError message={errors.message} className="mt-2" /> */}
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <SecondaryButton className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</SecondaryButton>
                        </div>
                    </form>
                    : 
                    <>
                        <div className="mb-4 flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" className=" text-blue-900 mr-4" viewBox="0 0 50 50" fill="none">
                            <path opacity="0.5" d="M24.9974 41.7256V37.5H16.6641V41.7256C16.6641 42.3029 16.6641 42.5917 16.8617 42.7083C17.0593 42.825 17.3295 42.6958 17.8701 42.4377L20.4581 41.2012C20.6409 41.114 20.7324 41.0704 20.8307 41.0704C20.9291 41.0704 21.0205 41.114 21.2034 41.2015L23.7914 42.4377C24.332 42.6958 24.6022 42.825 24.7997 42.7083C24.9974 42.5917 24.9974 42.3029 24.9974 41.7256Z" fill="#1C274D"/>
                            <path d="M16.6693 37.5H15.4734C13.2159 37.5 12.4266 37.5119 11.8218 37.6419C10.7522 37.8719 9.82241 38.3648 9.1445 39.0306C8.91587 39.2552 8.80158 39.3675 8.53793 40.0827C8.27429 40.7981 8.31604 41.1017 8.39954 41.7083C8.41429 41.8154 8.43014 41.92 8.44725 42.0221C8.67491 43.3808 9.09133 44.1004 9.73002 44.6129C10.3687 45.1254 11.2654 45.4596 12.9588 45.6423C14.7019 45.8304 17.0122 45.8333 20.3247 45.8333H29.5555C32.868 45.8333 35.1784 45.8304 36.9216 45.6423C38.6149 45.4596 39.5116 45.1254 40.1503 44.6129C40.7888 44.1004 41.2053 43.3808 41.433 42.0221C41.6243 40.8808 41.662 39.4367 41.6693 37.5H25.0026V41.7256C25.0026 42.3029 25.0026 42.5917 24.8049 42.7083C24.6074 42.825 24.3372 42.6958 23.7966 42.4377L21.2086 41.2015C21.0257 41.114 20.9343 41.0704 20.8359 41.0704C20.7376 41.0704 20.6461 41.114 20.4633 41.2012L17.8753 42.4377C17.3347 42.6958 17.0645 42.825 16.8669 42.7083C16.6693 42.5917 16.6693 42.3029 16.6693 41.7256V37.5Z" fill="#1C274D"/>
                            <path opacity="0.5" d="M9.8509 5.69181C10.4871 5.05021 11.3804 4.6319 13.0672 4.40319C14.8037 4.16775 17.1051 4.16406 20.4049 4.16406H29.6003C32.9001 4.16406 35.2016 4.16775 36.938 4.40319C38.6249 4.6319 39.518 5.05021 40.1543 5.69181C40.7905 6.33344 41.2053 7.23423 41.4322 8.93531C41.6655 10.6864 41.6693 13.0073 41.6693 16.3349V37.4974H15.4734C13.2159 37.4974 12.4266 37.5093 11.8218 37.6393C10.7522 37.8693 9.82242 38.3622 9.1445 39.028C8.91588 39.2526 8.80158 39.3649 8.53794 40.0801C8.38667 40.4905 8.33594 40.7655 8.33594 41.0397V16.3349C8.33594 13.0073 8.3396 10.6864 8.57306 8.93531C8.79985 7.23423 9.21467 6.33344 9.8509 5.69181Z" fill="#1C274D"/>
                            <path d="M15.1016 14.5859C15.1016 13.723 15.8011 13.0234 16.6641 13.0234H33.3307C34.1936 13.0234 34.8932 13.723 34.8932 14.5859C34.8932 15.4489 34.1936 16.1484 33.3307 16.1484H16.6641C15.8011 16.1484 15.1016 15.4489 15.1016 14.5859Z" fill="#1C274D"/>
                            <path d="M16.6641 20.3125C15.8011 20.3125 15.1016 21.0121 15.1016 21.875C15.1016 22.7379 15.8011 23.4375 16.6641 23.4375H27.0807C27.9436 23.4375 28.6432 22.7379 28.6432 21.875C28.6432 21.0121 27.9436 20.3125 27.0807 20.3125H16.6641Z" fill="#1C274D"/>
                        </svg>
                        <div>
                            <h2 className="text-2xl font-bold">{book.name}</h2>
                            <p className="text-gray-700 text-lg">Author: {book.author}</p>
                            <span className="text-gray-700 font-medium text-sm">Rate: {book.rate}/5</span>
                        </div>
                    </div>

                    <hr className="border-gray-300 mb-4" />
                    <div>
                        <p className="text-gray-700">{book.review}</p>
                    </div>
                    </>
                }   
                </div>
            </div>
        </div>
    );
}

export default Book