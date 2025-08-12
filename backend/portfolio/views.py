from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def portfolio_view(request):
    user = request.user
    # Replace this with actual portfolio data retrieval logic
    portfolio_data = {
        "message": f"Welcome, {user.get_full_name()}.",
        "portfolio": {
            "stocks": [
                {"symbol": "AAPL", "shares": 10},
                {"symbol": "TSLA", "shares": 5},
            ],
            "total_value": 15000
        }
    }
    return Response(portfolio_data)
