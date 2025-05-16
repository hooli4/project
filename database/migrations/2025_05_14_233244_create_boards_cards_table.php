<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('boards_cards', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('board_id');
            $table->unsignedBigInteger('card_id');

            $table->foreign('board_id')->references('id')->on('boards')->onDelete('cascade');
            $table->foreign('card_id')->references('id')->on('cards')->onDelete('cascade');

            $table->integer('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('boards_cards');
    }
};
