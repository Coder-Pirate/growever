<?php

namespace App\Services;

use App\Models\SiteContent;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MetaConversionsApi
{
    private const API_VERSION = 'v21.0';
    private const BASE_URL = 'https://graph.facebook.com';

    public static function sendEvent(array $eventData): void
    {
        $settings = SiteContent::getSection('settings');
        $pixelId = $settings['meta_pixel_id'] ?? '';
        $accessToken = $settings['meta_pixel_access_token'] ?? '';

        if (empty($pixelId) || empty($accessToken)) {
            return;
        }

        $url = self::BASE_URL . '/' . self::API_VERSION . '/' . $pixelId . '/events';

        try {
            Http::asForm()->async()->post($url, [
                'data' => json_encode([$eventData]),
                'access_token' => $accessToken,
            ]);
        } catch (\Throwable $e) {
            Log::warning('Meta Conversions API error: ' . $e->getMessage());
        }
    }

    public static function buildPageViewEvent(
        string $url,
        string $userAgent,
        string $ip,
        ?string $fbp = null,
        ?string $fbc = null,
    ): array {
        $event = [
            'event_name' => 'PageView',
            'event_id' => uniqid('pv_', true),
            'event_time' => time(),
            'event_source_url' => $url,
            'action_source' => 'website',
            'user_data' => [
                'client_ip_address' => $ip,
                'client_user_agent' => $userAgent,
            ],
        ];

        if ($fbp) {
            $event['user_data']['fbp'] = $fbp;
        }

        if ($fbc) {
            $event['user_data']['fbc'] = $fbc;
        }

        return $event;
    }

    public static function buildLeadEvent(
        string $url,
        string $userAgent,
        string $ip,
        ?string $email = null,
        ?string $phone = null,
        ?string $fbp = null,
        ?string $fbc = null,
    ): array {
        $event = [
            'event_name' => 'Lead',
            'event_id' => uniqid('lead_', true),
            'event_time' => time(),
            'event_source_url' => $url,
            'action_source' => 'website',
            'user_data' => [
                'client_ip_address' => $ip,
                'client_user_agent' => $userAgent,
            ],
        ];

        if ($email) {
            $event['user_data']['em'] = [hash('sha256', strtolower(trim($email)))];
        }

        if ($phone) {
            $normalized = preg_replace('/[^0-9]/', '', $phone);
            $event['user_data']['ph'] = [hash('sha256', $normalized)];
        }

        if ($fbp) {
            $event['user_data']['fbp'] = $fbp;
        }

        if ($fbc) {
            $event['user_data']['fbc'] = $fbc;
        }

        return $event;
    }
}
