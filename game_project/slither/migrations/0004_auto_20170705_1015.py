# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('slither', '0003_auto_20170705_1000'),
    ]

    operations = [
        migrations.RenameField(
            model_name='score',
            old_name='user',
            new_name='user_key',
        ),
    ]
