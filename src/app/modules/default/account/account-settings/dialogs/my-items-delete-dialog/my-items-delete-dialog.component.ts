import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '@services/product.service';
import { ProductSearchResponseModel } from '@shared/models/product-search-response.model';

@Component({
  selector: 'tvb-my-items-delete-dialog',
  templateUrl: './my-items-delete-dialog.component.html',
  styleUrls: ['./my-items-delete-dialog.component.scss'],
})
export class MyItemsDeleteDialogComponent implements OnInit {
  public item: ProductSearchResponseModel;
  public errorMessage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public modalParams: any,
    public dialogRef: MatDialogRef<MyItemsDeleteDialogComponent>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.item = this.modalParams?.data?.item;
  }

  confirm(): void {
    this.productService.deleteItem(this.item.id).subscribe((result: any) => {
      this.close();
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
