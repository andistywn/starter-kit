<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Laravel\Fortify\Actions\RedirectIfTwoFactorAuthenticatable;
use Laravel\Fortify\Contracts\LoginResponse;
use Laravel\Fortify\Contracts\LogoutResponse;
use Laravel\Fortify\Contracts\PasswordResetResponse;
use Laravel\Fortify\Contracts\RegisterResponse;
use Laravel\Fortify\Contracts\TwoFactorLoginResponse;
use Laravel\Fortify\Contracts\VerifyEmailResponse;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::redirectUserForTwoFactorAuthenticationUsing(RedirectIfTwoFactorAuthenticatable::class);

        // Custom response handlers for API consistency
        $this->app->instance(LoginResponse::class, new class implements LoginResponse {
            public function toResponse($request)
            {
                if ($request->wantsJson()) {
                    return response()->json([
                        'user' => $request->user(),
                        'message' => 'Login successful',
                        'two_factor' => false,
                    ]);
                }

                return redirect()->intended(config('fortify.home'));
            }
        });

        $this->app->instance(RegisterResponse::class, new class implements RegisterResponse {
            public function toResponse($request)
            {
                if ($request->wantsJson()) {
                    return response()->json([
                        'user' => $request->user(),
                        'message' => 'Registration successful',
                    ], 201);
                }

                return redirect()->intended(config('fortify.home'));
            }
        });

        $this->app->instance(LogoutResponse::class, new class implements LogoutResponse {
            public function toResponse($request)
            {
                if ($request->wantsJson()) {
                    return response()->json([
                        'message' => 'Logout successful',
                    ]);
                }

                return redirect('/');
            }
        });

        $this->app->instance(PasswordResetResponse::class, new class implements PasswordResetResponse {
            public function toResponse($request)
            {
                if ($request->wantsJson()) {
                    return response()->json([
                        'message' => 'Password reset successful',
                    ]);
                }

                return redirect()->route('login')->with('status', 'Password reset successful');
            }
        });

        $this->app->instance(VerifyEmailResponse::class, new class implements VerifyEmailResponse {
            public function toResponse($request)
            {
                if ($request->wantsJson()) {
                    return response()->json([
                        'message' => 'Email verified successfully',
                    ]);
                }

                return redirect()->intended(config('fortify.home'))->with('verified', true);
            }
        });

        $this->app->instance(TwoFactorLoginResponse::class, new class implements TwoFactorLoginResponse {
            public function toResponse($request)
            {
                if ($request->wantsJson()) {
                    return response()->json([
                        'user' => $request->user(),
                        'message' => 'Two-factor authentication successful',
                        'two_factor' => true,
                    ]);
                }

                return redirect()->intended(config('fortify.home'));
            }
        });

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });

        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });
    }
}
