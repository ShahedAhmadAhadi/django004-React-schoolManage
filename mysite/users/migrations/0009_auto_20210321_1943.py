# Generated by Django 3.1.6 on 2021-03-21 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_authentication'),
    ]

    operations = [
        migrations.AlterField(
            model_name='authentication',
            name='ip',
            field=models.CharField(max_length=15, unique=True),
        ),
    ]
