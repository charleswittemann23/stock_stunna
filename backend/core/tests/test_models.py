from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from core.models import CustomUser

User = get_user_model()

class CustomUserModelTest(TestCase):
    
    def setUp(self):
        """Set up test data"""
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'first_name': 'John',
            'last_name': 'Doe',
            'password': 'testpass123'
        }
    
    def test_create_user_with_email(self):
        """Test creating a user with email"""
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.first_name, 'John')
        self.assertEqual(user.last_name, 'Doe')
        self.assertTrue(user.check_password('testpass123'))
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
    
    def test_create_superuser(self):
        """Test creating a superuser"""
        admin_user = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='adminpass123',
            first_name='Admin',
            last_name='User'
        )
        self.assertEqual(admin_user.email, 'admin@example.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
    
    def test_email_uniqueness(self):
        """Test that email must be unique"""
        User.objects.create_user(**self.user_data)
        
        with self.assertRaises(IntegrityError):
            User.objects.create_user(**self.user_data)
    
    def test_email_required(self):
        """Test that email is required via model validation"""
        user_data = self.user_data.copy()
        user_data['email'] = ''
    
        user = User(**user_data)
        user.set_password(user_data['password'])
    
        with self.assertRaises(ValidationError):
            user.full_clean()  # This triggers model validation 
    
    def test_phone_number_validation(self):
        """Test phone number validation"""
        user = User.objects.create_user(**self.user_data)
        
        # Valid phone numbers
        valid_phones = ['+1234567890', '1234567890', '+123456789012345']
        for phone in valid_phones:
            user.phone_number = phone
            user.full_clean()  # Should not raise ValidationError
        
        # Invalid phone numbers
        invalid_phones = ['123', 'abcd1234567', '+12345678901234567890']
        for phone in invalid_phones:
            user.phone_number = phone
            with self.assertRaises(ValidationError):
                user.full_clean()
    
    def test_risk_tolerance_choices(self):
        """Test risk tolerance field choices"""
        user = User.objects.create_user(**self.user_data)
        
        valid_choices = ['conservative', 'moderate', 'aggressive']
        for choice in valid_choices:
            user.risk_tolerance = choice
            user.full_clean()  # Should not raise ValidationError
        
        # Invalid choice
        user.risk_tolerance = 'invalid_choice'
        with self.assertRaises(ValidationError):
            user.full_clean()
    
    def test_investment_experience_choices(self):
        """Test investment experience field choices"""
        user = User.objects.create_user(**self.user_data)
        
        valid_choices = ['beginner', 'intermediate', 'advanced', 'expert']
        for choice in valid_choices:
            user.investment_experience = choice
            user.full_clean()  # Should not raise ValidationError
    
    def test_user_str_method(self):
        """Test the __str__ method returns email"""
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(str(user), 'John Doe (test@example.com)')
    
    def test_get_full_name_method(self):
        """Test the get_full_name method"""
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(user.get_full_name(), 'John Doe')
        
        # Test with empty names
        user.first_name = ''
        user.last_name = ''
        self.assertEqual(user.get_full_name(), '')
    
    
    def test_timestamps(self):
        """Test that timestamps are automatically set"""
        user = User.objects.create_user(**self.user_data)
        self.assertIsNotNone(user.created_at)
        self.assertIsNotNone(user.updated_at)
        
        # Test that updated_at changes on save
        original_updated = user.updated_at
        user.first_name = 'Jane'
        user.save()
        self.assertGreater(user.updated_at, original_updated)

