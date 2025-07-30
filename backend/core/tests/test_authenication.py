from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()

class JWTAuthenticationTest(APITestCase):
    
    def setUp(self):
        """Set up test data"""
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'first_name': 'John',
            'last_name': 'Doe',
            'password': 'testpass123',
        }
        self.user = User.objects.create_user(**self.user_data)
        self.token_url = reverse('token_obtain_pair')
        self.refresh_url = reverse('token_refresh')
    
    def test_obtain_jwt_token(self):
        """Test obtaining JWT token with valid credentials"""
        response = self.client.post(self.token_url, {
            'email': self.user_data['email'],
            'password': self.user_data['password']
        })
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertTrue(len(response.data['access']) > 0)
        self.assertTrue(len(response.data['refresh']) > 0)
    
    def test_obtain_token_invalid_credentials(self):
        """Test obtaining token with invalid credentials"""
        response = self.client.post(self.token_url, {
            'email': 'wrong@example.com',
            'password': 'wrongpassword'
        })
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_obtain_token_missing_email(self):
        """Test obtaining token with missing email"""
        response = self.client.post(self.token_url, {
            'password': self.user_data['password']
        })
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
    
    def test_obtain_token_missing_password(self):
        """Test obtaining token with missing password"""
        response = self.client.post(self.token_url, {
            'email': self.user_data['email']
        })
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)
    
    def test_refresh_jwt_token(self):
        """Test refreshing JWT token"""
        # First, get tokens
        token_response = self.client.post(self.token_url, {
            'email': self.user_data['email'],
            'password': self.user_data['password']
        })
        
        self.assertEqual(token_response.status_code, status.HTTP_200_OK)
        refresh_token = token_response.data['refresh']
        
        # Then refresh
        refresh_response = self.client.post(self.refresh_url, {
            'refresh': refresh_token
        })
        
        self.assertEqual(refresh_response.status_code, status.HTTP_200_OK)
        self.assertIn('access', refresh_response.data)
        self.assertTrue(len(refresh_response.data['access']) > 0)
    
    def test_refresh_invalid_token(self):
        """Test refreshing with invalid token"""
        response = self.client.post(self.refresh_url, {
            'refresh': 'invalid_refresh_token'
        })
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_refresh_missing_token(self):
        """Test refreshing with missing token"""
        response = self.client.post(self.refresh_url, {})
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('refresh', response.data)
    
    def test_authenticated_endpoint_with_valid_token(self):
        """Test accessing authenticated endpoint with valid token"""
        # Get token
        token_response = self.client.post(self.token_url, {
            'email': self.user_data['email'],
            'password': self.user_data['password']
        })
        
        self.assertEqual(token_response.status_code, status.HTTP_200_OK)
        access_token = token_response.data['access']
        
        # Set authorization header
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        
        # Test would go here for actual authenticated endpoints
        # Example:
        # response = self.client.get(reverse('user_profile'))
        # self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_authenticated_endpoint_without_token(self):
        """Test accessing authenticated endpoint without token"""
        # Clear any existing credentials
        self.client.credentials()
        
        # Test would go here for actual authenticated endpoints
        # Example:
        # response = self.client.get(reverse('user_profile'))
        # self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        pass
    
    def test_authenticated_endpoint_with_invalid_token(self):
        """Test accessing authenticated endpoint with invalid token"""
        # Set invalid authorization header
        self.client.credentials(HTTP_AUTHORIZATION='Bearer invalid_token_here')
        
        # Test would go here for actual authenticated endpoints
        # Example:
        # response = self.client.get(reverse('user_profile'))
        # self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        pass
    
    
    
    def test_inactive_user_cannot_get_token(self):
        """Test that inactive users cannot obtain tokens"""
        # Make user inactive
        self.user.is_active = False
        self.user.save()
        
        response = self.client.post(self.token_url, {
            'email': self.user_data['email'],
            'password': self.user_data['password']
        })
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)