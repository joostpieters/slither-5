# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('slither', '0005_remove_score_user_key'),
    ]

    operations = [
        migrations.AddField(
            model_name='score',
            name='user_name',
            field=models.ForeignKey(default=0, to='slither.User'),
            preserve_default=False,
        ),
    ]
