from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    """
    The base user class that extends Abstract User
    A simple is_student boolean is added to make a distinction
    between accounts of type student and type instructor
    """
    is_student = models.BooleanField(default=True)

class Student(models.Model):
    """
    The student model that is a type of user
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    student_id = models.IntegerField(null=True, blank=True)
    full_name = models.CharField(max_length=40, null=True, blank=True)
    days_present = models.TextField(null=True, blank=True)
    days_late = models.TextField(null=True, blank=True)
    days_unexcused_absences = models.TextField(null=True, blank=True)
    days_excused_absences = models.TextField(null=True, blank=True)
    classes_list = models.TextField(null=True, blank=True)
    attendance_code = models.CharField(max_length=6, null=True, blank=True)
    class_currently_holding_attendance = models.CharField(max_length=30, null=True, blank=True)
    
class Instructor(models.Model):
    """
    The instructor model that is a type of user
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    classes_list = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.username