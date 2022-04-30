<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
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
        return response()->json([
            "status" => true,
            "data" => TaskResource::collection(Task::all())
        ])->setStatusCode(200);
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
        $task = new Task;
        $task->name = $request->name;
        $task->priority = $request->priority;
        $task->marks = json_decode($request->marks);
        $task->description = $request->description;

        $task->save();

        return response()->json([
            "status" => true,
            "data" => new TaskResource($task)
        ])->setStatusCode(200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json([
            "status" => true,
            "data" => new TaskResource(Task::findOrfail($id))
        ])->setStatusCode(200);
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
    public function update(TaskRequest $request)
    {
        $task = Task::where('id', $request->id)->first();
        $task->name = $request->name;
        $task->priority = $request->priority;
        $task->marks = json_decode($request->marks);
        $task->description = $request->description;

        $task->save();

        return response()->json([
            "status" => true,
            "data" => new TaskResource($task)
        ])->setStatusCode(200);
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

        return response()->json([
            "status" => true,
            "data" => \Illuminate\Http\Response::HTTP_NO_CONTENT
        ])->setStatusCode(200);
    }

    /**
     * Display a paginated & filtered listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getPaginatedTasks(PaginateRequest $request)
    {
        if (count($request->priority) != 0) {
            $task = Task::orderBy('created_at', $request->sortedBy)
                        ->whereJsonContains('marks', $request->marks)
                        ->whereIn('priority', $request->priority)
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

        return response()->json([
            "status" => true,
            "data" => TaskResource::collection($task)
        ])->setStatusCode(200);
    }
}
