from django.db import models
from .validators import is_valid_ticker
# Create your models here.
class Stock(models.Model):
    ticker = models.CharField(max_length=5, validators=[is_valid_ticker]) ## will have to attempt to validate on frontend
    name = models.CharField(max_length=100)
    date_public = models.DateField()
    exchange = models.CharField(
        max_length=20,
        choices=[
        ('nyse', 'New York Stock Exchange'),
        ('s_p_500', 'S & P 500'),
        ('shanghai', 'Shanghai Stock Exchange'),
        ('japan', 'Japan Exchange Group'),
        ('london_innit', 'London Stock Exchange')
    ])
    sector = models.CharField(max_length=20,choices=[
        ('tech', "Technology"),
        ('health', 'Health'),
        ('finance', 'Finance'),
        ('data', 'Data and Information'),
        ('food_service', 'Food Services'),
        ('other', 'Miscellaneous')
    ], default='other')
    def __str__(self):
        return f"{self.name} ({self.ticker})"
    
    def clean(self):
        super().clean()
        if self.ticker:
            self.ticker=self.ticker.upper()
        if self.name:
            self.name= self.name.title()
