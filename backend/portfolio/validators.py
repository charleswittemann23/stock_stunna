import yfinance as yf


def is_valid_ticker(ticker):
    try:
        stock_info = yf.Ticker(ticker).info
        return len(stock_info) > 1
    
    except Exception:
        return False