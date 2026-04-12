<?php

namespace App\Http\Middleware;

use App\Services\MetaConversionsApi;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackMetaPixelServerSide
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only track GET requests that return HTML (page views)
        if ($request->method() !== 'GET' || ! $request->header('accept', '') || ! str_contains($request->header('accept', ''), 'text/html')) {
            return $response;
        }

        // Skip admin, API, and asset routes
        if ($request->is('admin/*', 'api/*', 'build/*', '_debugbar/*')) {
            return $response;
        }

        $event = MetaConversionsApi::buildPageViewEvent(
            url: $request->fullUrl(),
            userAgent: $request->userAgent() ?? '',
            ip: $request->ip(),
            fbp: $request->cookie('_fbp'),
            fbc: $request->cookie('_fbc') ?? $request->query('fbclid'),
        );

        MetaConversionsApi::sendEvent($event);

        return $response;
    }
}
