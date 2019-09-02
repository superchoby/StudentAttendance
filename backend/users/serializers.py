from rest_framework import serializers
from .models import Student, Instructor

class studentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = (
            'student_id',
            'full_name',
            'days_present',
            'days_late',
            'days_unexcused_absences',
            'days_excused_absences',
            'classes_list',
        )

class instructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = [
            'id',
            'classes_list',
        ]