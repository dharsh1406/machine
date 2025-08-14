from rest_framework import serializers
from .models import MachineSettings, ProductCount

class MachineSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineSettings
        fields = ['id', 'speed', 'acceleration', 'deceleration', 'single_step', 
                 'last_step', 'coil_number', 'created_at', 'updated_at']

class ProductCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCount
        fields = ['id', 'pieces', 'user_count', 'created_at', 'updated_at']