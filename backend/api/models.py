from django.db import models

class MachineSettings(models.Model):
    speed = models.DecimalField(max_digits=5, decimal_places=1, default=15.0)
    acceleration = models.IntegerField(default=150)
    deceleration = models.IntegerField(default=150)
    single_step = models.DecimalField(max_digits=5, decimal_places=1, default=7.0)
    last_step = models.DecimalField(max_digits=6, decimal_places=1, default=106.0)
    coil_number = models.IntegerField(default=4)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'machine_settings'
        verbose_name = 'Machine Setting'
        verbose_name_plural = 'Machine Settings'

    def __str__(self):
        return f"Settings - Speed: {self.speed}, Coils: {self.coil_number}"

class ProductCount(models.Model):
    pieces = models.IntegerField(default=0)
    user_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'product_count'
        verbose_name = 'Product Count'
        verbose_name_plural = 'Product Counts'

    def __str__(self):
        return f"Pieces: {self.pieces}, User: {self.user_count}"