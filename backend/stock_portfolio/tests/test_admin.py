from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse

User = get_user_model()

class AdminTest(TestCase):
    
    def setUp(self):
        """Set up test data"""
        self.client = Client()
        self.admin_user = User.objects.create_superuser(
            username='testadmin',
            email='admin@example.com',
            password='adminpass123',
            first_name='Admin',
            last_name='User'
        )
        self.regular_user = User.objects.create_user(
            email='user@example.com',
            username='testuser',
            password='userpass123',
            first_name='Regular',
            last_name='User'
        )
    
    def test_admin_login(self):
        """Test admin login"""
        self.client.login(username='admin@example.com', password='adminpass123')
        response = self.client.get(reverse('admin:index'))
        self.assertEqual(response.status_code, 200)
    
    def test_user_listed_in_admin(self):
        """Test that users are listed in admin"""
        self.client.login(username='admin@example.com', password='adminpass123')
        response = self.client.get(reverse('admin:core_customuser_changelist'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'user@example.com')
    
    def test_user_detail_in_admin(self):
        """Test user detail view in admin"""
        self.client.login(username='admin@example.com', password='adminpass123')
        response = self.client.get(
            reverse('admin:core_customuser_change', args=[self.regular_user.pk])
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'user@example.com')

