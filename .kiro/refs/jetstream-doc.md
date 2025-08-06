Directory structure:
└── laravel-jetstream-docs/
    ├── examples.md
    ├── package.json
    ├── prettier.config.js
    ├── tailwind.config.js
    ├── src/
    │   ├── building-your-app.md
    │   ├── concept-overview.md
    │   ├── index.md
    │   ├── installation.md
    │   ├── introduction.md
    │   ├── features/
    │   │   ├── api.md
    │   │   ├── authentication.md
    │   │   ├── browser-sessions.md
    │   │   ├── index.md
    │   │   ├── password-confirmation.md
    │   │   ├── password-update.md
    │   │   ├── profile-management.md
    │   │   ├── registration.md
    │   │   ├── teams.md
    │   │   └── two-factor-authentication.md
    │   └── stacks/
    │       ├── index.md
    │       ├── inertia.md
    │       └── livewire.md
    └── .vitepress/
        ├── config.ts
        └── theme/
            └── index.ts


Files Content:

================================================
FILE: examples.md
================================================
## Formatting Examples

::: tip Did you know?
Laravel now offers Horizon, a beautiful dashboard and configuration system for your Redis powered queues. Check out the full [Horizon documentation](/docs/{{version}}/horizon) for more information.
:::

::: warning Something to keep in mind
Laravel now offers Horizon, a beautiful dashboard and configuration system for your Redis powered queues. Check out the full [Horizon documentation](/docs/{{version}}/horizon) for more information.
:::

::: danger Be Careful!
Laravel now offers Horizon, a beautiful dashboard and configuration system for your Redis powered queues. Check out the full [Horizon documentation](/docs/{{version}}/horizon) for more information.
:::

Laravel queues provide a unified API across a variety of different queue backends, such as Beanstalk, Amazon SQS, Redis, or even a relational database. Queues allow you to defer the processing of a time consuming task, such as sending an email, until a later time. Deferring these time consuming tasks drastically speeds up web requests to your application.

The queue configuration file is stored in `config/queue.php`. In this file you will find connection configurations for each of the queue drivers that are included with the framework, which includes a database, [Beanstalkd](https://kr.github.io/beanstalkd/), [Amazon SQS](https://aws.amazon.com/sqs/), [Redis](https://redis.io), and a synchronous driver that will execute jobs immediately (for local use). A `null` queue driver is also included which discards queued jobs.

### Sub Sub Section

Before getting started with Laravel queues, it is important to understand the distinction between "connections" and "queues". In your `config/queue.php` configuration file, there is a `connections` configuration option. This option defines a particular connection to a backend service such as Amazon SQS, Beanstalk, or Redis. However, any given queue connection may have multiple "queues" which may be thought of as different stacks or piles of queued jobs.

Note that each connection configuration example in the `queue` configuration file contains a `queue` attribute. This is the default queue that jobs will be dispatched to when they are sent to a given connection. In other words, if you dispatch a job without explicitly defining which queue it should be dispatched to, the job will be placed on the queue that is defined in the `queue` attribute of the connection configuration:

```php
// This job is sent to the default queue...
Job::dispatch();

// This job is sent to the "emails" queue...
Job::dispatch()->onQueue('emails');
```

#### 4th Level

In order to use the `database` queue driver, you will need a database table to hold the jobs. To generate a migration that creates this table, run the `queue:table` Artisan command. Once the migration has been created, you may migrate your database using the `migrate` command:

```bash
php artisan queue:table

php artisan migrate
```

```php
<?php

namespace App\Providers;

use Illuminate\Support\Facades\Queue;
use Illuminate\Support\ServiceProvider;
use Illuminate\Queue\Events\JobProcessed;
use Illuminate\Queue\Events\JobProcessing;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Queue::before(function (JobProcessing $event) {
            // $event->connectionName
            // $event->job
            // $event->job->payload()
        });

        Queue::after(function (JobProcessed $event) {
            // $event->connectionName
            // $event->job
            // $event->job->payload()
        });
    }

    /**
     * Register the service provider.
     */
    public function register(): void
    {
        //
    }
}
```



================================================
FILE: package.json
================================================
{
    "scripts": {
        "start": "npm run docs:dev",
        "docs:build": "vitepress build",
        "docs:dev": "vitepress dev",
        "docs:preview": "vitepress preview"
    },
    "dependencies": {
        "@hempworks/pilgrim": "^0.1.16",
        "@tailwindcss/typography": "^0.5.9",
        "autoprefixer": "^10.4.14",
        "tailwindcss": "^3.3.2",
        "vitepress": "^1.0.0-beta.1"
    },
    "postcss": {
        "plugins": {
            "tailwindcss": {},
            "autoprefixer": {}
        }
    }
}



================================================
FILE: prettier.config.js
================================================
module.exports = {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    semi: false,
    requirePragma: false,
    proseWrap: 'preserve',
    arrowParens: 'avoid',
}



================================================
FILE: tailwind.config.js
================================================
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
import tailwindConfig from '@hempworks/pilgrim/tailwind.config'

const primary = {
//   50: '#f2f9ff',
//   100: '#e6f3ff',
//   200: '#bfdeff',
//   300: '#99c9ff',
//   400: '#4da0ff',
  500: '#6875F5',
//   600: '#006ee6',
//   700: '#0059bf',
//   800: '#004599',
//   900: '#003872',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    tailwindConfig,
  ],
  
  content: [
    ...tailwindConfig.content,
    './.vitepress/theme/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.{md,svg}',
  ],

  theme: {
    extend: {
      colors: { primary },
    },
  },
}



================================================
FILE: src/building-your-app.md
================================================
# Building Your App

[[toc]]

## Introduction

After installing Jetstream, you may wonder how to actually start building your application. Thankfully, since Jetstream handles the configuration of all of the initial authentication and application scaffolding, you can get started right away!

After installing Jetstream, the code is yours. The templates belong to your application and can be modified as you see fit. Jetstream is just a starting point. You do not need to worry about keeping your user interface "compatible" with future Jetstream releases because each Jetstream release is simply an entirely new iteration of the starter kit. In other words, Jetstream is not a package or administration dashboard that you will "update" in the future. It is a starter kit scaffolding for Laravel and, after it is installed, the templates are entirely yours to maintain.

:::tip Livewire & Inertia

