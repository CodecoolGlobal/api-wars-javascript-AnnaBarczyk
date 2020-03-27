from flask import Flask, render_template, request, redirect, url_for, flash, session
import data_manager

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/')
@app.route('/planet-list')
def planet_list(login_message=""):
    if 'username' in session:
        return render_template("index.html", login_message=login_message, username=session["username"])
    return render_template("index.html", login_message=login_message)


@app.route('/login', methods=["GET", "POST"])
def login():
    login_data = {}
    if request.method == "POST":
        login_data['user_name'] = request.form['user_name']
        login_data['password'] = request.form['password']

        user_name_check = data_manager.check_login_user_name(login_data)
        password_check = data_manager.check_login_password(login_data)
        if not user_name_check or not password_check:
            login_message = 'Username or password incorrect. Please try again.'
            return render_template('login.html', login_message=login_message)
        else:
            flash(f"Hi {login_data['user_name']}, you're logged in! Welcome, welcome!")
            session['username'] = request.form['user_name']
            return redirect(url_for("planet_list"))
    if 'username' in session:
        return render_template("login.html", username=session["username"])
    else:
        return render_template("login.html")


@app.route('/register', methods=["GET", "POST"])
def register():
    if 'username' in session:
        flash('Sorry, no can do! You need to logout first!')
    else:
        register_form = {}
        if request.method == 'POST':
            if request.form['password'] == request.form['repeat password']:
                register_form['user_name'] = request.form['user_name']
                register_form['name'] = request.form['name']
                register_form['email'] = request.form['email']
                register_form['password'] = request.form['password']
                register_message = data_manager.check_user(register_form)

            else:
                return render_template("register.html", pass_message='passwords are not the same')
            return render_template("register.html", register_message=register_message)
        if 'username' in session:
            return render_template("register.html", username=session["username"])
        else:
            return render_template("register.html")

@app.route('/logout', methods=["GET", "POST"])
def logout():
    if 'username' in session:
        session.pop('username', None)
        flash('Logged out!')
        return redirect(url_for('planet_list'))
    else:
        flash('Sorry, logout failed, you have to login first!')
        return redirect(url_for('planet_list'))


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,
    )
