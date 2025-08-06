<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// API routes for token-based authentication
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json([
            'user' => $request->user(),
            'message' => 'Profile retrieved successfully',
        ]);
    });

    Route::post('/tokens/create', function (Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $token = $request->user()->createToken($request->name);

        return response()->json([
            'token' => $token->plainTextToken,
            'message' => 'Token created successfully',
        ]);
    });

    Route::delete('/tokens/{id}', function (Request $request, $id) {
        $request->user()->tokens()->where('id', $id)->delete();

        return response()->json([
            'message' => 'Token deleted successfully',
        ]);
    });

    Route::get('/tokens', function (Request $request) {
        return response()->json([
            'tokens' => $request->user()->tokens->map(function ($token) {
                return [
                    'id' => $token->id,
                    'name' => $token->name,
                    'abilities' => $token->abilities,
                    'last_used_at' => $token->last_used_at,
                    'expires_at' => $token->expires_at,
                    'created_at' => $token->created_at,
                ];
            }),
            'message' => 'Tokens retrieved successfully',
        ]);
    });

    // Revoke all tokens except current
    Route::post('/tokens/revoke-others', function (Request $request) {
        $currentToken = $request->user()->currentAccessToken();
        $request->user()->tokens()->where('id', '!=', $currentToken->id)->delete();

        return response()->json([
            'message' => 'All other tokens revoked successfully',
        ]);
    });

    // Revoke all tokens
    Route::post('/tokens/revoke-all', function (Request $request) {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'All tokens revoked successfully',
        ]);
    });
});
