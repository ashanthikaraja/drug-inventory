# Generated by Django 5.1.7 on 2025-03-18 15:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='drug',
            name='category',
            field=models.CharField(blank=True, help_text='Category or type of the drug (e.g., analgesic).', max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='drug',
            name='contraindications',
            field=models.TextField(blank=True, help_text='Contraindications for the drug.', null=True),
        ),
        migrations.AddField(
            model_name='drug',
            name='description',
            field=models.TextField(blank=True, help_text='Detailed description of the drug.', null=True),
        ),
        migrations.AddField(
            model_name='drug',
            name='dosage_form',
            field=models.CharField(blank=True, help_text='Form of the drug (e.g., tablet, syrup).', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='drug',
            name='generic_name',
            field=models.CharField(blank=True, help_text='The generic name of the drug.', max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='drug',
            name='in_stock',
            field=models.BooleanField(default=True, help_text='Indicates if the drug is in stock.'),
        ),
        migrations.AddField(
            model_name='drug',
            name='ndc_code',
            field=models.CharField(blank=True, help_text='National Drug Code (NDC) for the drug.', max_length=20, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='drug',
            name='reorder_level',
            field=models.IntegerField(default=10, help_text='Threshold for reordering stock.'),
        ),
        migrations.AddField(
            model_name='drug',
            name='side_effects',
            field=models.TextField(blank=True, help_text='Known side effects of the drug.', null=True),
        ),
        migrations.AddField(
            model_name='drug',
            name='sku',
            field=models.CharField(blank=True, help_text='Stock Keeping Unit for inventory tracking.', max_length=100, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='drug',
            name='stock_level',
            field=models.IntegerField(default=0, help_text='Current stock level for display purposes.'),
        ),
        migrations.AddField(
            model_name='drug',
            name='storage_requirements',
            field=models.CharField(blank=True, help_text='Special storage conditions (e.g., refrigerate).', max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='drug',
            name='strength',
            field=models.CharField(blank=True, help_text='Strength of the drug (e.g., 500mg).', max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='delivery_date',
            field=models.DateTimeField(blank=True, help_text='Expected or actual delivery date.', null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='total_cost',
            field=models.DecimalField(blank=True, decimal_places=2, help_text='Total cost of the order.', max_digits=12, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='tracking_number',
            field=models.CharField(blank=True, help_text='Tracking number for the shipment.', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='supplier',
            name='address',
            field=models.TextField(blank=True, help_text='Physical address of the supplier.', null=True),
        ),
        migrations.AddField(
            model_name='supplier',
            name='is_active',
            field=models.BooleanField(default=True, help_text='Indicates if the supplier is active.'),
        ),
        migrations.AddField(
            model_name='supplier',
            name='phone',
            field=models.CharField(blank=True, help_text='Phone number of the supplier.', max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='drug',
            name='batch_number',
            field=models.CharField(help_text='Batch number for tracking the drug lot.', max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='drug',
            name='expiry_date',
            field=models.DateField(help_text='Expiration date of the drug.'),
        ),
        migrations.AlterField(
            model_name='drug',
            name='manufacturer',
            field=models.CharField(help_text='Name of the drug manufacturer.', max_length=255),
        ),
        migrations.AlterField(
            model_name='drug',
            name='name',
            field=models.CharField(help_text='The commercial name of the drug.', max_length=255),
        ),
        migrations.AlterField(
            model_name='drug',
            name='price',
            field=models.DecimalField(decimal_places=2, help_text='Price per unit of the drug.', max_digits=10),
        ),
        migrations.AlterField(
            model_name='drug',
            name='quantity',
            field=models.IntegerField(default=0, help_text='Current quantity in stock.'),
        ),
        migrations.AlterField(
            model_name='order',
            name='drug',
            field=models.ForeignKey(help_text='The drug being ordered.', on_delete=django.db.models.deletion.CASCADE, to='inventory.drug'),
        ),
        migrations.AlterField(
            model_name='order',
            name='ordered_at',
            field=models.DateTimeField(auto_now_add=True, help_text='Date and time the order was placed.'),
        ),
        migrations.AlterField(
            model_name='order',
            name='quantity_ordered',
            field=models.IntegerField(default=0, help_text='Quantity of the drug ordered.'),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Shipped', 'Shipped'), ('Delivered', 'Delivered'), ('Cancelled', 'Cancelled')], default='Pending', help_text='Current status of the order.', max_length=20),
        ),
        migrations.AlterField(
            model_name='order',
            name='supplier',
            field=models.ForeignKey(help_text='The supplier providing the drug.', on_delete=django.db.models.deletion.CASCADE, to='inventory.supplier'),
        ),
        migrations.AlterField(
            model_name='supplier',
            name='contact',
            field=models.CharField(blank=True, help_text='Contact person or department.', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='supplier',
            name='email',
            field=models.EmailField(help_text='Email address for supplier communication.', max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='supplier',
            name='name',
            field=models.CharField(help_text='Name of the supplier.', max_length=255),
        ),
    ]
