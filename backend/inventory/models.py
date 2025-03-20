# inventory/models.py
from django.db import models

class Drug(models.Model):
    name = models.CharField(max_length=255)
    generic_name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    dosage_form = models.CharField(max_length=100, blank=True, null=True)
    strength = models.CharField(max_length=50, blank=True, null=True)
    manufacturer = models.CharField(max_length=255)
    ndc_code = models.CharField(max_length=20, unique=True, blank=True, null=True)
    sku = models.CharField(max_length=100, unique=True, blank=True, null=True)
    batch_number = models.CharField(max_length=100, unique=True)
    expiry_date = models.DateField()
    quantity = models.IntegerField(default=0)
    stock_level = models.IntegerField(default=0)
    reorder_level = models.IntegerField(default=10)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    in_stock = models.BooleanField(default=True)
    storage_requirements = models.CharField(max_length=255, blank=True, null=True)
    side_effects = models.TextField(blank=True, null=True)
    contraindications = models.TextField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)      # Added

    def __str__(self):
        return self.name

    def update_stock_level(self):
        self.stock_level = self.quantity
        self.save()

class Supplier(models.Model):
    name = models.CharField(max_length=255)
    contact = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    location_coords = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True) 
    updated_at = models.DateTimeField(auto_now=True)      # Added

    def __str__(self):
        return self.name

class Order(models.Model):
    drug = models.ForeignKey(Drug, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    quantity_ordered = models.IntegerField(default=0)
    status = models.CharField(
        max_length=20,
        choices=[('Pending', 'Pending'), ('Shipped', 'Shipped'), ('Delivered', 'Delivered'), ('Cancelled', 'Cancelled')],
        default='Pending'
    )
    ordered_at = models.DateTimeField(auto_now_add=True)
    delivery_date = models.DateTimeField(blank=True, null=True)
    tracking_number = models.CharField(max_length=100, blank=True, null=True)
    total_cost = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)      # Added

    def __str__(self):
        return f"Order {self.id} - {self.drug.name} from {self.supplier.name}"

    def update_drug_quantity(self):
        if self.status == 'Delivered':
            self.drug.quantity += self.quantity_ordered
            self.drug.update_stock_level()
            self.drug.save()