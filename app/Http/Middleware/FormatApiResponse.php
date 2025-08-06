<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FormatApiResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only format JSON responses for API routes
        if ($request->is('api/*') && $response instanceof JsonResponse) {
            $data = $response->getData(true);

            // If response doesn't already have a consistent structure, format it
            if (!isset($data['success']) && !isset($data['error'])) {
                $formattedData = [
                    'success' => $response->isSuccessful(),
                    'data' => $data,
                    'timestamp' => now()->toISOString(),
                ];

                $response->setData($formattedData);
            }
        }

        return $response;
    }
}
