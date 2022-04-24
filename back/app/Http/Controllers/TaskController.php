<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Task;
use App\Http\Resources\TaskResource;
use App\Http\Requests\TaskRequest;
use App\Http\Requests\PaginateRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TaskResource::collection(Task::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TaskRequest $request)
    {
        $createdTasks = Task::create($request->validated());

        return new TaskResource($createdTasks);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new TaskResource(Task::findOrfail($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return $task;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return response(null, \Illuminate\Http\Response::HTTP_NO_CONTENT);
    }

    /**
     * Display a paginated & filtered listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getPaginatedTasks(PaginateRequest $request)
    {
        if ($request->priority != '') {
            $task = Task::orderBy('created_at', $request->sortedBy)
                        ->whereJsonContains('marks', $request->marks)
                        ->where('priority', $request->priority)
                        ->skip($request->start)
                        ->take($request->count)
                        ->get();
        } else {
            $task = Task::orderBy('created_at', $request->sortedBy)
                        ->whereJsonContains('marks', $request->marks)
                        ->skip($request->start)
                        ->take($request->count)
                        ->get();
        }

        return TaskResource::collection($task);
    }
}
