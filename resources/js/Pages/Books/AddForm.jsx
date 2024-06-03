import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

function AddForm(){
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        author: '',
        rate: '',
        review: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('books.store'), { onSuccess: () => reset() });
    };

    return (
        <>
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
                
                <PrimaryButton className="mt-4" disabled={processing}>Post</PrimaryButton>
            </form>
        </>
    )
}

export default AddForm