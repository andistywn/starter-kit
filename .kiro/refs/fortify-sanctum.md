User Authentication for Web and API with Laravel Fortify and Sanctum
====================================================================

[![Idoko Emmanuel](https://miro.medium.com/v2/resize:fill:64:64/1*xn_HPZLw2TW0L0Yo-NWULg.png)](https://medium.com/@idokoemmanuel3?source=post_page---byline--fb31455ee673---------------------------------------)

[Idoko Emmanuel](https://medium.com/@idokoemmanuel3?source=post_page---byline--fb31455ee673---------------------------------------)

8 min read

·

Feb 15, 2023

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2Ffb31455ee673&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40idokoemmanuel3%2Fuser-authentication-for-web-and-api-with-laravel-fortify-and-sanctum-fb31455ee673&user=Idoko+Emmanuel&userId=1de61cd8e3a9&source=---header_actions--fb31455ee673---------------------clap_footer------------------)

--

1

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2Ffb31455ee673&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40idokoemmanuel3%2Fuser-authentication-for-web-and-api-with-laravel-fortify-and-sanctum-fb31455ee673&source=---header_actions--fb31455ee673---------------------bookmark_footer------------------)

Listen

Share

![https://desarrolloweb.com/](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2cozozEjAnpxCDduDBT34Q.jpeg)

In today’s world, applications often need to cater to both web and API users. To authenticate these users, a seamless integration of both web and API authentication methods is crucial. In this article, we will be discussing how Laravel Fortify & Sanctum can help achieve this integration.

Laravel Fortify is a headless authentication backend for Laravel that provides various features including cookie-based authentication, two-factor authentication, and email verification. It can be used in combination with Laravel Sanctum to authenticate single-page applications (SPAs) that need to connect with Laravel.

Laravel Sanctum, on the other hand, is a hybrid web/API authentication package that can handle the entire authentication process for your application. It checks if the request includes a session cookie that references an authenticated session or an API token.

The article will be divided into three phases. In the first and second phases, we will demonstrate how to authenticate new users using API authentication. In the third phase, we will show how to achieve the same using web authentication. Join us as we explore the potential of these powerful Laravel packages.

> The Github repo is available at the end of this article

In this phase, i’ll walk you through the process of setting up a new Laravel project with Laravel Sanctum and Fortify. Firstly, you need to install a new Laravel project.

1.  **Create your Laravel project:**

```
composer create-project laravel/laravel web-api-backend
```

**2. Install Laravel Sanctum using the composer package manager:**

```
composer require laravel/sanctum
```

To complete the installation process, you need to publish the Sanctum configuration and migration files using the following Artisan command:

```
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

Next, run your database migrations to create the API token database table.

```
php artisan migrate
```

Add Sanctum’s middleware to your api middleware group in the **app/Http/Kernel.php** file:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*RALMV4TKAruIQJRMvr-vZQ.png)

For more information, check out the Laravel Sanctum documentation: [https://laravel.com/docs/10.x/sanctum](https://laravel.com/docs/9.x/sanctum)

**3. Install Fortify using the composer package manager:**

```
composer require laravel/fortify
```

Publish Fortify’s resources using the following vendor:publish command:

```
php artisan vendor:publish --provider="Laravel\Fortify\FortifyServiceProvider"
```

This command will publish Fortify’s actions, the FortifyServiceProvider class, and all necessary database migrations to your **app/Actions** directory (which will be created if it does not exist).

Next, migrate your database:

```
php artisan migrate
```

Ensure that the **App\Providers\FortifyServiceProvider** class is included in the providers array of your **config/app.php** configuration file since it is also published when you execute the **vendor:publish** command. The Fortify service provider registers the necessary actions and directs Fortify to use them when executing their respective tasks.

In the fortify configuration file, there is a **features** configuration array that outlines the backend routes and features exposed by Fortify. It is recommended to only enable the basic authentication features, which are shown below.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*BBUNekNCN4Tq5458cZ_uAA.png)

For more information, check out the Laravel Sanctum documentation: [https://laravel.com/docs/10.x/fortify](https://laravel.com/docs/9.x/sanctum)

**4. Authentication Routes**

Continuing from the previous steps, it’s now time to focus on the authentication routes for the API. For the purpose of this phase, we will be working with the **routes/api.php** file.

First, let’s specify the prefix that Fortify will use for all of its registered routes. This can be set in the prefix configuration value within the **config/fortify.php** configuration file.

The image below shows the basic endpoint for the authentication routes such as login, register, and forgot-password.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*tp3JBMzLbY0XOPEn7sbeEQ.png)

To add the API version as prefix, simply modify the **config/fortify.php** file and add ‘v1’ to ‘prefix’:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ZzA93v_M_gBhOhFZg1v2Xg.png)

Also modify your **app/Providers/RouteServiceProvider.php** and add ‘v1’ to the api prefix:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*gacAGRZEXoBh_in1X5V4rA.png)

To access these routes, a JSON request must be sent with the accept and x-requested-with headers to the API endpoint. To check all available endpoints and routes on your application, simply run the following command:

```
php artisan route:list
```

Assuming your base URL is **127.0.0.1:8000**, your endpoint URL will be **127.0.0.1:8000/api/v1**. This is because we set the api version in the **config/fortify.php** file.

It’s worth noting that we are taking advantage of the Fortify controllers by using them in our **routes/api.php** file, streamlining the authentication process and making it easier to manage.

**5. Customising Authentication Responses**

Let’s dive into customizing the authentication responses in your Fortify service provider. To make modifications, open your **app/Providers/FortifyServiceProvider.php** file and modify the register method, as shown in the accompanying illustration.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*NFJu8vd7s1FtqbAVOar2Vg.png)

In this file, you will bind implementations of the responses contracts into the Laravel service container. Given that we are utilizing Fortify’s authentication logic for both web and API, we will create the user token within the implementations bound in the service container, but not override the register and login methods.

To ensure that the token is created only for json requests, we will include this requirement in the register and login response. To issue the token, you may use the **createToken** method provided by Fortify. This method returns a **Laravel\Sanctum\NewAccessToken** instance, which includes a hashed version of the token stored in your database, and a plain-text version of the token accessible through the **plainTextToken** property. It is recommended to immediately display this value after the token has been created.

**6. Email verification**

To ensure a secure and seamless experience for your users, it’s important to verify their email addresses after they have registered on your application. To enable this feature, follow these simple steps:

1.  Enable the **emailVerification** feature in your fortify configuration file’s features array.
2.  Ensure that your **App\Models\User** class implements the **Illuminate\Contracts\Auth\MustVerifyEmail** interface.

By following these steps, newly registered users will receive an email with a verification link that they must click in order to access the application. However, in order to inform the user that they need to verify their email address, it’s important to inform Fortify on how to display the email verification screen or create one for the user when using API endpoints.

**7. Resend Verification Email**

To customize the email verification process, we can add a verification notification route within the auth prefix in the **routes/api.php** file;

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*eYOvx46Ejwg_8Vu11wIOSg.png)

Then we create a new controller within the **App\Http\Controllers\EmailVerificationNotificationController.php** file and make the necessary modifications. Remember to import this file in. your **routes/api.php file.**

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*d4qomjQHVS1py-JcEPq-lQ.png)

In the controller, we extend the Fortify **EmailVerificationNotificationController** and override the store method to return our custom email response.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*62luTeE2Wg9hBraa33a67A.png)![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*pVYfCXAYvXLux20U_XDxXw.png)![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*KrWqW-kFsezg6zsEVPLZCA.png)

This customization allows us to provide a tailored experience for the users and make the email verification process more seamless and user-friendly.

By following these steps, we can enhance the email verification process and provide a better overall experience for our users.

**8. Testing**

To conclude, it is important to test the authentication process to ensure it is functioning as expected. First, we’ll perform a registration and verify the registration was successful.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8skAghEbCDrFfhJWyMkW4g.png)

After the registration, we’ll receive a token and an email verification link will be sent to the user. In the next phase I will show you how to verify your email address by clicking on the link sent, for now, you can manually verify the user. After email verification, we can then make another request to the [**http://127.0.0.1:8000/api/v1/user**](http://127.0.0.1:8000/api/v1/user) endpoint to test if it returns the correct authenticated user. It is important to include the header “**Authorization**” with the **“Bearer” token** in the request.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*_kymoi2nUBmfOxeWGhEgNw.png)

In case the initial email verification link did not go through, you can resend the email by making a request to the email verification notification endpoint with the corresponding token.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*mGESqOSgY_Buyn-X2mYMpQ.png)

In conclusion, the customisation of authentication responses in Laravel provides a lot of flexibility for developers to shape the way authentication is done within their applications. By leveraging the power of Laravel Fortify and its Service Providers, developers can easily implement custom responses for registration and login endpoints, email verification, and even handle the creation of tokens for authenticated users. The article demonstrated how to carry out these customizations and also provided steps to test if the custom responses have been properly implemented. By following these steps, developers can create a more robust and secure authentication system for their applications. In case the initial email verification link did not go through, you can resend the email by making a request to the email verification notification endpoint with the corresponding token.

Explore the code and resources used in this article by visiting the [GitHub repository](https://github.com/idoko-emmanuel/laravel-fortify-sanctum-auth). The [repository](https://github.com/idoko-emmanuel/laravel-fortify-sanctum-auth) contains examples and implementations related to integrating Laravel Fortify and Sanctum for both web and API authentication. Feel free to clone the [repository](https://github.com/idoko-emmanuel/laravel-fortify-sanctum-auth) and experiment with the provided code. If you have questions, feedback, or want to contribute to enhancing the examples, we welcome your involvement through GitHub issues and pull requests.

So in the second phase of “[**User Authentication for Web and API with Laravel Fortify and Sanctum 2**](https://medium.com/@idokoemmanuel3/user-authentication-for-web-and-api-with-laravel-fortify-and-sanctum-2-3486ba39c92b)” we will look at how we can manage user data, from **Profile Updates** to **Photo Uploads** and **Secure Logout**.

Thank you for reading and please don’t forget to give a clap so that others can find this article easily.

---

_User Authentication for Web and API with Laravel Fortify and Sanctum 2_
========================================================================

[![Idoko Emmanuel](https://miro.medium.com/v2/resize:fill:64:64/1*xn_HPZLw2TW0L0Yo-NWULg.png)](https://medium.com/@idokoemmanuel3?source=post_page---byline--3486ba39c92b---------------------------------------)

[Idoko Emmanuel](https://medium.com/@idokoemmanuel3?source=post_page---byline--3486ba39c92b---------------------------------------)

12 min read

·

Jul 28, 2023

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2F3486ba39c92b&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40idokoemmanuel3%2Fuser-authentication-for-web-and-api-with-laravel-fortify-and-sanctum-2-3486ba39c92b&user=Idoko+Emmanuel&userId=1de61cd8e3a9&source=---header_actions--3486ba39c92b---------------------clap_footer------------------)

--

1

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F3486ba39c92b&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40idokoemmanuel3%2Fuser-authentication-for-web-and-api-with-laravel-fortify-and-sanctum-2-3486ba39c92b&source=---header_actions--3486ba39c92b---------------------bookmark_footer------------------)

Listen

Share

![https://desarrolloweb.com/](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2cozozEjAnpxCDduDBT34Q.jpeg)

Welcome to the second phase of our article, where we delve deeper into harnessing the power of Laravel Fortify and Sanctum for user authentication in web and API applications. In this phase, we will explore a range of essential functionalities that empower users to manage their profiles effectively.

As users interact with our application, it becomes imperative to provide them with tools to access and modify their personal information securely. We will cover a series of key features, including displaying user data, enabling profile updates, facilitating profile photo uploads, managing profile photos, updating passwords, and offering a seamless logout process.

By the end of this phase, you will have a robust understanding of how to implement these features, enhancing user experience and security in your Laravel application. So, let’s dive in and empower our users with these fundamental functionalities that are crucial for any modern web or API-based platform.

> The Github repo is available at the end of this article

**1. Show Logged-In User Data**
================================

Certainly! Showing logged-in user data is a crucial step in empowering users to view and manage their profiles within our Laravel application. Before we proceed with this feature, let’s confirm that the necessary components are present in our application.

**Confirming User Model and Migration**

As showed in the previous [**article**](https://medium.com/@idokoemmanuel3/user-authentication-for-web-and-api-with-laravel-fortify-and-sanctum-fb31455ee673), Laravel provides the User model and migration by default during the installation process. These components are essential for handling user-related data and interactions. To ensure they exist in our application, let’s perform the following checks:

**i. User Model:**

The User model should be located in the app/Models directory and is usually named User.php. Open your terminal and navigate to your project’s root directory. Confirm the presence of the User model by running the following command:

```
ls app/Models/User.php
```

If the User model exists, you should see User.php listed in the output.

**ii. User Migration:**

The user migration file should be located in the database/migrations directory. It is typically named with a timestamp followed by _create_users_table.php (for example, 2023_07_01_000000_create_users_table.php). Confirm its existence by running the following command:

```
ls database/migrations/*_create_users_table.php
```

If the user migration file exists, you should see its filename listed in the output.

Now, let’s add the necessary column for the profile photo to the migration file:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*qBqMXo5LTXFMFAxmpK9QVA.png)

After modifying the migration to add the `profile_photo_path` column, you have two options to update the database:

1.  `migrate:fresh` Command: If you haven't made any significant data changes in your database or if you are in the early stages of development, you can use the `migrate:fresh` command to drop all the tables and re-run all migrations, including the modified one. Be cautious when using this command, as it will delete all data in your tables.

```
php artisan migrate:fresh
```

1.  `rollback` and `migrate` Commands: If you have already run migrations and have important data in your database, you can use the `rollback` command to revert the last batch of migrations and then run the `migrate` command to apply all migrations, including the modified one.

```
php artisan migrate:rollback 
``````
php artisan migrate
```

Using the `rollback` command allows you to revert the last batch of migrations, ensuring you don't lose any important data. Then, the `migrate` command will reapply all migrations, including the modified one with the `profile_photo_path` column.

Choose the appropriate method based on your database state and whether you can afford to lose existing data. If you are still in the early stages of development, `migrate:fresh` might be more convenient. However, if you have important data, the `rollback` and `migrate` approach is safer. Always make a backup of your database before performing any migration commands to avoid data loss.

> _If none of these files exist, then you should refer back to the previous_ [**_article_**](https://medium.com/@idokoemmanuel3/user-authentication-for-web-and-api-with-laravel-fortify-and-sanctum-fb31455ee673) _for how to properly set up your Laravel application._

**Understanding the User Model**

The User model is the backbone of user-related operations within our Laravel application. It represents the user’s data and enables interactions with the user table in the database. By default, the User model includes common attributes like name, email, and password. However, you can extend it to include additional fields relevant to your application.

**Displaying User Data**

Now that we’ve confirmed the existence of the User model and migration, we can proceed with displaying the logged-in user’s data. To achieve this, we will create a route to retrieve and return the user data. Open your route/api.php file and add your user route below the auth route:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5C49rpzt5j_MU2KTfXiMcw.png)

These routes are enclosed within a group that utilizes a specified prefix. Additionally, the verified middleware has been incorporated to ensure that users must have a verified email address before gaining access to these routes. If you wish to include the API version as a prefix, all you need to do is make adjustments in the config/fortify.php file.

**2. Update Profile Information**
==================================

In Laravel Fortify, customizing profile update responses allows us to tailor the feedback given to users after they update their profile information. By default, Fortify uses a predefined response for profile updates, but in some cases, you may want to provide a more personalized or specific response. To achieve this, we can leverage the Fortify service provider to customize the response, and then apply it to the appropriate route.

**Customizing Profile Update Responses in Fortify Service Provider**

1.  Open the Fortify service provider, which is usually located at `app/Providers/FortifyServiceProvider.php`.

2. Within the `register` method, add the following code:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*mo2I0T667lsfqj6ShXBXfg.png)

In this code snippet, we bind a custom implementation of the `ProfileInformationUpdatedResponse` interface to the container. The `toResponse` method inside the anonymous class is where we define our custom response logic. If the request is a JSON request (commonly used for API interactions), it will return a JSON response with a success message. Otherwise, for regular web requests, it will redirect back to the previous page with a success message set in the `with` method.

**Applying Custom Response to Profile Update Route**

Now that we have customized the profile update response, let’s ensure it applies to the correct route.

i. Open your `routes/api.php` file.

ii. Add the following route definition:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*E6Vn2zvQLGkqEroHMLaMww.png)

With this route definition, the profile update route is mapped to the `ProfileInformationController` and its `update` method. When users update their profile information by making a PUT request to `/user/profile-information`, the custom response we defined in the Fortify service provider will be used to provide feedback.

By customizing profile update responses in the Fortify service provider and then applying the custom response to the profile update route, we have the flexibility to provide personalized and context-specific feedback to our users.

**3. Update and Manage Profile Photo**
=======================================

In this section, we’ll cover how to enable users to update and manage their profile photos. To achieve this, we’ll create a `HasProfilePhoto` trait that provides methods for updating, deleting, and accessing the profile photo, along with a controller to handle the photo-related actions.

**The** `**HasProfilePhoto**` **Trait**

The `HasProfilePhoto` trait will be added to our User model and will contain methods to manage the user's profile photo.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*fAULo-V-tKcbJmD4l12GDg.png)

The `HasProfilePhoto` trait contains the following methods:

`i. updateProfilePhoto(UploadedFile $photo)`: Allows users to update their profile photo by passing an instance of `UploadedFile`. The method will store the photo and update the `profile_photo_path` attribute in the User model.

`ii. deleteProfilePhoto()`: Enables users to delete their profile photo. It will remove the photo from storage and set the `profile_photo_path` attribute to `null`.

`iii. getProfilePhotoUrlAttribute()`: Provides the URL to the user's profile photo. If a photo is available, it will return its URL; otherwise, it will generate a default profile photo URL.

`iv. defaultProfilePhotoUrl()`: Generates a URL for a default profile photo using the user's name initials and a custom avatar service (ui-avatars.com in this example).

`v. profilePhotoDisk()`: Determines the disk where profile photos should be stored. It will use the 's3' disk if the application is running on AWS VAPOR; otherwise, it will use the 'public' disk by default.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*qCjaRmSms2S_82WnmlQruw.png)

Before we proceed with the `ProfilePhotoController`, let's introduce the classes `UpdateProfilePhoto` and `DeleteProfilePhoto` from the `App\Actions\Profile` namespace. These classes will handle updating and deleting user profile photos, respectively.

**The** `**UpdateProfilePhoto**` **Class**

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*xlrzRXhUAXAsYIInQciQPg.png)

In the `UpdateProfilePhoto` class, we implement the `UpdatesUserPhoto` contract, which contains a single `update` method. This method takes the authenticated user and the input data (in this case, the photo file) and validates it using Laravel's `Validator` class. The photo must be required, a valid image file with specific mime types (jpg, jpeg, png), and not exceed a certain file size (max:1024). If the validation passes, the method calls the `updateProfilePhoto` method on the User model to update the profile photo.

**The** `**DeleteProfilePhoto**` **Class**

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*tIZFaOis9oKVtYKDO_dSnQ.png)

The `DeleteProfilePhoto` class implements the `DeleteUserPhoto` contract and provides a `delete` method. This method takes the authenticated user and calls the `deleteProfilePhoto` method on the User model, which deletes the user's profile photo.

**The** `**UpdatePhotoResponse**` **Class**

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-jkBqS77LNC0vPTHTgWw9g.png)

The `UpdatePhotoResponse` class implements the `UpdatePhotoResponse` contract, which provides the `toResponse` method. This method handles the response after a successful profile photo update. If the request wants a JSON response, it returns a JSON object with a success message. Otherwise, for regular web requests, it redirects back with a success status message.

**The** `**DeletePhotoResponse**` **Class**

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*YTWOM4RmxidNjcZTV6l06A.png)

Similarly, the `DeletePhotoResponse` class implements the `DeletePhotoResponse` contract, which contains the `toResponse` method. This method handles the response after a successful profile photo deletion. It behaves the same way as the `UpdatePhotoResponse` class, providing either a JSON response or a web redirection with a success status message.

**The Profile Photo Controller**

Next, let’s create a controller to handle updating and deleting the profile photo.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5OHj6e8QDUO7NMgP5Tu5uQ.png)

In the `ProfilePhotoController`, we define the `update` and `delete` methods that handle the photo upload and deletion requests, respectively. The `UpdateProfilePhoto` and `DeleteProfilePhoto` classes are injected into the controller methods, and their respective actions are called to handle the photo update and deletion operations. While the update and delete photo responses are returned respectively.

**Routes**

Finally, we need to define the routes that will call the methods in the `ProfilePhotoController`.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*nD0h3b36K_e5zv9Bu0TKrg.png)

With these routes in place, users can update their profile photo by making a POST request to `/user/profile-photo`, and they can delete their photo by making a POST request to `/user/remove-photo`.

We have successfully implemented the ability for users to update and delete their profile photos. The `HasProfilePhoto` trait provides convenient methods for managing the profile photo in the User model, and the `ProfilePhotoController` handles the actions to update and delete the photo.

4. Update User Password
========================

The update password feature allows users to change their account passwords for improved security. Let’s update the Fortify service provider to include the custom password update response and define the corresponding route for the Fortify`PasswordController`.

**Updating the Fortify Service Provider**

Open the Fortify service provider, which is typically located at `app/Providers/FortifyServiceProvider.php`. In the `boot` method, update it to include the custom password update response:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*iZqmLKHdvvjAlYg-iv4hSg.png)

In this code, we correctly set the custom password update response in the Fortify service provider. Now, when users update their passwords, this custom response will be used to provide the appropriate feedback.

**Password Update Route**

Now, you can use the default `PasswordController` provided by Fortify to handle the password update route. In your routes file (usually `api.php`), add the following route:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*OxYafTK9U4Qnuwsmn17XfA.png)

This route maps to the `update` method in the `PasswordController`, which is responsible for updating the user's password.

With the password update response customized and the password update route using the default `PasswordController` from Fortify, you have successfully implemented the password update feature in your Laravel application. Users can now securely change their passwords, and the application will respond with your custom success message upon successful password update.

**5. Logout User**
===================

Let’s discuss how to customize the user logout response using the Fortify service provider and how to define the logout route within a versioned API group.

**Customizing User Logout Response**

To customize the user logout response, we can update the Fortify service provider. Open the `FortifyServiceProvider.php` file and add the following code:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Ejn7IGJkL9XIaE5_gHpbgg.png)

In this code, we define a custom logout response by creating an anonymous class that implements the `LogoutResponse` contract. The `toResponse` method is overridden to determine the appropriate response based on the type of request made by the user (JSON or web).

**The Logout Route in the API Group**

Next, let’s define the logout route within auth group.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ZrZq-Tyb_R5DJvuFnI_XpA.png)

The logout route is within the `/api/{version}/auth/logout` URL, and it is protected by the Sanctum authentication middleware. When a user sends a POST request to this endpoint, they will be logged out from the application.

By customizing the user logout response using the Fortify service provider and defining the logout route within the versioned API group, you have successfully implemented a custom logout experience for your Laravel application. Users will receive the custom logout response, and the API route will handle user logout when they send a POST request to the `/api/{version}/auth/logout` endpoint.

As always, tailor the code provided to your application’s specific structure, and ensure that the Fortify package is correctly integrated into your Laravel application.

6. Testing Endpoints with Postman
==================================

i. Show Logged-In User Data: To test the route for displaying the logged-in user data, you can make a GET request to the corresponding endpoint (e.g., `api/v1/user/profile`). Ensure that you include the appropriate authentication headers (e.g., `Authorization: Bearer <access_token>` if using Sanctum) to authenticate the request.

ii. Update Profile Information: For testing the update profile information feature, send a PUT request to the relevant route (e.g., `/user/profile-information`). Include the updated user data in the request body, and once again, make sure to include the proper authentication headers.

iii. Uploading Profile Photo: To test the functionality of uploading a profile photo, perform a POST request to the endpoint for uploading profile photos (e.g., `api/v1/user/profile-photo`). Attach an image file as a form-data parameter in the request body, and don't forget to include the necessary authentication headers.

iv. Deleting Profile Photo: To test the profile photo deletion, issue a POST request to the delete photo endpoint (e.g., `api/v1/user/remove-photo`). Make sure to include the correct authentication headers, and the user's profile photo will be removed if it exists.

v. Updating User Password: To test the update user password feature, send a PUT request to the relevant route (e.g., `api/v1/user/password`). Include the updated password in the request body, along with the appropriate authentication headers.

vi. Logging Out the User: For testing the logout functionality, perform a POST request to the logout endpoint (e.g., `/api/v1/logout` within the versioned API group). Ensure that the request includes the necessary authentication headers. Upon successful logout, the response should confirm the user has been logged out.

By using Postman to test these endpoints, you can easily verify the functionality and troubleshoot any potential issues in your user authentication and management system.

Conclusion
==========

In this article, we explored how to implement user authentication and management features using Laravel Fortify and Sanctum. We covered various aspects, from displaying the logged-in user data to updating profile information, uploading and deleting profile photos, updating the user’s password, and logging out users from the application.

With these features in place, users can enjoy a seamless and secure experience when interacting with your Laravel web and API application. By using Postman as a testing tool, you can ensure that the endpoints are working correctly and providing the expected responses.

Explore the code and resources used in this article by visiting the [GitHub repository](https://github.com/idoko-emmanuel/laravel-fortify-sanctum-auth). The [repository](https://github.com/idoko-emmanuel/laravel-fortify-sanctum-auth) contains examples and implementations related to integrating Laravel Fortify and Sanctum for both web and API authentication. Feel free to clone the [repository](https://github.com/idoko-emmanuel/laravel-fortify-sanctum-auth) and experiment with the provided code. If you have questions, feedback, or want to contribute to enhancing the examples, we welcome your involvement through GitHub issues and [pull requests](https://github.com/idoko-emmanuel/laravel-fortify-sanctum-auth/pulls).

As you continue to develop your application, always consider best practices for user authentication and data security to protect user information effectively. Happy coding!

Thank you for reading and please don’t forget to give a clap so that others can find this article easily.