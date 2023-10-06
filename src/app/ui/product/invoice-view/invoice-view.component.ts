import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GetAllInvoicesUseCase } from 'src/app/domain/application';
import { IInvoiceDomainEntity, TypeNameEnum } from 'src/app/domain/domain';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css'],
})
export class InvoiceViewComponent {
  branchSelected: string = '22aa8bc9-1e54-4142-8331-09b870da1fa0';
  invoices: IInvoiceDomainEntity[] = [];
  constructor(
    private readonly socketService: Socket,
    private readonly getAllInvoicesUseCase: GetAllInvoicesUseCase
  ) {}
  ngOnDestroy(): void {
    this.socketService.emit('invoice.leave', this.branchSelected);
  }
  ngOnInit(): void {
    this.getAllInvoicesUseCase
      .execute(this.branchSelected, {
        page: 1,
        pageSize: 10,
      })
      .subscribe({
        next: (response) => {
          this.invoices = response;
        },
        error: (error) => {
          console.log(error);
        },
      });

    this.socketService.emit('invoice.join', this.branchSelected);

    this.socketService
      .fromEvent(TypeNameEnum.SELLER_SALE_REGISTERED)
      .subscribe((data) => {
        this.invoices.push(data as IInvoiceDomainEntity);
        console.log(data);
      });

    this.socketService
      .fromEvent(TypeNameEnum.CUSTOMER_SALE_REGISTERED)
      .subscribe((data) => {
        this.invoices.push(data as IInvoiceDomainEntity);
        console.log(data);
      });
  }
}
