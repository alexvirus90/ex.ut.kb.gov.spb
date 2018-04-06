@extends('app')

@section('content')
    <div class="login-wrapper fadeInDown animated">
        <form action class="global-form login-form visible" role="form" method="POST" action="/auth/login">
            <div class="panel-heading login-header">{{ $_ENV['APP_NAME'] }}</div>
            <div class="login-body no-padding">
                @if (count($errors) > 0)
                    <div class="alert alert-danger">
                        <strong>Ошибка!</strong> Поля не должны быть пустыми.
                    </div>
                @endif
                <fieldset>
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="form-group">
                        <label>Пользователь</label>
                        <label class="input">
                            <span class="input-icon input-icon-prepend fa fa-user"></span>
                            <input type="text" class="form-control" name="username" value="{{ old('user') }}" placeholder="Пользователь">
                            <span class="tooltip tooltip-top-left"><i class="fa fa-user text-cyan-dark"></i>
								Пожалуйста введите имя пользователя
						</span>
                        </label>
                    </div>
                    <div class="form-group">
                        <label>Пароль</label>
                        <label class="input">
                            <span class="input-icon input-icon-prepend fa fa-key"></span>
                            <input type="password" class="form-control" name="password" placeholder="Пароль">
                            <span class="tooltip tooltip-top-left"><i class="fa fa-key text-cyan-dark"></i>
							Пожалуйста введите пароль
						</span>
                        </label>
                    </div>
                    <div class="row">
                        <div class="col-xs-8">
                            <label class="checkbox globalcheck globalcheck-info globalcheck-inversed globalcheck-lg">
                                <input type="checkbox" name="remember_me" value="0">
                                <i></i> Запомнить
                            </label>
                        </div>
                        <div class="col-xs-4">
                            <button type="submit" class="btn btn-info btn-block"><span
                                        class="glyphicon glyphicon-log-in"></span> Войти
                            </button>
                        </div>
                    </div>
                </fieldset>
            </div>
        </form>
    </div>
@endsection
