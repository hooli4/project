<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'min:5',
                'regex:/^[A-Z][a-zA-Z]*$/',
                'unique:users,name',
            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[0-9]/',
                'regex:/[!@#$%^&*(),.?":{}|<>]/',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
            ],
            'email' => [
                'required',
                'string',
                'email:rfc',
                'unique:users,email',
            ],
            'c_password' => [
                'required',
                'string',
                'same:password',
            ]
        ];
    }

    public function messages() {
        return [
            'name.required' => 'Необходимо заполнить поле с именем пользователя',
            'name.regex' => 'Имя пользователя должно начинаться с большой буквы и состоять только из латинских букв',
            'name.min' => 'Минимальная длина имени пользователя - 7 символов',
            'name.unique' => 'Данное имя пользователя занято',
            'password.required' => 'Необходимо заполнить поле с паролем',
            'password.min' => 'Минимальная длина пароля - 8 символов',
            'password.regex' => 'Пароль должен: 
                1) Иметь хотя бы одну цифру;
                2) Иметь хотя бы один специальный символ (!@#$%^&*(),.?":{}|<>);
                3) Иметь хотя бы один символ в верхнем и нижнем регистре.
            ',
            'email.required' => 'Необходимо заполнить поле с электронной почтой',
            'email.email' => 'Некорректный email',
            'email.unique' => 'Данный email уже зарегистрирован',
            'c_password.required' => 'Повторите пароль',
            'c_password.same' => 'Пароли не совпадают',
        ];
    }
}
