<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render("Books/Index", [
            'books' => Book::with('user:id,name')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'author' => 'required|string|max:100',
            'rate' => 'required|numeric',
            'review' => 'nullable'
        ]);

        $request->user()->books()->create($validated);

        return redirect(route('books.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        Gate::authorize('update', $book);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'author' => 'required|string|max:100',
            'rate' => 'required|numeric',
            'review' => 'nullable'
        ]);

        $book->update($validated);

        return redirect(route('books.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        Gate::authorize('delete', $book);

        $book->delete();

        return redirect(route('books.index'));
    }
}
