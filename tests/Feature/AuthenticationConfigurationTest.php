<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthenticationConfigurationTest extends TestCase
{
    use RefreshDatabase;

    public function test_sanctum_api_authentication_works(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/user');

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'data' => [
                        'id' => $user->id,
                        'email' => $user->email,
                    ],
                ]);
    }

    public function test_api_token_creation_works(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/tokens/create', [
            'name' => 'Test Token',
        ]);

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'token',
                        'message',
                    ],
                ]);
    }

    public function test_fortify_registration_endpoint_exists(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_fortify_login_endpoint_exists(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_sanctum_csrf_cookie_endpoint_exists(): void
    {
        $response = $this->get('/sanctum/csrf-cookie');

        $response->assertStatus(204);
    }
}
