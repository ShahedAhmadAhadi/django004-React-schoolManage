# Generated by Django 3.1.6 on 2021-03-19 17:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20210318_2118'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Authentication',
        ),
    ]