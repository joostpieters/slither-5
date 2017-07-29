# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('slither', '0006_score_user_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='score',
            name='user_name',
        ),
        migrations.AddField(
            model_name='score',
            name='username',
            field=models.CharField(default=0, max_length=50),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
