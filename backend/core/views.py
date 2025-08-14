from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.serializers import UserSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self,request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        serializer.is_valid(raise_exception=True)
        refresh = serializer.validated_data['refresh']
        access = serializer.validated_data['access']

        response = Response({"message ": "Login successful"}, status=status.HTTP_200_OK)

        response.set_cookie("access_token", str(access), httponly=True, samesite="None", secure=True)
        response.set_cookie("refresh_token", str(refresh), httponly=True, samesite="None", secure=True)

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
        response.set_cookie("access_token", str(access), httponly=True, samesite="None", secure=True)
        return response
class ProtectedView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({"user": serializer.data})



class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except TokenError:
                # Token already blacklisted or invalid — ignore
                pass

        # Delete cookies (no need to pass samesite/secure unless you set them explicitly on creation)
        response = Response(status=status.HTTP_205_RESET_CONTENT)
        response.delete_cookie(
            "access_token", 
            path="/",           # Match the path
            samesite="None",    # Match your login view
            secure=True         # Match your login view
        )
        response.delete_cookie(
            "refresh_token", 
            path="/", 
            samesite="None", 
            secure=True
        )
        return response
       