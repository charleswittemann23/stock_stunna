import yfinance as yf
from django.core.exceptions import ValidationError

def is_valid_ticker(ticker):
    try:
        stock_info = yf.Ticker(ticker).info
        if len(stock_info) <= 1:
            raise ValidationError(f"Ticker '{ticker}' is not valid or not found.")
    except Exception:
        raise ValidationError(f"Ticker '{ticker}' is not valid or not found.")