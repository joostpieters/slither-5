# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('slither', '0004_auto_20170705_1015'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='score',
            name='user_key',
        ),
    ]