Before diving into Jetstream, you should be familiar with how to use [Laravel Livewire](https://livewire.laravel.com) or [Inertia](https://inertiajs.com). Jetstream relies heavily on these technologies to provide a first-class user and developer experience.
:::

## Application Dashboard

After authenticating with your application, you will be redirected to the `/dashboard` route. This route is the home / dashboard screen of your application. When you are using the Livewire stack, this page is rendered by the `resources/views/dashboard.blade.php` Blade template. When using the Inertia stack, the screen is rendered using the `resources/js/Pages/Dashboard.vue` component.

If you open the dashboard template / component for your application, you will see that it extends the application's primary "layout" component. This layout defines the overall look and feel of the interior of your application. When using Livewire, this layout is defined by the `resources/views/layouts/app.blade.php` template and rendered via the `App\View\Components\AppLayout` component class. When using Inertia, your application layout is defined by the `resources/js/Layouts/AppLayout.vue` component.

Once you have familiarized yourself with the dashboard and application layout templates, feel free to start editing them. For example, you will probably want to remove the "welcome" component that is rendered on your application dashboard. To do so, you may delete it from your dashboard template. Next, you're free to write the HTML needed to build your application. Remember, Jetstream uses the powerful Tailwind CSS framework, so be sure to learn more about Tailwind by consulting the [Tailwind documentation](https://tailwindcss.com/docs).

### Adding Additional Pages

By default, Jetstream's top navigation menu includes a link to the application dashboard. Of course, you are free to edit this navigation menu to add links to other pages that will be available within your application. When using Livewire, the navigation menu is defined by the `resources/views/navigation-menu.blade.php` Blade template. When using Inertia, the navigation menu is defined within the `resources/js/Layouts/AppLayout.vue` component.

## User Profile

When building a Jetstream application, it's likely that you will need to add your own forms and panels to the user profile management screen. By default, the user's profile screen contains panels to update the user's contact information, password, manage their two-factor authentication settings, and more. However, you're free to add your own additional panels to this page. To do so, you may simply edit the templates that define the page.

When using Livewire, the user's profile management screen is defined by the `resources/views/profile/show.blade.php` Blade template. When using Inertia, this screen is rendered by the `resources/js/Pages/Profile/Show.vue` component. To add additional panels or forms to the user profile, you may simply edit these templates as necessary for your application.

## Team Management

You may also need to add additional forms and panels to the team management screens rendered by Jetstream. These include the "team settings" screen for managing existing teams as well as the "create team" screen that is rendered when a user is creating a new team.

### Create Team Screen

When team support is enabled, Jetstream includes a screen that allows users to create new teams. You are free to add additional form fields to the form contained within this screen. Any additional form fields you add will be passed into Jetstream's `App\Actions\Jetstream\CreateTeam` action via the `$input` argument.

When using Livewire, the team creation screen is defined by the `resources/views/teams/create.blade.php` Blade template. When using Inertia, this screen is rendered by the `resources/js/Pages/Teams/Create.vue` component.

### Team Settings Screen

When team support is enabled, Jetstream includes a screen that allows users to manage the settings for their existing teams, such as changing the team name or inviting additional team members. You're free to add your own additional panels to these pages. To do so, you may simply edit the templates that define the page.

When using Livewire, the team settings screen is defined by the `resources/views/teams/show.blade.php` Blade template. When using Inertia, this screen is rendered by the `resources/js/Pages/Teams/Show.vue` component.

## Banner Alerts

Jetstream includes a notification banner which can be displayed at the top of your application's UI.

If you are using the Livewire stack, your application will contain the banner component at `resources/views/components/banner.blade.php`. If you are using the Inertia stack, your banner component will be contained within the `resources/js/Components/Banner.vue` Vue component.

To instruct Jetstream to display the banner, you must flash a `flash.banner` message to the session. In addition to the banner message, you may also instruct Jetstream to display the banner with a `success` style or a `danger` style:

```php
$request->session()->flash('flash.banner', 'Yay it works!');
$request->session()->flash('flash.bannerStyle', 'success');

return redirect('/');
```

You may also instruct Jetstream to display the banner by invoking the `banner`, `warningBanner`, or `dangerBanner` methods on a redirect response instance:

```php
return redirect()->route('subscriptions')->banner('Subscription created successfully.');
return redirect()->route('subscriptions')->warningBanner('Subscription pending approval.');
return redirect()->route('subscriptions')->dangerBanner('Subscription cancellation failed.');
```



================================================
FILE: src/concept-overview.md
================================================
# Concept Overview

[[toc]]

## Introduction

Laravel Jetstream's architecture is a little different from other Laravel application starter kits such as [Laravel Breeze](https://laravel.com/docs/starter-kits). In this documentation, we'll cover some of the high-level concepts that will help you understand how Laravel Jetstream is constructed.

## Laravel Fortify

Under the hood, the authentication portions of Jetstream are powered by [Laravel Fortify](https://github.com/laravel/fortify), which is a frontend agnostic, "headless" authentication backend for Laravel.

Fortify registers the routes and controllers needed to implement all of Laravel's authentication features, including login, registration, password reset, email verification, and more. After installing Fortify, you may run the `route:list` Artisan command to see the routes that Fortify has registered.

Since Fortify does not provide its own user interface, it is meant to be paired with your own user interface which makes requests to the routes it registers. Laravel Jetstream is our first-party implementation of a user interface built on top of the Fortify authentication backend.

#### Fortify Configuration

When Jetstream is installed, a `config/fortify.php` configuration file is installed into your application. Within this configuration file, you can customize various aspects of Fortify's behavior, such as the authentication guard that should be used, where users should be redirected after authentication, and more.

Within the `fortify` configuration file, you can also disable entire features of Fortify, such as the ability to update profile information or passwords.

## Actions

In contrast to [Laravel Breeze](https://laravel.com/docs/starter-kits), Laravel Jetstream does not publish controllers or routes to your application. Instead, Jetstream's functionality is customized via "Action" classes. During the Jetstream installation process, actions are published to your application's `app/Actions` directory.

Action classes typically perform a single action and correspond to a single Jetstream or Fortify feature, such as creating a team or deleting a user. You are free to customize these classes if you would like to tweak the backend behavior of Jetstream. Each of the relevant actions published by Jetstream will be discussed within the feature's corresponding documentation.

## Views / Pages

During installation, Jetstream will publish a variety of views and classes to your application. When using Livewire, views will be published to your application's `resources/views` directory. When using Inertia, "Pages" will be published to your `resources/js/Pages` directory.

The views / pages published by Jetstream contain every feature supported by Jetstream and you are free to customize them as needed. Think of Jetstream as a starting point for your application. Once you have installed Jetstream, you are free to customize anything you like.

### Layouts

#### The Application Layout

After installation, your Jetstream application will contain two "layouts". First, Jetstream creates an application layout that is used to define the layout of your application's pages that require authentication, such as your application's dashboard. When using the Livewire stack, this layout is defined at `resources/views/layouts/app.blade.php` and rendered by the `App\View\Components\AppLayout` class. When using the Inertia stack, this layout is defined at `resources/js/Layouts/AppLayout.vue`.

#### The Livewire Guest / Authentication Layout

In addition to the application layout, Jetstream creates a "guest" layout that is used to define the layout for Jetstream's authentication-related pages, such as your application's login, registration, and password reset pages. When using the Livewire stack, this layout is defined at `resources/views/layouts/guest.blade.php` and rendered by the `App\View\Components\GuestLayout` class.

### Dashboard

The "main" view of your application is published at `resources/views/dashboard.blade.php` when using Livewire and `resources/js/Pages/Dashboard.vue` when using Inertia. You are free to use this as a starting point for building the primary "dashboard" of your application.

## Tailwind

During installation, Jetstream will scaffold your application's integration with the Tailwind CSS framework. Specifically, a `postcss.config.js` file and `tailwind.config.js` file will be created. These two files are used to build your application's compiled CSS output. You are free to modify these files as needed for your application.

In addition, your `tailwind.config.js` file has been pre-configured to support PurgeCSS with the relevant directories properly specified depending on your chosen Jetstream stack.

Your application's `package.json` file is already scaffolded with NPM commands that you may use to compile your assets. For more information on compiling your application's assets, consult the [Vite documentation](https://laravel.com/docs/vite):

```bash
# Compile your CSS / JavaScript for development and recompile on change...
npm run dev

# Compile your CSS / JavaScript for production...
npm run build
```




================================================
FILE: src/index.md
================================================
<meta http-equiv="refresh" content="0;url=/introduction.html" />



================================================
FILE: src/installation.md
================================================
# Installation

[[toc]]

## Installing Jetstream

You may use Composer to install Jetstream into your new Laravel project:

```bash
composer create-project laravel/laravel example-app

cd example-app

composer require laravel/jetstream
```

After installing the Jetstream package, you may execute the `jetstream:install` Artisan command. 
This command accepts the name of the stack you prefer (`livewire` or `inertia`). In addition, you may use the `--teams` switch to enable team support. 

The `jetstream:install` command will also install a suite of "feature" tests that provide test coverage for the features provided by Jetstream. 

**You are highly encouraged to read through the entire documentation of [Livewire](https://livewire.laravel.com) or [Inertia](https://inertiajs.com) before beginning your Jetstream project.**

:::danger New Applications Only

Jetstream should only be installed into new Laravel applications. Attempting to install Jetstream into an existing Laravel application will result in unexpected behavior and issues.
:::

#### Install Jetstream With Livewire

```bash
php artisan jetstream:install livewire
```

If you would like "teams" support, you can provide the `--teams` directive to the install command:

```bash
php artisan jetstream:install livewire --teams
```

#### Or, Install Jetstream With Inertia

```bash
php artisan jetstream:install inertia
```

If you would like "teams" support with the Inertia stack, provide the `--teams` directive to the install command:

```bash
php artisan jetstream:install inertia --teams
```

The Inertia stack may also be installed with SSR support:

```bash
php artisan jetstream:install inertia --ssr
```

You can read more about running the SSR server in the [Laravel Vite plugin](https://laravel.com/docs/vite#ssr) and [Inertia](https://inertiajs.com/server-side-rendering) documentation.

#### Dark Mode

If you would like to include "dark mode" support when scaffolding your application's frontend, provide the `--dark` directive when executing the `jetstream:install` command:

```bash
php artisan jetstream:install livewire --dark
```

### Finalizing the Installation

After installing Jetstream, you should install and build your NPM dependencies and migrate your database:

```bash
npm install
npm run build
php artisan migrate
```

## Application Logo

After installing Jetstream, you may have noticed that the Jetstream logo is utilized on Jetstream's authentication pages as well as your application's top navigation bar. You may easily customize the logo by modifying a few Jetstream components.

### Livewire

If you are using the Livewire stack, you should customize the SVGs located in the following Blade components:

* `resources/views/components/application-logo.blade.php`
* `resources/views/components/application-mark.blade.php`
* `resources/views/components/authentication-card-logo.blade.php`

### Inertia

If you are using the Inertia stack, you should customize the SVGs located in the following Vue components:

* `resources/js/Components/ApplicationLogo.vue`
* `resources/js/Components/ApplicationMark.vue`
* `resources/js/Components/AuthenticationCardLogo.vue`

After customizing these components, you should rebuild your assets:

```bash
npm run build
```

## Upgrade Guide

To upgrade to Jetstream 5.x from a previous release, please consult our [upgrade guide](https://github.com/laravel/jetstream/blob/5.x/UPGRADE.md).



================================================
FILE: src/introduction.md
================================================
# Introduction

[[toc]]

## Laravel Jetstream

Laravel Jetstream is a beautifully designed application starter kit for Laravel and provides the perfect starting point for your next Laravel application. Jetstream provides the implementation for your application's login, registration, email verification, two-factor authentication, session management, API via [Laravel Sanctum](https://github.com/laravel/sanctum), and optional team management features.

Jetstream is designed using [Tailwind CSS](https://tailwindcss.com) and offers your choice of [Livewire](/stacks/livewire) or [Inertia](/stacks/inertia) scaffolding.

![Screenshot of Laravel Jetstream](/img/preview-3.png)

## Available Stacks

Laravel Jetstream offers your choice of two frontend stacks: [Livewire](https://livewire.laravel.com) and [Inertia.js](https://inertiajs.com). Each stack provides a productive, powerful starting point for building your application; however, the stack you choose will depend on your preferred templating language.

### Livewire + Blade

[Laravel Livewire](https://livewire.laravel.com) is a library that makes it simple to build modern, reactive, dynamic interfaces using Laravel Blade as your templating language. This is a great stack to choose if you want to build an application that is dynamic and reactive, and is a great alternative to a full JavaScript framework like Vue.js.

When using Livewire, you may pick and choose which portions of your application will be a Livewire component, while the remainder of your application can be rendered as the traditional Blade templates you are used to.

:::tip Livewire Screencasts

If you're new to Livewire, check out the [screencasts available on the Livewire website](https://livewire.laravel.com/screencasts/installation).
:::

### Inertia + Vue

The [Inertia](https://inertiajs.com) stack provided by Jetstream uses [Vue.js](https://vuejs.org) as its templating language. Building an Inertia application is a lot like building a typical Vue application; however, you will use Laravel's router instead of Vue router. Inertia is a small library that allows you to render single-file Vue components from your Laravel backend by providing the name of the component and the data that should be hydrated into that component's "props".

In other words, this stack gives you the full power of Vue.js without the complexity of client-side routing. You get to use the standard Laravel routing and view data hydration approaches that you are used to.

The Inertia stack is a great choice if you are comfortable with and enjoy using Vue.js as your templating language.

:::tip Inertia Screencasts

If you're new to Inertia, check out the [screencasts available on the Laracasts website](https://laracasts.com/series/build-modern-laravel-apps-using-inertia-js).
:::



================================================
FILE: src/features/api.md
================================================
# API

[[toc]]

## Introduction

Jetstream includes first-party integration with [Laravel Sanctum](https://laravel.com/docs/sanctum). Laravel Sanctum provides a featherweight authentication system for SPAs (single page applications), mobile applications, and simple, token-based APIs. Sanctum allows each user of your application to generate multiple API tokens for their account. These tokens may be granted abilities / permissions which specify which actions the tokens are allowed to perform.

![Screenshot of Laravel Jetstream API](/img/api.png)

By default, the API token creation panel may be accessed using the "API" link of the top-right user profile dropdown menu. From this screen, users may create Sanctum API tokens that have various permissions.

:::tip Sanctum Documentation

For more information on Sanctum and to learn how to issue requests to a Sanctum authenticated API, please consult the official [Sanctum documentation](https://laravel.com/docs/sanctum).
:::

## Enabling API Support

If your application will be offering an API that may be consumed by third-parties, you must enable Jetstream's API feature. To do so, you should uncomment the relevant entry in the `features` configuration option of your application's `config/jetstream.php` configuration file:

```php
'features' => [
    Features::profilePhotos(),
    Features::api(),
    Features::teams(),
],
```

If you did not initially install Jetstream with the `--api` option, you may also need to execute the `install:api` Artisan command in order to create the `routes/api.php` file and install Laravel Sanctum:

```shell
php artisan install:api
```

## Defining Permissions

The permissions available to API tokens are defined using the `Jetstream::permissions` method within your application's `App\Providers\JetstreamServiceProvider` class. Permissions are defined as simple strings. Once they have been defined they may be assigned to an API token:

```php
Jetstream::defaultApiTokenPermissions(['read']);

Jetstream::permissions([
    'post:create',
    'post:read',
    'post:update',
    'post:delete',
]);
```

The `defaultApiTokenPermissions` method in the example above may be used to specify which permissions should be selected by default when creating a new API token. Of course, a user may uncheck a default permission before creating the token.

## Authorizing Incoming Requests

Every request made to your Jetstream application, even to authenticated routes within your `routes/web.php` file, will be associated with a Sanctum token object. You may determine if the associated token has a given permission using the `tokenCan` method provided by the `Laravel\Sanctum\HasApiTokens` trait.

This `HasApiTokens` trait is automatically applied to your application's `App\Models\User` model during Jetstream's installation. Typically, you will call the `tokenCan` method within your application's controllers, Livewire components, or [authorization policies](https://laravel.com/docs/authorization#creating-policies):

```php
return $request->user()->id === $post->user_id &&
       $request->user()->tokenCan('post:update')
```

### First-Party UI Initiated Requests

When a user makes a request to a route within your `routes/web.php` file, the request will typically be authenticated by Sanctum through an authenticated session cookie based guard. In most Laravel applications, this is the `web` guard.

When the user is making a first-party request through the application UI, the `tokenCan` method will always return `true`. Remember, this does not necessarily mean that your application has to allow the user to perform the action. Typically, your policies will determine if the token has been granted permission to perform the abilities **as well as check that the user instance itself should be allowed to perform the action**.

For example, in the case of updating a blog post, this might mean checking that the token is authorized to update posts **and** that the post belongs to the user:

```php
return $request->user()->id === $post->user_id &&
       $request->user()->tokenCan('post:update')
```

At first, allowing the `tokenCan` method to be called and always return `true` for first-party UI-initiated requests may seem strange; however, it is convenient to be able to always assume an API token is available and can be inspected via the `tokenCan` method. This means that you may always call the `tokenCan` method within your application's authorization policies without worrying about whether the request was triggered from your application's UI or was initiated by one of your API's third-party consumers.



================================================
FILE: src/features/authentication.md
================================================
# Authentication

[[toc]]

## Introduction

Laravel Jetstream automatically scaffolds the login, two-factor login, registration, password reset, and email verification features for your project, allowing you to start building the features you care about instead of worrying about the nitty-gritty details of user authentication.

![Screenshot of Authentication](/img/login.png)

## Laravel Fortify

Under the hood, the authentication portions of Jetstream are powered by [Laravel Fortify](https://github.com/laravel/fortify), which is a frontend agnostic authentication backend for Laravel. Essentially, Fortify defines the routes and controllers for implementing the application's authentication features while the Jetstream UI makes requests to those routes.

When Jetstream is installed, the `config/fortify.php` configuration file is installed into your application. Within this configuration file, you can customize various aspects of Fortify's behavior, such as the authentication guard that should be used, where users should be redirected after authentication, and more.

Within the `fortify` configuration file, you can also disable entire features of Fortify, such as the ability to update profile information or passwords.

## Views / Pages

When using the Livewire stack, the login view is displayed using the `resources/views/auth/login.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Auth/Login.vue` template. The directories that contain these views also contain other authentication-related views / pages for your application.

### Customizing the Authentication Views

Laravel Jetstream will automatically render the proper views for your application's login and other authentication screens. However, sometimes you may wish to customize how a particular authentication view is rendered or the data that is received by the view.

All of the authentication view's rendering logic may be customized using the appropriate methods available via the `Laravel\Fortify\Fortify` class. Typically, you should call this method from the `boot` method of your application's `App\Providers\JetstreamServiceProvider` class:

```php
use Laravel\Fortify\Fortify;

/**
 * Bootstrap any application services.
 */
public function boot(): void
{
    Fortify::loginView(function () {
        return view('auth.login');
    });
}
```

#### Customizing Inertia Authentication Views

If your application is using the Inertia stack, you may return Inertia pages from your view customization closures:

```php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;

Fortify::loginView(function () {
    return Inertia::render('Auth/Login', [
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
});
```

## Customizing the Authentication Process

### Customizing User Authentication

Sometimes, you may wish to have full customization over how user credentials are authenticated and how users are retrieved from your application's database. Thankfully, Jetstream allows you to easily accomplish this using the `Fortify::authenticateUsing` method.

The `authenticateUsing` method accepts a closure that receives the incoming HTTP request. The closure is responsible for validating the login credentials attached to the request and returning the associated user instance. If the credentials are invalid or no user can be found, `null` or `false` should be returned by the closure. Typically, this method should be called from the `boot` method of your `JetstreamServiceProvider`:

```php
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Fortify\Fortify;

/**
 * Bootstrap any application services.
 */
public function boot(): void
{
    // ...

    Fortify::authenticateUsing(function (Request $request) {
        $user = User::where('email', $request->email)->first();

        if ($user &&
            Hash::check($request->password, $user->password)) {
            return $user;
        }
    });
}
```

If you prefer to encapsulate your custom authentication process within a class instead of a closure, you may pass a PHP "callable" array to the `authenticateUsing` method:

```php
use App\Actions\AuthenticateLoginAttempt;
use Laravel\Fortify\Fortify;

Fortify::authenticateUsing([new AuthenticateLoginAttempt, '__invoke']);
```

### Customizing the Authentication Pipeline

Laravel Fortify, which is Jetstream's underlying authentication library, authenticates login requests through a pipeline of invokable classes.

If you would like, you may define a custom pipeline of classes that login requests should be piped through. Each class should have an `__invoke` method which receives the incoming `Illuminate\Http\Request` instance and, like middleware, a `$next` variable that is invoked in order to pass the request to the next class in the pipeline.

To define your custom pipeline, you may use the `Fortify::authenticateThrough` method. This method accepts a closure which should return the array of classes to pipe the login request through. Typically, this method should be called from the `boot` method of your `App\Providers\JetstreamServiceProvider` class.

The example below contains the default pipeline definition that you may use as a starting point when making your own modifications:

```php
use Laravel\Fortify\Actions\AttemptToAuthenticate;
use Laravel\Fortify\Actions\CanonicalizeUsername;
use Laravel\Fortify\Actions\EnsureLoginIsNotThrottled;
use Laravel\Fortify\Actions\PrepareAuthenticatedSession;
use Laravel\Fortify\Actions\RedirectIfTwoFactorAuthenticatable;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;
use Illuminate\Http\Request;

Fortify::authenticateThrough(function (Request $request) {
    return array_filter([
            config('fortify.limiters.login') ? null : EnsureLoginIsNotThrottled::class,
            config('fortify.lowercase_usernames') ? CanonicalizeUsername::class : null,
            Features::enabled(Features::twoFactorAuthentication()) ? RedirectIfTwoFactorAuthenticatable::class : null,
            AttemptToAuthenticate::class,
            PrepareAuthenticatedSession::class,
    ]);
});
```

## Password Reset

In addition to scaffolding views and actions related to login / authentication, Jetstream also scaffolds the resources needed for a user to reset their password in case it is forgotten. Of course, this feature utilizes Laravel's underlying [password reset features](https://laravel.com/docs/passwords).

:::tip Laravel Mail

Before using the password reset feature, you should ensure that your Laravel application is configured to [send emails](https://laravel.com/docs/mail). Otherwise, Laravel will not be able to send password reset links to your application's users.
:::

### Actions

As typical of most Jetstream features, the logic executed to satisfy password reset requests can be found in an action class within your application. Remember, actions are granular classes that are responsible for performing a single task related to a Jetstream or Fortify feature.

Specifically, the `App\Actions\Fortify\ResetUserPassword` class will be invoked when a user resets their password. This action is responsible for validating the user's new password and updating the password on the user instance. Therefore, any customizations you wish to make to user password reset logic should be made in this class. The action receives an array of `$input` that contains all of the input from the incoming request.

#### Password Validation Rules

The `App\Actions\Fortify\CreateNewUser`, `App\Actions\Fortify\ResetUserPassword`, and `App\Actions\Fortify\UpdateUserPassword` actions all utilize the `App\Actions\Fortify\PasswordValidationRules` trait.

As you may have noticed, the `App\Actions\Fortify\PasswordValidationRules` trait utilizes a custom `Laravel\Fortify\Rules\Password` validation rule object. This object allows you to easily customize the password requirements for your application. By default, the rule requires a password that is at least eight characters in length. However, you may use the following methods to customize the password's requirements:

```php
use Laravel\Fortify\Rules\Password;

// Require at least 10 characters...
(new Password)->length(10)

// Require at least one uppercase character...
(new Password)->requireUppercase()

// Require at least one numeric character...
(new Password)->requireNumeric()

// Require at least one special character...
(new Password)->requireSpecialCharacter()
```

Of course, these methods may be chained to define the password validation rules for your application:

```php
(new Password)->length(10)->requireSpecialCharacter()
```

### Views / Pages

Jetstream's password reset feature is implemented using two screens: a screen where the user can request a password reset link and a screen that actually allows the user to reset their password.

#### Password Reset Link Request

When using the Livewire stack, the password reset link request view is displayed using the `resources/views/auth/forgot-password.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Auth/ForgotPassword.vue` template.

#### Reset Password

When using the Livewire stack, the password reset view is displayed using the `resources/views/auth/reset-password.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Auth/ResetPassword.vue` template.



================================================
FILE: src/features/browser-sessions.md
================================================
# Browser Sessions

[[toc]]

## Introduction

Laravel Jetstream's security features are accessed by the user using the top-right user profile navigation dropdown menu. Within this dashboard, Jetstream scaffolds views that allow the user to view the browser sessions associated with their account. In addition, the user may "logout" browser sessions other than the one being used by the device they are currently using.

This feature utilizes Laravel's built-in `Illuminate\Session\Middleware\AuthenticateSession` middleware to safely log out other browser sessions that are authenticated as the current user.

![Screenshot of Browser Sessions](/img/browser-sessions.png)

:::warning Session Driver

To utilize browser session management within Jetstream, ensure that your session configuration's `driver` (or `SESSION_DRIVER` environment variable) is set to 'database'.
:::

## Actions

Most Jetstream features can be customized via action classes. However, for security, Jetstream's browser session services are encapsulated within Jetstream and should not require customization.

## Views / Pages

Typically, the browser session feature's corresponding views and pages should not require customization as they are already feature-complete. However, their locations are described below in case you need to make small presentation adjustments to these pages.

When using the Livewire stack, the browser session management view is displayed using the `resources/views/profile/logout-other-browser-sessions-form.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Profile/LogoutOtherBrowserSessionsForm.vue` template.



================================================
FILE: src/features/index.md
================================================
<meta http-equiv="refresh" content="0;url=/features/api.html" />



================================================
FILE: src/features/password-confirmation.md
================================================
# Password Confirmation

[[toc]]

## Introduction

While building your application, you may occasionally have actions that should require the user to confirm their password before the action is performed. For example, Jetstream itself requires users to confirm their password before changing their two-factor authentication settings. Thankfully, Jetstream has built-in functionality to make this a cinch.

Jetstream provides two approaches to password confirmation: redirect based password confirmation and modal based password confirmation.

#### Redirect Based Password Confirmation

Redirect based password confirmation is typically used when the user needs to confirm their password before accessing an entire screen that is rendered by your application, such as a billing settings screen.

This form of password confirmation redirects the user to a dedicated password confirmation screen where they must confirm their password before being redirected to their intended destination.

#### Modal Based Password Confirmation

Modal based password authentication might be used when you would like the user to confirm their password before performing a specific action, such as when enabling two-factor authentication.

This form of password confirmation displays a modal window that allows the user to confirm their password before their intended request is executed.

## Redirect Password Confirmation

The following documentation will discuss how to use redirect based password confirmation in Jetstream. Redirect based password confirmation is typically used when the user needs to confirm their password before accessing an entire screen that is rendered by your application, such as a billing settings screen.

This form of password confirmation redirects the user to a dedicated password confirmation screen where they must confirm their password before being redirected to their intended destination.

![Screenshot of Password Confirmation](/img/redirect-confirm.png)

### Redirect Password Confirmation via Livewire

#### Protecting Routes

To implement password confirmation via redirect to a password confirmation screen, you should ensure that the route that will render the view that requires password confirmation and any routes that perform the confirmed actions are assigned the `password.confirm` middleware.

This middleware is included with the default installation of Laravel and will ensure that the user is redirected to your application's password confirmation screen if they attempt to access the routes without confirming their password:

```php
Route::get('/billing', function () {
    // ...
})->middleware(['password.confirm']);

Route::post('/billing', function () {
    // ...
})->middleware(['password.confirm']);
```

The view that renders the Livewire stack's password confirmation screen is located at `resources/views/auth/confirm-password.blade.php`. Generally, this view should not need customization; however, you are free to make general presentational tweaks to this page based on your own application's design.

#### Ensuring Password Confirmation

Next, Livewire components that contain an action that should require password confirmation before being invoked should use the `Laravel\Jetstream\ConfirmsPasswords` trait.

After adding this trait to a component, you should call the `ensurePasswordIsConfirmed` method within any Livewire action that requires password confirmation. This should be done at the very beginning of the relevant action method:

```php
/**
 * Enable administration mode for user.
 */
public function enableAdminMode(): void
{
    $this->ensurePasswordIsConfirmed();

    // ...
}
```

:::warning Password Confirmation Expiration

Once the user has confirmed their password, they will not be required to re-enter their password until the number of seconds defined by your application's `auth.password_timeout` configuration option has elapsed:
:::

### Redirect Password Confirmation via Inertia

To implement password confirmation via redirect to a password confirmation screen, you should ensure that the route that will render the view that requires password confirmation and any routes that perform the confirmed actions are assigned the `password.confirm` middleware.

This middleware is included with the default installation of Laravel and will ensure that the user is redirected to your application's password confirmation screen if they attempt to access the routes without confirming their password:

```php
Route::get('/billing', function () {
    // ...
})->middleware(['password.confirm']);

Route::post('/billing', function () {
    // ...
})->middleware(['password.confirm']);
```

The page that renders the Inertia's stack's password confirmation screen is located at `resources/js/Pages/Auth/ConfirmPassword.vue`. Generally, this page should not need customization; however, you are free to make general presentational tweaks to this page based on your own application's design.

:::warning Password Confirmation Expiration

Once the user has confirmed their password, they will not be required to re-enter their password until the number of seconds defined by your application's `auth.password_timeout` configuration option has elapsed.
:::

## Modal Password Confirmation

The following documentation will discuss how to use modal based password confirmation in Jetstream. Modal based password authentication is typically used when you would like the user to confirm their password before performing a specific action, such as when enabling two-factor authentication.

This form of password confirmation displays a modal window that allows the user to confirm their password before their intended request is executed.

![Screenshot of Password Confirmation](/img/modal-confirm.png)

### Modal Password Confirmation via Livewire

#### Component Preparation

If you are using the Livewire stack, the Livewire component that contains the action that should require password confirmation before being invoked should use the `Laravel\Jetstream\ConfirmsPasswords` trait.

#### The `confirms-password` Blade Component

Next, in your application's user interface, you should wrap the button that triggers the action within the `confirms-password` Blade component. The `confirms-password` wrapper component should contain a `wire:then` directive that specifies which Livewire action should be run once the user's password has been confirmed:

```html
<x-confirms-password wire:then="enableAdminMode">
    <x-button type="button" wire:loading.attr="disabled">
        {{ __('Enable') }}
    </x-button>
</x-confirms-password>
```

#### Ensuring Password Confirmation via Livewire

After adding the `confirms-password` component to your application's user interface, you should call the `ensurePasswordIsConfirmed` method within the Livewire action that requires password confirmation. This should be done at the very beginning of the relevant action method:

```php
/**
 * Enable administration mode for user.
 */
public function enableAdminMode(): void
{
    $this->ensurePasswordIsConfirmed();

    // ...
}
```

:::warning Password Confirmation Expiration

Once the user has confirmed their password, they will not be required to re-enter their password until the number of seconds defined by your application's `auth.password_timeout` configuration option has elapsed.
:::

### Modal Password Confirmation via Inertia

#### The `ConfirmsPassword` Vue Component

If you are using the Inertia stack, you should wrap the user interface element that triggers an action requiring password confirmation with the `ConfirmsPassword` Vue component provided by Jetstream. To get started, import the `ConfirmsPassword` component into your page:

```js
import ConfirmsPassword from './Components/ConfirmsPassword.vue'
```

Next, wrap the component around the user interface element that triggers the action that should be confirmed. Your page should listen for the `ConfirmsPassword` component's `@confirmed` event in order to trigger the method that should be called once the user's password is confirmed:

```html
<ConfirmsPassword @confirmed="enableAdminMode">
    <PrimaryButton type="button" :class="{ 'opacity-25': enabling }" :disabled="enabling">
        Enable
    </PrimaryButton>
</ConfirmsPassword>
```

#### Ensuring Password Confirmation via Inertia

After adding the `ConfirmsPassword` component to your user interface, you should ensure that the route that performs the confirmed action is assigned the `password.confirm` middleware. This middleware is included with the default installation of Laravel:

```php
Route::post('/admin-mode', function () {
    // ...
})->middleware(['password.confirm']);
```

:::warning Password Confirmation Expiration

Once the user has confirmed their password, they will not be required to re-enter their password until the number of seconds defined by your application's `auth.password_timeout` configuration option has elapsed:
:::

## Customizing How Passwords Are Confirmed

Sometimes, you may wish to customize how the user's password is validated during confirmation. To do so, you may use the `Fortify::confirmPasswordsUsing` method. This method accepts a closure that receives the authenticated user instance and the `password` input field of the request. The closure should return `true` if the password is valid for the given user. Typically, this method should be called from the `boot` method of your `JetstreamServiceProvider`:

```php
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Fortify\Fortify;

/**
 * Bootstrap any application services.
 */
public function boot(): void
{
    // ...

    Fortify::confirmPasswordsUsing(function (User $user, string $password) {
        return Hash::check($password, $user->password);
    });
}
```

If you prefer to encapsulate your password confirmation process within a class instead of a closure, you may pass a PHP "callable" array to the `confirmPasswordsUsing` method:

```php
use App\Actions\ConfirmPassword;
use Laravel\Fortify\Fortify;

Fortify::confirmPasswordsUsing([new ConfirmPassword, '__invoke']);
```



================================================
FILE: src/features/password-update.md
================================================
# Password Update

[[toc]]

## Introduction

Laravel Jetstream's security features are accessed by the user using the top-right user profile navigation dropdown menu. Within this dashboard, Jetstream scaffolds views that allow the user to update the password associated with their account.

![Screenshot of Security](/img/security.png)

## Actions

Like most of Jetstream's features, the underlying logic used to implement the feature may be customized by modifying a corresponding action class.

The `App\Actions\Fortify\UpdateUserPassword` class will be invoked when the user updates their password. This action is responsible for validating the input and updating the user's password.

This action utilizes the `App\Actions\Fortify\PasswordValidationRules` trait to determine the validation rules that will be applied to the password. Customizing this trait will uniformly affect the validation rules applied to the password when the user registers, resets or updates their password.

### Password Validation Rules

As you may have noticed, the `App\Actions\Fortify\PasswordValidationRules` trait utilizes a custom `Laravel\Fortify\Rules\Password` validation rule object. This object allows you to easily customize the password requirements for your application. By default, the rule requires a password that is at least eight characters in length. However, you may use the following methods to customize the password's requirements:

```php
use Laravel\Fortify\Rules\Password;

// Require at least 10 characters...
(new Password)->length(10)

// Require at least one uppercase character...
(new Password)->requireUppercase()

// Require at least one numeric character...
(new Password)->requireNumeric()

// Require at least one special character...
(new Password)->requireSpecialCharacter()
```

Of course, these methods may be chained to define the password validation rules for your application:

```php
(new Password)->length(10)->requireSpecialCharacter()
```

## Views / Pages

Typically, the views and pages for these features should not require customization, as they are already feature-complete. However, their locations are described below in case you need to make small presentation adjustments to these pages.

When using the Livewire stack, the password update view is displayed using the `resources/views/profile/update-password-form.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Profile/UpdatePasswordForm.vue` template.



================================================
FILE: src/features/profile-management.md
================================================
# Profile Management

[[toc]]

## Introduction

Laravel Jetstream's profile management features are accessed by the user using the top-right user profile navigation dropdown menu. Jetstream scaffolds views and actions that allow the user to update their name, email address, and, optionally, their profile photo.

![Screenshot of Profile Management](/img/profile-management.png)

## Actions

As typical of most Jetstream features, the logic executed to satisfy profile update requests can be found in an action class within your application. Specifically, the `App\Actions\Fortify\UpdateUserProfileInformation` class will be invoked when the user updates their profile. This action is responsible for validating the input and updating the user's profile information.

Therefore, any customizations you wish to make to your application's management of this information should be made in this class. When invoked, the action receives the currently authenticated `$user` and an array of `$input` that contains all of the input from the incoming request, including the updated profile photo if applicable.

:::tip Managing Additional Information

If you need to manage additional information about the user, you are not restricted to just amending the provided "Profile Information" card. You can add as many additional UI elements and forms as you need within the user's profile dashboard.
:::

## Views / Pages

When using the Livewire stack, the user's profile information form is displayed using the `resources/views/profile/update-profile-information-form.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Profile/UpdateProfileInformationForm.vue` template.

Each of these templates will receive the entire authenticated user object so that you can add additional fields to these forms as necessary. Any additional inputs added to the forms will be included in the `$input` array that is passed to your `UpdateUserProfileInformation` action.

## Profile Photos

### Enabling Profile Photos

If you wish to allow users to upload custom profile photos, you must enable the feature in your application's `config/jetstream.php` configuration file. To enable the feature, simply uncomment the corresponding feature entry from the `features` configuration item within this file:

```php
use Laravel\Jetstream\Features;

'features' => [
    Features::profilePhotos(),
    Features::api(),
    Features::teams(),
],
```

After enabling the profile photo feature, you should execute the `storage:link` Artisan command. This command will create a symbolic link in your application's `public` directory that will allow your user's images to be served by your application. For information regarding this command, please consult the [Laravel filesystem documentation](https://laravel.com/docs/filesystem#the-public-disk):

```bash
php artisan storage:link
```

### Managing Profile Photos

Jetstream's profile photo functionality is supported by the `Laravel\Jetstream\HasProfilePhoto` trait that is automatically attached to your `App\Models\User` class during Jetstream's installation.

This trait contains methods such as `updateProfilePhoto`, `getProfilePhotoUrlAttribute`, `defaultProfilePhotoUrl`, and `profilePhotoDisk` which may all be overwritten by your own `App\Models\User` class if you need to customize their behavior. You are encouraged to read through the source code of this trait so that you have a full understanding of the features it is providing to your application.

The `updateProfilePhoto` method is the primary method used to store profile photos and is called by your application's `App\Actions\Fortify\UpdateUserProfileInformation` action class.

:::tip Laravel Vapor

By default, the `s3` disk will be used to store profile photos when your Jetstream application is running within [Laravel Vapor](https://vapor.laravel.com).
:::

## Account Deletion

The profile management screen also includes an action panel that allows the user to delete their application account. When the user chooses to delete their account, the `App\Actions\Jetstream\DeleteUser` action class will be invoked. You are free to customize your application's account deletion logic within this class.

The account deletion feature may be disabled by removing the feature from your application's `config/jetstream.php` configuration file:

```php
use Laravel\Jetstream\Features;

'features' => [
    Features::termsAndPrivacyPolicy(),
    Features::profilePhotos(),
    Features::api(),
    Features::teams(),
    // Features::accountDeletion(),
],
```



================================================
FILE: src/features/registration.md
================================================
# Registration

[[toc]]

## Introduction

Of course, before anyone can use your application, they need to create an account. Thankfully, Jetstream provides a registration view and a corresponding action that handles user registrations so that you can focus on building your application.

![Screenshot of Authentication](/img/authentication.png)

## Actions

As typical of most Jetstream features, the logic executed to satisfy registration requests can be found in an action class within your application. Remember, actions are granular classes that are responsible for performing a single task related to a Jetstream or Fortify feature.

Specifically, the `App\Actions\Fortify\CreateNewUser` class will be invoked when a user registers with your application. This action is responsible for validating the incoming request input and creating the user. Therefore, any customizations you wish to make to user creation logic should be made in this class. The action receives an array of `$input` that contains all of the input from the incoming request.

### Password Validation Rules

The `App\Actions\Fortify\CreateNewUser`, `App\Actions\Fortify\ResetUserPassword`, and `App\Actions\Fortify\UpdateUserPassword` actions all utilize the `App\Actions\Fortify\PasswordValidationRules` trait.

As you may have noticed, the `App\Actions\Fortify\PasswordValidationRules` trait utilizes a custom `Laravel\Fortify\Rules\Password` validation rule object. This object allows you to easily customize the password requirements for your application. By default, the rule requires a password that is at least eight characters in length. However, you may use the following methods to customize the password's requirements:

```php
use Laravel\Fortify\Rules\Password;

// Require at least 10 characters...
(new Password)->length(10)

// Require at least one uppercase character...
(new Password)->requireUppercase()

// Require at least one numeric character...
(new Password)->requireNumeric()

// Require at least one special character...
(new Password)->requireSpecialCharacter()
```

Of course, these methods may be chained to define the password validation rules for your application:

```php
(new Password)->length(10)->requireSpecialCharacter()
```

## Views / Pages

When using the Livewire stack, the registration view is displayed using the `resources/views/auth/register.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Auth/Register.vue` template. Any additional fields you add to these pages will be available via the `$input` array passed to the `App\Actions\Fortify\CreateNewUser` action.

### Customizing the Registration View

Laravel Jetstream will automatically render the proper views for your application's registration screen. However, sometimes you may wish to customize how the view / page is rendered.

All of Fortify's authentication view rendering logic may be customized using the appropriate methods available via the `Laravel\Fortify\Fortify` class. Typically, you should call this method from the `boot` method of your application's `App\Providers\JetstreamServiceProvider` class:

```php
use Laravel\Fortify\Fortify;

/**
 * Bootstrap any application services.
 */
public function boot(): void
{
    Fortify::registerView(function () {
        return view('auth.register');
    });
}
```

#### Customizing Inertia Registration Views

If your application is using the Inertia stack, you may return Inertia pages from your view customization closures:

```php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;

Fortify::registerView(function () {
    return Inertia::render('Auth/Register');
});
```

## Requiring Terms of Service / Privacy Policy Approval

Many applications require users to accept their terms of service / privacy policy during registration. Jetstream allows you to easily enable this requirement for your own application, as well as provides a convenient way of writing these documents using Markdown.

To get started, enable this feature in your application's `config/jetstream.php` configuration file:

```php
use Laravel\Jetstream\Features;

'features' => [
    Features::termsAndPrivacyPolicy(),
    // Features::profilePhotos(),
    // Features::api(),
    // Features::teams(),
    Features::accountDeletion(),
],
```

Next, you may write your terms of service / privacy policy documents by modifying your application's `resources/markdown/terms.md` and `resources/markdown/policy.md` files.

During registration, Jetstream will automatically ask the user to approve these documents. When the user clicks on the link to view the documents, Jetstream will use [Tailwind's typography plug-in](https://tailwindcss.com/docs/typography-plugin) to render the Markdown into beautifully formatted prose.

#### Terms & Policy Localization

To serve localized versions of your terms of service and privacy policy, you may suffix the files with the desired locale, such as `terms.es.md`. Jetstream will automatically serve the correct version of the file based on the current locale that is configured for the application.

## Email Verification

Laravel Jetstream includes support for requiring that a newly registered user verify their email address. However, support for this feature is disabled by default. To enable this feature, you should uncomment the relevant entry in the `features` configuration item of your application's `config/fortify.php` configuration file:

```php
use Laravel\Fortify\Features;

'features' => [
    Features::registration(),
    Features::resetPasswords(),
    Features::emailVerification(),
    Features::updateProfileInformation(),
    Features::updatePasswords(),
    Features::twoFactorAuthentication(),
],
```

Next, you should ensure that your `App\Models\User` class implements the `Illuminate\Contracts\Auth\MustVerifyEmail` interface. This interface is already imported into this model for you:

```php
use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    // ...
}
```

Once these two setup steps have been completed, newly registered users will receive an email prompting them to verify their email address ownership.

:::tip Laravel Mail

Before using the email verification feature, you should ensure that your Laravel application is configured to [send emails](https://laravel.com/docs/mail). Otherwise, Laravel will not be able to send email verification links to your application's users.
:::



================================================
FILE: src/features/teams.md
================================================
# Teams

[[toc]]

## Introduction

If you installed Jetstream using the `--teams` option, your application will be scaffolded to support team creation and management.

Jetstream's team features allow each registered user to create and belong to multiple teams. By default, every registered user will belong to a "Personal" team. For example, if a user named "Sally Jones" creates a new account, they will be assigned to a team named "Sally's Team". After registration, the user may rename this team or create additional teams.

![Screenshot of Laravel Teams](/img/teams.png)

:::warning Jetstream Teams

Jetstream's team scaffolding and opinions may not work for every application. If it doesn't work for your use case, feel free to create a non-team based Jetstream application and manually add team functionality to your application based on your own needs.
:::

## Team Creation

The team creation view is accessed via the top-right user navigation dropdown menu.

### Actions

Like many other Jetstream features, team creation and deletion logic may be customized by modifying the relevant action classes within your `app/Actions/Jetstream` directory. These actions include `CreateTeam`, `UpdateTeamName`, and `DeleteTeam`. Each of these actions is invoked when their corresponding task is performed by the user in the application's UI. You are free to modify these actions as required based on your application's needs.

### Views / Pages

When using the Livewire stack, the team creation view is displayed using the `resources/views/teams/create-team-form.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Teams/CreateTeamForm.vue` template. Additional input fields that are specified on the team creation forms will be provided to the `App\Actions\Jetstream\CreateTeam` action class when the user creates a team.

## Inspecting User Teams

Information about a user's teams may be accessed via the methods provided by the `Laravel\Jetstream\HasTeams` trait. This trait is automatically applied to your application's `App\Models\User` model during Jetstream's installation. This trait provides a variety of helpful methods that allow you to inspect a user's teams:

```php
// Access a user's currently selected team...
$user->currentTeam : Laravel\Jetstream\Team

// Access all of the team's (including owned teams) that a user belongs to...
$user->allTeams() : Illuminate\Support\Collection

// Access all of a user's owned teams...
$user->ownedTeams : Illuminate\Database\Eloquent\Collection

// Access all of the teams that a user belongs to but does not own...
$user->teams : Illuminate\Database\Eloquent\Collection

// Access a user's "personal" team...
$user->personalTeam() : Laravel\Jetstream\Team

// Determine if a user owns a given team...
$user->ownsTeam($team) : bool

// Determine if a user belongs to a given team...
$user->belongsToTeam($team) : bool

// Get the role that the user is assigned on the team...
$user->teamRole($team) : \Laravel\Jetstream\Role

// Determine if the user has the given role on the given team...
$user->hasTeamRole($team, 'admin') : bool

// Access an array of all permissions a user has for a given team...
$user->teamPermissions($team) : array

// Determine if a user has a given team permission...
$user->hasTeamPermission($team, 'server:create') : bool
```

### The Current Team

Every user within a Jetstream application has a "current team". This is the team that the user is actively viewing resources for. For example, if you are building a calendar application, your application would display the upcoming calendar events for the user's current team.

You may access the user's current team using the `$user->currentTeam` Eloquent relationship. This relationship may be used to scope your other Eloquent queries by the user's current team:

```php
use App\Models\Calendar;

return Calendar::where(
    'team_id', $request->user()->currentTeam->id
)->get();
```

:::tip Switching Teams

A user may switch their current team via the "team switcher" menu available within the Jetstream navigation bar.
:::

### The Team Object

The team object that is accessed via `$user->currentTeam` or Jetstream's other team-related Eloquent queries provides a variety of useful methods for inspecting the team's attributes and relationships:

```php
// Access the team's owner...
$team->owner : App\Models\User

// Get all of the team's users, including the owner...
$team->allUsers() : Illuminate\Database\Eloquent\Collection

// Get all of the team's users, excluding the owner...
$team->users : Illuminate\Database\Eloquent\Collection

// Determine if the given user is a team member...
$team->hasUser($user) : bool

// Determine if the team has a member with the given email address...
$team->hasUserWithEmail($emailAddress) : bool

// Determine if the given user is a team member with the given permission...
$team->userHasPermission($user, $permission) : bool
```

## Member Management

Team members may be added and removed from a team via Jetstream's "Team Settings" view. By default, only team owners can manage team membership. This restriction is defined in the `App\Policies\TeamPolicy` class. Naturally, you are free to modify this policy as you see fit.

### Member Management Actions

Like the customization process for other Jetstream features, team member addition logic may be customized by modifying the `App\Actions\Jetstream\AddTeamMember` action class. The class' `add` method is invoked with the currently authenticated user, the `Laravel\Jetstream\Team` instance, the email address of the user being added to the team, and the role (if applicable) of the user being added to the team.

This action is responsible for validating that the user can actually be added to the team and then adding the user to the team. You are free to customize this action based on the needs of your particular application.

Team member removal may be customized by modifying the `App\Actions\Jetstream\RemoveTeamMember` action class.

### Member Management Views / Pages

When using the Livewire stack, the team member manager view is displayed using the `resources/views/teams/team-member-manager.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Teams/TeamMemberManager.vue` template. Generally, these templates should not require customization.

### Invitations

By default, Jetstream will simply add any existing application user that you specify to your team. However, many applications choose to send invitation emails to users that are invited to teams. If the user does not have an account, the invitation email can instruct them to create an account and accept the invitation. Or, if the user already has an account, they can accept or ignore the invitation.

Thankfully, Jetstream allows you to enable team member invitations for your application with just a few lines of code. To get started, pass the `invitations` option when enabling the "teams" feature for your application. This may be done by modifying the `features` array of your application's `config/jetstream.php` configuration file:

```php
use Laravel\Jetstream\Features;

'features' => [
    Features::termsAndPrivacyPolicy(),
    Features::profilePhotos(),
    Features::api(),
    Features::teams(['invitations' => true]),
    Features::accountDeletion(),
],
```

Once you have enabled Jetstream's invitations feature, users that are invited to teams will receive an invitation email with a link to accept the team invitation. Users will not be full members of the team until the invitation is accepted.

#### Invitation Actions

When a user is invited to the team, your application's `App\Actions\Jetstream\InviteTeamMember` action will be invoked with the currently authenticated user, the team that the new user is invited to, the email address of the invited user, and, optionally, the role that should be assigned to the user once they join the team. You are free to review this action or modify it based on the needs of your own application.

:::tip Laravel Mail

Before using the team invitation feature, you should ensure that your Laravel application is configured to [send emails](https://laravel.com/docs/mail). Otherwise, Laravel will be unable to send team invitation emails to your application's users.
:::

## Roles / Permissions

Each team member added to a team may be assigned a given role, and each role is assigned a set of permissions. Role permissions are defined in your application's `App\Providers\JetstreamServiceProvider` class using the `Jetstream::role` method. This method accepts a "slug" for the role, a user-friendly role name, the role permissions, and a description of the role. This information will be used to display the role within the team member management view.

For example, imagine we are building a server management application such as [Laravel Forge](https://forge.laravel.com). We might define our application's team roles like so:

```php
Jetstream::defaultApiTokenPermissions(['read']);

Jetstream::role('admin', 'Administrator', [
    'server:create',
    'server:read',
    'server:update',
    'server:delete',
])->description('Administrator users can perform any action.');

Jetstream::role('support', 'Support Specialist', [
    'server:read',
])->description('Support specialists can read server information.');
```

:::tip Team API Support

When Jetstream is installed with team support, available API permissions are automatically derived by combining all unique permissions available to roles. Therefore, a separate call to the `Jetstream::permissions` method is unnecessary.
:::

### Authorization

Of course, you will need a way to authorize that incoming requests initiated by a team member may actually be performed by that user. A user's team permissions may be inspected using the `hasTeamPermission` method available via the `Laravel\Jetstream\HasTeams` trait.

**There is typically not a need to inspect a user's role. You only need to inspect that the user has a given granular permission.** Roles are simply a presentational concept used to group granular permissions. Typically, you will execute calls to this method within your application's [authorization policies](https://laravel.com/docs/authorization):

```php
return $user->hasTeamPermission($server->team, 'server:update');
```

### Combining Team Permissions With API Permissions

When building a Jetstream application that provides both API support and team support, you should verify an incoming request's team permissions **and** API token permissions within your application's authorization policies. This is important because an API token may have the theoretical ability to perform an action while a user does not actually have that action granted to them via their team permissions:

```php
/**
 * Determine whether the user can view a flight.
 */
public function view(User $user, Flight $flight): bool
{
    return $user->belongsToTeam($flight->team) &&
           $user->hasTeamPermission($flight->team, 'flight:view') &&
           $user->tokenCan('flight:view');
}
```



================================================
FILE: src/features/two-factor-authentication.md
================================================
# Two Factor Authentication

[[toc]]

## Introduction

Laravel Jetstream automatically scaffolds two-factor authentication support for all Jetstream applications. Laravel Jetstream's security features are accessed by the user using the top-right user profile navigation dropdown menu. Within this dashboard, Jetstream scaffolds views that allow the user to enable and manage two-factor authentication for their account.

**When a user enables two-factor authentication for their account, they should scan the given QR code using a free TOTP authenticator application such as Google Authenticator. In addition, they should store the listed recovery codes in a secure password manager such as [1Password](https://1password.com).**

If the user loses access to their mobile device, the Jetstream login page will allow them to authenticate using one of their recovery codes instead of the temporary token provided by their mobile device's authenticator application.

![Screenshot of Security](/img/security.png)

## Actions

Most Jetstream features can be customized via action classes. However, for security, Jetstream's two-factor authentication services are encapsulated within Jetstream and should not require customization.

## Views / Pages

Typically, the two-factor authentication feature's corresponding views and pages should not require customization as they are already feature-complete. However, their locations are described below in case you need to make small presentation adjustments to these pages.

When using the Livewire stack, the two-factor authentication management view is displayed using the `resources/views/profile/two-factor-authentication-form.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Profile/TwoFactorAuthenticationForm.vue` template.

## Disabling Two-Factor Authentication

If you would like, you may disable support for two-factor authentication by removing the feature from the `features` array of your application's `config/fortify.php` configuration file:

```php
use Laravel\Fortify\Features;

'features' => [
    Features::registration(),
    Features::resetPasswords(),
    Features::emailVerification(),
    Features::updateProfileInformation(),
    Features::updatePasswords(),
    // Features::twoFactorAuthentication([
    //     'confirmPassword' => true,
    // ]),
],
```



================================================
FILE: src/stacks/index.md
================================================
# Stacks

Laravel Jetstream ships with two pre-built stack options:

- [Livewire](/stacks/livewire)
- [Inertia](/stacks/inertia)



================================================
FILE: src/stacks/inertia.md
================================================
# Inertia

[[toc]]

## Introduction

The Inertia stack provided by Jetstream uses [Vue.js](https://vuejs.org) as its templating language. Building an Inertia application is a lot like building a typical Vue application; however, you will use Laravel's router instead of Vue router. Inertia is a small library that allows you to render single-file Vue components from your Laravel backend by providing the name of the component and the data that should be hydrated into that component's "props".

In other words, this stack gives you the full power of Vue.js without the complexity of client-side routing. The Inertia stack is a great choice if you are comfortable with and enjoy using Vue.js as your templating language. When using Inertia, your application's routes will respond by rendering an Inertia "page". This looks very similar to returning a Laravel Blade view:

```php
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Show the general profile settings screen.
 */
public function show(Request $request): Response
{
    return Inertia::render('Profile/Show', [
        'sessions' => $this->sessions($request)->all(),
    ]);
}
```

When using the Inertia stack, Jetstream has some unique features that you should be aware of. We will discuss each of these features below.

:::tip Inertia Documentation

Before using the Inertia stack, you are strongly encouraged to review the entire [Inertia documentation](https://inertiajs.com)
:::

## Components

When we created the Jetstream Inertia stack, a variety of Vue components (buttons, panels, inputs, modals) were created to assist in creating UI consistency and ease of use. You are free to use or not use these components. All of these components are located within your application's `resources/js/Components` directory.

You may gain insight into how to use these components by reviewing their usage within Jetstream's existing pages located within your application's `resources/js/Pages` directory.

## Customizing Jetstream's Page Rendering

Some of Jetstream's Inertia pages, such as `Teams/Show` and `Profile/Show` are rendered from within Jetstream itself. However, you may need to pass additional data to these pages while building your application. Therefore, Jetstream allows you to customize the data / props passed to these pages using the `Jetstream::inertia()->whenRendering` method.

This method accepts the name of the page you wish to customize and a closure. The closure will receive the incoming HTTP request and an array of the default data that would typically be sent to the page. You are welcome to customize or add new array elements to the data as necessary. Typically, you should call this method from within the `boot` method of your `App\Providers\JetstreamServiceProvider` class:

```php
use Illuminate\Http\Request;
use Laravel\Jetstream\Jetstream;

/**
 * Bootstrap any application services.
 */
public function boot(): void
{
    // ...

    Jetstream::inertia()->whenRendering(
        'Profile/Show',
        function (Request $request, array $data) {
            return array_merge($data, [
                // Custom data...
            ]);
        }
    );
}
```

:::tip Authentication View Customization

To learn how to customize the Inertia pages rendered by Jetstream's authentication related routes such as login, registration, and password reset, check out the [authentication documentation](/features/authentication#customizing-inertia-authentication-views).
:::

## Modals

Jetstream's Inertia stack also includes two modal components: `DialogModal` and `ConfirmationModal`. The `ConfirmationModal` may be used when confirming destructive actions such as the deletion of resources, while the `DialogModal` is a more generic modal window that may be used at any time.

To illustrate the use of modals, consider the following modal that confirms a user would like to delete their account:

```html
<ConfirmationModal :show="confirmingUserDeletion" @close="confirmingUserDeletion = false">
    <template #title>
        Delete Account
    </template>

    <template #content>
        Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted.
    </template>

    <template #footer>
        <SecondaryButton @click.native="confirmingUserDeletion = false">
            Nevermind
        </SecondaryButton>

        <DangerButton class="ml-2" @click.native="deleteUser" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
            Delete Account
        </DangerButton>
    </template>
</ConfirmationModal>
```

As you can see, the modal's open / close state is determined by a `show` property that is declared on the component. The modal's contents may be specified by hydrating three slots: `title`, `content`, and `footer`.

## Routes

Jetstream's Inertia stack includes Tighten's Ziggy library as a JavaScript alternative to the Laravel `route()` helper. You can refer to the [Ziggy usage documentation](https://github.com/tighten/ziggy#usage) for a complete guide on using this library, but some common examples can be found in Jetstream's own Vue files, including `Layouts/AppLayout.vue`:

```html
<NavLink :href="route('dashboard')" :active="route().current('dashboard')">
    Dashboard
</NavLink>
```



================================================
FILE: src/stacks/livewire.md
================================================
# Livewire

[[toc]]

## Introduction

Laravel Livewire is a library that makes it simple to build modern, reactive, dynamic interfaces using Laravel Blade as your templating language. This is a great stack to choose if you want to build an application that is dynamic and reactive, and is a great alternative to a full JavaScript framework like Vue.js.

When using Livewire, your application's routes will respond with typical Blade templates. However, within these templates you may render Livewire components as necessary:

```html
<div class="mt-4">
    @livewire('server-list')
</div>
```

When using the Livewire stack, Jetstream has some unique features that you should be aware of. We will discuss each of these features below.

:::tip Livewire Documentation

Before using the Livewire stack, you are strongly encouraged to review the entire [Livewire documentation](https://livewire.laravel.com)
:::

## Components

When we created the Jetstream Livewire stack, a variety of Blade components (buttons, panels, inputs, modals) were created to assist in creating UI consistency and ease of use. You are free to use or not use these components. All of these components are located within your application's `resources/views/components` directory.

You may gain insight into how to use these components by reviewing their usage within Jetstream's existing views located within your application's `resources/views` directory.

## Modals

Most of the Jetstream Livewire stack's components have no communication with your backend. However, the Livewire modal components included with Jetstream do interact with your Livewire backend to determine their open / closed state.

In addition, Jetstream includes two types of modals: `dialog-modal` and `confirmation-modal`. The `confirmation-modal` may be used when confirming destructive actions such as deletions, while the `dialog-modal` is a more generic modal window that may be used at any time.

To illustrate the use of modals, consider the following modal that confirms a user would like to delete their account:

```html
<x-confirmation-modal wire:model="confirmingUserDeletion">
    <x-slot name="title">
        Delete Account
    </x-slot>

    <x-slot name="content">
        Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted.
    </x-slot>

    <x-slot name="footer">
        <x-secondary-button wire:click="$toggle('confirmingUserDeletion')" wire:loading.attr="disabled">
            Nevermind
        </x-secondary-button>

        <x-danger-button class="ml-2" wire:click="deleteUser" wire:loading.attr="disabled">
            Delete Account
        </x-danger-button>
    </x-slot>
</x-confirmation-modal>
```

As you can see, the modal's open / close state is determined by a `wire:model` property that is declared on the component. The property's name should correspond to a boolean property on your Livewire component's corresponding PHP class. Typically, you will set this property to `true` when the user clicks a UI element in your application that should open the modal. Of course, the property should be set to `false` when you are ready to close the modal.

The modal's contents may be specified by hydrating three Blade component slots: `title`, `content`, and `footer`.

## Banner Alerts

Jetstream's Livewire stack includes an `InteractsWithBanner` trait that is designed to simplify the process of displaying banner messages to the user.

The `InteractsWithBanner` trait provides methods to quickly display a `success` or `danger` message with the help of the `resources/views/components/banner.blade.php` component and [Livewire's event system](https://livewire.laravel.com/docs/events).

### Usage

First, include the `InteractsWithBanner` trait within one of your Livewire components:

```php
use Laravel\Jetstream\InteractsWithBanner;

class ExampleComponent extends Component
{
    use InteractsWithBanner;
    
    // ...
}
```

To display a message to the user, invoke the `banner`, `warningBanner`, or `dangerBanner` methods within a Livewire component method:

```php
$this->banner('Invoice paid.');
$this->warningBanner('Payment pending approval.');
$this->dangerBanner('Payment failed.');
```



================================================
FILE: .vitepress/config.ts
================================================
import { defineConfigWithTheme } from "vitepress";
import type { ThemeConfig } from '@hempworks/pilgrim'
import config from '@hempworks/pilgrim/config'

export default defineConfigWithTheme<ThemeConfig>({
    extends: config,
    title: 'Laravel Jetstream',
    description: 'Beautifully designed application scaffolding for Laravel',
    base: '/',
    cleanUrls: false,
    srcDir: 'src',

    head: [
        ['link', {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
        }],
        ['link', {
            rel: 'icon',
            sizes: '16x16',
            type: 'image/png',
            href: '/favicon-16x16.png',
        }],
        ['link', {
            rel: 'icon',
            sizes: '32x32',
            type: 'image/png',
            href: '/favicon-32x32.png',
        }],
        ['link', {
            rel: 'mask-icon',
            href: '/safari-pinned-tab.svg',
        }],
        ['meta', {
            name: 'msapplication-TileColor',
            content: '#18b69b',
        }],
        ['meta', {
            name: 'msapplication-TileImage',
            content: '/mstile-144x144.png',
        }],
        ['meta', {
            property: 'og:image',
            content: '/social-share.png',
        }],
        ['meta', {
            property: 'twitter:card',
            content: 'summary_large_image',
        }],
        ['meta', {
            property: 'twitter:image',
            content: '/social-share.png',
        }],
    ],

    themeConfig: {
        logo: {
            light: '/logo.svg',
            dark: '/logo-dark.svg',
        },
        nav: [
            {
                text: 'GitHub',
                link: 'https://github.com/laravel/jetstream',
            },
        ],
        versions: [
            {
                text: 'v5.x',
                link: 'https://jetstream.laravel.com',
                current: true,
            },
            { text: 'v4.x', link: 'https://github.com/laravel/jetstream-docs/tree/4.x' },
            { text: 'v3.x', link: 'https://github.com/laravel/jetstream-docs/tree/3.x' },
            { text: 'v2.x', link: 'https://github.com/laravel/jetstream-docs/tree/2.x' },
            { text: 'v1.x', link: 'https://github.com/laravel/jetstream-docs/tree/1.x' },
        ],
        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Introduction', link: '/introduction.html' },
                    { text: 'Installation', link: '/installation.html' },
                    { text: 'Concept Overview', link: '/concept-overview.html' },
                    { text: 'Building Your App', link: '/building-your-app.html' },
                ],
            }, {
                text: 'Features',
                items: [
                    { text: 'API', link: '/features/api.html' },
                    { text: 'Authentication', link: '/features/authentication.html' },
                    { text: 'Registration', link: '/features/registration.html' },
                    { text: 'Profile Management', link: '/features/profile-management.html' },
                    { text: 'Password Update', link: '/features/password-update.html' },
                    { text: 'Password Confirmation', link: '/features/password-confirmation.html' },
                    { text: 'Two Factor Authentication', link: '/features/two-factor-authentication.html' },
                    { text: 'Browser Sessions', link: '/features/browser-sessions.html' },
                    { text: 'Teams', link: '/features/teams.html' },
                ],
            }, {
                text: 'Stack Features',
                items: [
                    { text: 'Livewire', link: '/stacks/livewire.html' },
                    { text: 'Inertia', link: '/stacks/inertia.html' },
                ],
            }
        ],
        search: {
            provider: 'local',
            options: {
                placeholder: 'Search Jetstream Docs...',
                miniSearch: {
                }
            },
        }
    },
    vite: {
        server: {
            host: true,
            fs: {
                // for when developing with locally linked theme
                allow: ['../..']
            }
        },
    }
})



================================================
FILE: .vitepress/theme/index.ts
================================================
import { Theme } from "@hempworks/pilgrim";

export default Theme


