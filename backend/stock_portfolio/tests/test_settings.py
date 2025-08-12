from django.test import TestCase
from django.conf import settings

class SettingsTest(TestCase):
    
    def test_jwt_settings(self):
        """Test JWT settings are configured"""
        
        self.assertEqual(settings.SIMPLE_JWT['ALGORITHM'], 'HS256')
        self.assertTrue(settings.SIMPLE_JWT['ROTATE_REFRESH_TOKENS'])
    
    def test_custom_user_model(self):
        """Test custom user model is set"""
        self.assertEqual(settings.AUTH_USER_MODEL, 'core.CustomUser')
    
    def test_static_settings(self):
        """Test static files settings"""
        self.assertEqual(settings.STATIC_URL, '/static/')
        self.assertIn('staticfiles', str(settings.STATIC_ROOT))
    
    def test_cors_settings(self):
        """Test CORS settings"""
        self.assertIn('corsheaders', settings.INSTALLED_APPS)
        self.assertIn('corsheaders.middleware.CorsMiddleware', settings.MIDDLEWARE)