# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('social_django', '0006_partial'),
        ('slither', '0007_auto_20170723_1205'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='score',
            name='highscore',
        ),
        migrations.RemoveField(
            model_name='score',
            name='username',
        ),
        migrations.AddField(
            model_name='score',
            name='user',
            field=models.ForeignKey(default=0, to='social_django.UserSocialAuth'),
            preserve_default=False,
        ),
    ]
