# Generated by Django 3.1.6 on 2021-03-22 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='s_file',
            field=models.FileField(default='', upload_to=''),
        ),
    ]