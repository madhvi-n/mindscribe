# Django Notes
A Google Keep Clone using Django and Angular


# Requirements
- Backend
    - Python 3.8+
    - virtualenv
    - WSL


- Frontend
    - Angular 10.2.4 (or 10.2.5)
    - Node 10.13.x +



# Installation

Clone the repository and enter the root directory
```
git clone https://github.com/madhvi-n/django-notes.git
cd django-notes
```


Create a virtual environment and activate it
```
virtualenv venv
source venv/bin/activate
```

Making sure your virtual environment is activated, install the dependencies using `pip`
```
pip install -r requirements.txt
```

After installing dependencies, migrate Django apps.(You will find the list of apps when you run the command `python manage.py runserver`)
```
python manage.py migrate
```

Create django superuser so that you can access django admin interface
```
python manage.py createsuperuser

```

Adding data from shell
```
python manage.py shell
from django.contrib.auth.models import User
user = User.objects.get(id=1) # Considering the createsuperuser command has been executed before

from labels.models import Label
label = Label.objects.create(name="My first label", user=user)

from notes.models import Note
note = note.objects.create(title="Something title", content="Something in the content here", user=user)

# Add label to your note
note.labels.add(label)

# Change color of your note
note.color = Note.Color.INDIANRED

# Archive it or pin it
note.is_pinned = True
note.is_archived = True

# Save your changes
note.save()
```

Finally start your Django server
```
python manage.py runserver
```


Visit `http://127.0.0.1:8000/` or `localhost:8000` for running web server
Alternatively you can access the admin interface on `http://127.0.0.1:8000/admin/` or `localhost:8000/admin`

Access python shell using
```
python manage.py shell
```

Adding data from shell

### Frontend

Start another shell tab and access the root of frontend directory `notes-app` (without bash or activated virtual environment). <br>
Install the angular dependencies
```
cd static/frontent/reddit-app
npm install
```


Visit `http://127.0.0.1:4200` or `localhost:4200` to access frontend.

<br>

#### Note: Django/Backend runs on WSL and Angular/Frontend runs directly on Windows


## References

- [How to install Python3.8 on Ubuntu 18.04](https://linuxize.com/post/how-to-install-python-3-8-on-ubuntu-18-04/)
- [Installing NodeJs on Windows](https://www.guru99.com/download-install-node-js.html)
- [Official Angular 10 installation guide](https://v10.angular.io/guide/setup-local)
- [Installing a specific version of ng cli or packages](https://stackoverflow.com/questions/44759621/install-specific-version-of-ng-cli)
- [Compatibility list for Angular, Angular Cli and Node Js](https://stackoverflow.com/questions/60248452/is-there-a-compatibility-list-for-angular-angular-cli-and-node-js)
