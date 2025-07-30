# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator

class CustomUser(AbstractUser):
    #still contains BigAutoField id as primary key
    # Core fields
    email = models.EmailField(unique=True, db_index=True, blank=False)  # Added db_index for faster queries. Doesn't affect pk, just allows faster lookup, however more storage overhead
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

    # Contact info
    phone_number = models.CharField(
        max_length=17, 
        validators=[RegexValidator(
            regex=r'^\+?1?\d{9,15}$',  # Added $ at the end for complete match
            message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
        )],
        blank=True,
        null=True,
        help_text="Optional phone number for account security"
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Investment profile
    risk_tolerance = models.CharField(
        max_length=20,
        choices=[
            ('conservative', 'Conservative'),
            ('moderate', 'Moderate'), 
            ('aggressive', 'Aggressive'),
        ],
        default='moderate',
        help_text="User's risk tolerance for investments"
    )
    
    investment_experience = models.CharField(
        max_length=20,
        choices=[
            ('beginner', 'Beginner'),
            ('intermediate', 'Intermediate'),
            ('advanced', 'Advanced'),
            ('expert', 'Expert'),
        ],
        default='beginner',
        help_text="User's level of investment experience"
    )
    
    # Authentication settings
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.email})"
    
    def get_full_name(self):
        """Return the user's full name"""
        return f"{self.first_name} {self.last_name}".strip()
    
    @property 
    def initials(self):
        """Return user's initials for display purposes"""
        return f"{self.first_name[0] if self.first_name else ''}{self.last_name[0] if self.last_name else ''}".upper()
    
    def clean(self):
        """Custom validation"""
        super().clean()
        # Ensure email is lowercase
        if self.email:
            self.email = self.email.lower()
    
    def save(self, *args, **kwargs):
        """Override save to ensure email is lowercase"""
        if self.email:
            self.email = self.email.lower()
        super().save(*args, **kwargs)