from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
import yfinance as yf


class HomePageView(APIView):
    permission_classes = [AllowAny]
    
    def get(self,request):
        US = yf.Market(market="US")
        print(US.status)
        ##probably good to parse this info, only send response of stuff we need
        us_market_summary = US.summary
        portfolio_data = {
            "portfolio": {
                "stocks": [
                    {"symbol": "AAPL", "shares": 10},
                    {"symbol": "TSLA", "shares": 5},
                ],
                "total_value": 15000
            }
        }
        return Response(US.summary)
