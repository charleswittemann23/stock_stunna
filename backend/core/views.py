from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self,request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print(request.data)
        print(serializer)
        serializer.is_valid(raise_exception=True)
        refresh = serializer.validated_data['refresh']
        access = serializer.validated_data['access']

        response = Response({"message ": "Login successful"}, status=status.HTTP_200_OK)

        response.set_cookie("access_token", str(access), httponly=True, samesite="None")
        response.set_cookie("refresh_token", str(refresh), httponly=True, samesite="None")

        return response
class CookieTokenRefreshView(TokenRefreshView):
    def post(self,request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"detail": "No refresh token provided"}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = self.get_serializer(data={"refresh": refresh_token})
        serializer.is_valid(raise_exception=True)
        access = serializer.validated_data["access"]


        response = Response({"message": "Token refreshed"}, status=status.HTTP_200_OK)
        response.set_cookie("access_token", str(access), httponly=True, samesite="None")
        return response
class ProtectedView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({"message": f"Hello, you are authenticated!"})

class LogoutView(APIView):
    permission_classes=[permissions.IsAuthenticated]

    def post(self,request):
        refresh_token = request.COOKIES.get("refresh_token")
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()

        response = Response(status = status.HTTP_205_RESET_CONTENT)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response