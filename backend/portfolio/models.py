from django.db import models
from .validators import is_valid_ticker
# Create your models here.
class Stock:
    ticker = models.CharField(max_length=5, validators=[is_valid_ticker]) ## will have to attempt to validate on frontend
    name = models.CharField()
    date_public = models.DateField()
    exchange = models.CharField()
    sector = models.CharField() ##can define choices for this?