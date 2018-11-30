export class OrderModel {
  constructor() {
  }

  public OrderID: number;
  public ServiceApplicationId: number;
  public ReceiptNumber: string;
  public OrderDate: Date;
  public IsPaid: Boolean;
  public PaymentTypeId: number;
  public CheckNo: string;
  public CreatedUserId: number;
  public TotalAmount: number;
  public PaymentDate: Date;
  public pr: String;
  public CashierUserName: String;
  public CashierUserId: number;
  public IsVoid: Boolean;
  public VoidDate: Date;
  public VoidReason: String;
  public PreparedByUserId: number;
  public EventDatetime: Date;
  public UpdatedUsername: String;
  public UpdatedEventDatetime: Date;
  // public OrderDetails: Collection<OrderDetail>;
}