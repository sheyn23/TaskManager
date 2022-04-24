<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($post) {
            $post->{$post->getKeyName()} = (string) Str::uuid();
        });
    }
    public function getIncrementing()
    {
        return false;
    }
    public function getKeyType()
    {
        return 'string';
    }

    // public $incrementing = false;

    protected $fillable = [
        'name',
        'description',
        'priority',
        'marks'
    ];

    protected $casts = [
        'id' => 'string',
        'marks' => 'array'
    ];

    protected $attributes = [
        'description' => '',
    ];
}
