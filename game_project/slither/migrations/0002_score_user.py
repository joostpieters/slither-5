# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('slither', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='score',
            name='user',
            field=models.ForeignKey(default=0, to='slither.User'),
        ),
    ]
